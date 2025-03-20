export class FinancialResponseDto {
  day?: {
    financialCurrentDay: number;
  };
  week?: {
    financialCurrentWeek: number;
  };
  month?: {
    financialCurrentMonth: number;
  };
  total?: {
    financialTotal: number;
  };
}
