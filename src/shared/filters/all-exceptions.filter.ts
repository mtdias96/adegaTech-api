import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  private getCurrentDateFormatted(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    return `${day}_${month}_${year}`;
  }

  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

  private getErrorDetails(error: Error): {
    message: string;
    line: string;
    file: string;
  } {
    const stack = error.stack || '';
    const stackLines = stack.split('\n');

    let errorLine = '';
    let errorFile = '';

    if (stackLines.length > 1) {
      const errorDetails = stackLines[1].trim().match(/at\s(.+):(\d+):(\d+)/);
      if (errorDetails) {
        errorFile = errorDetails[1];
        errorLine = errorDetails[2];
      }
    }

    return {
      message: error.message,
      line: errorLine,
      file: errorFile,
    };
  }

  private saveErrorLog(
    error: Error,
    requestInfo: { method: string; url: string },
  ): void {
    try {
      const { method, url } = requestInfo;
      const errorDetails = this.getErrorDetails(error);
      const logMessage = `Erro capturado em ${this.formatDateTime(new Date())}:
Mensagem da exceção: ${errorDetails.message}
Arquivo: ${errorDetails.file}
Linha: ${errorDetails.line}
Método da requisição: ${method}
URL da requisição: ${url}
Stack: ${error.stack}

`;
      const logFileName = `${this.getCurrentDateFormatted()}_error_logs.txt`;

      const logsDir = path.join(process.cwd(), 'logs', 'error_logs');
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }

      const logFilePath = path.join(logsDir, logFileName);

      if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, logMessage);
      } else {
        fs.appendFileSync(logFilePath, logMessage);
      }
    } catch (writeError) {
      this.logger.error('Erro ao salvar o log de erro:', writeError.message);
    }
  }

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (request.url.includes('favicon.ico')) {
      return;
    }

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const status =
        exception instanceof HttpException ? exception.getStatus() : 500;

      if (Array.isArray(response['message'])) {
        this.logger.error(
          'Erros de validação encontrados:',
          JSON.stringify(response['message']),
        );
      }

      this.saveErrorLog(exception, {
        method: request.method,
        url: request.url,
      });

      ctx.getResponse().status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: response['message'],
      });
    }
  }
}
