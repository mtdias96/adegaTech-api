# AdegaTech - Sistema de Gerenciamento para Adegas

![Logo AdegaTech](https://via.placeholder.com/200x80?text=AdegaTech)

## 📋 Visão Geral

O AdegaTech é uma solução completa para o gerenciamento de adegas e distribuidoras de bebidas, oferecendo um sistema robusto para controle de estoque, vendas, financeiro e administrativo. Desenvolvido com NestJS, TypeScript e PostgreSQL, a aplicação proporciona uma experiência intuitiva e eficiente para gerenciar todos os aspectos do negócio.

## 🚀 Funcionalidades Principais

### Módulo de Autenticação e Usuários

- Sistema de login seguro com JWT
- Gerenciamento de perfis de usuário (Proprietário e Atendente)
- Controle de acesso baseado em funções

### Módulo de Produtos e Categorias

- Cadastro completo de produtos com imagens
- Organização por categorias com ícones personalizados
- Atualização em massa de produtos

### Módulo de Estoque

- Controle em tempo real do inventário
- Histórico de movimentações de estoque
- Alertas de estoque baixo configuráveis
- Registro de ajustes de estoque com motivos

### Módulo de Vendas e Pedidos

- Criação rápida de pedidos
- Diferentes status de pedido (Pendente, Processando, Concluído, etc.)
- Múltiplos métodos de pagamento
- Registro completo do histórico de pedidos

### Módulo Financeiro

- Registro de todas as transações financeiras
- Relatórios de vendas por período
- Análise de desempenho por produto

### Módulo de Relatórios

- Relatórios customizáveis para diferentes períodos
- Exportação de dados em diferentes formatos
- Visualização de métricas de desempenho

### Integração com AWS

- Armazenamento de imagens em S3
- Escalabilidade e alta disponibilidade

## 🔍 Casos de Uso

### Para Proprietários

1. **Gestão Completa do Negócio**

   - Visualização de dashboard com métricas de desempenho
   - Acesso a relatórios financeiros e de estoque
   - Configuração de parâmetros do sistema

2. **Análise de Vendas**

   - Identificação dos produtos mais vendidos
   - Rastreamento de tendências de consumo
   - Tomada de decisão baseada em dados

3. **Controle Financeiro**
   - Acompanhamento de receitas e despesas
   - Análise de lucratividade por produto
   - Planejamento financeiro baseado em histórico

### Para Atendentes

1. **Atendimento Eficiente**

   - Interface intuitiva para criação rápida de pedidos
   - Verificação automática de disponibilidade em estoque
   - Processamento de pagamentos

2. **Gestão de Estoque**
   - Entrada e saída de produtos do estoque
   - Alertas de produtos com estoque baixo
   - Registro de movimentações com justificativas

## 🎨 Design System

O AdegaTech utiliza um design system consistente para garantir uma experiência de usuário coesa e profissional.

### Cores

- **Primária**: `#8A2BE2` - Representa a identidade da marca
- **Secundária**: `#00BFFF` - Utilizada para ações e destaques
- **Terciária**: `#FFD700` - Para alertas e notificações
- **Neutra**: `#F5F5F5`, `#333333` - Para textos e fundos

### Tipografia

- **Principal**: Roboto - Para títulos e textos de destaque
- **Secundária**: Open Sans - Para corpo de texto e elementos menores

### Componentes

- Botões com estados visuais claros
- Formulários com validação visual
- Cards para exibição de produtos e informações
- Tabelas responsivas para dados complexos
- Modais para ações críticas
- Navegação intuitiva com breadcrumbs

### Responsividade

- Design adaptável para desktop, tablet e mobile
- Layouts otimizados para diferentes tamanhos de tela
- Interações adaptadas para diferentes dispositivos

## 💻 Tecnologias Utilizadas

### Backend

- **NestJS**: Framework para construção de aplicações eficientes e escaláveis
- **TypeScript**: Linguagem tipada para desenvolvimento mais seguro
- **PostgreSQL**: Banco de dados relacional robusto
- **Prisma ORM**: ORM moderno para operações de banco de dados
- **JWT**: Para autenticação segura
- **Socket.IO**: Para comunicação em tempo real
- **AWS SDK**: Integração com serviços AWS (S3)
- **Multer**: Para upload de arquivos

### DevOps

- **Docker**: Containerização da aplicação
- **Docker Compose**: Orquestração de containers
- **Husky & Commitlint**: Para garantir padrões de commit
- **ESLint & Prettier**: Para padronização de código

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js (v16+)
- Docker e Docker Compose
- PNPM ou NPM

### Passos para Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/adega-api.git
   cd adega-api
   ```

2. **Configure as variáveis de ambiente**

   ```bash
   # Copie o arquivo de exemplo
   cp .env.example .env

   # Edite o arquivo .env com suas configurações
   # Exemplo de configuração mínima:
   DATABASE_URL=postgresql://adegatech:adegatechapi@localhost:5432/adegatech_db?schema=public
   PORT=3000
   JWT_SECRET=sua_chave_secreta_aqui
   ```

3. **Inicialize o banco de dados com Docker**

   ```bash
   docker-compose up -d db
   ```

4. **Instale as dependências e execute as migrações**

   ```bash
   pnpm install
   npx prisma migrate dev
   ```

5. **Inicie a aplicação em modo de desenvolvimento**
   ```bash
   pnpm start:dev
   ```

### Alternativa: Usando Docker para tudo

```bash
# Constrói e inicia todos os serviços
docker-compose up -d
```

## 📝 API Endpoints

A documentação completa da API está disponível em `/api-docs` quando a aplicação está em execução.

Principais endpoints:

- **Autenticação**: `/auth/login`
- **Produtos**: `/products`
- **Categorias**: `/categories`
- **Estoque**: `/stock`
- **Pedidos**: `/orders`
- **Usuários**: `/users`
- **Relatórios**: `/reports`
- **Financeiro**: `/financial`

## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📬 Contato

Para dúvidas, sugestões ou problemas, entre em contato conosco:

- Email: contato@adegatech.com
- Website: www.adegatech.com
