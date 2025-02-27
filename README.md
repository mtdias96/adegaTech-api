# AdegaTech / MyDega - Backend

_AdegaTech_ (também conhecido como _MyDega_) é uma solução completa para o gerenciamento de adegas. Este backend foi desenvolvido utilizando uma arquitetura modular com **NestJS** e **TypeScript**, garantindo escalabilidade, segurança e alta performance. A aplicação oferece gerenciamento de produtos, categorias, pedidos e autenticação robusta, integrando sistemas de pagamento e controle de estoque em operações transacionais.

---

## Visão Geral

- **Gerenciamento de Produtos e Categorias:**  
  CRUD completo com filtros personalizados para facilitar a busca e a administração dos itens da adega.

- **Dashboard Administrativo:**  
  Implementação inicial de um dashboard seguro com sistema de autenticação baseado em **JWT**, permitindo login e cadastro de usuários.

- **Gestão de Pedidos e Pagamentos:**  
  Integração de módulos que validam o estoque, processam pagamentos e atualizam o controle de estoque de forma transacional.  
  > Exemplo: O serviço de pedidos valida o estoque disponível, calcula o valor total do pedido e executa o pagamento. Caso o pagamento falhe, a operação é revertida.

---

## Tecnologias Utilizadas

### Backend
- **NestJS & TypeScript:** Estrutura robusta para construção da API.
- **PostgreSQL:** Banco de dados relacional, executado via Docker.
- **Prisma:** ORM moderno para facilitar a interação com o banco de dados.
- **JWT:** Autenticação segura e gerenciamento de sessões.
- **Docker:** Containerização para garantir ambientes consistentes.
- **CI/CD:** Integração contínua e deploy automatizado.

### Frontend (Contexto de Integração)
- **React.js, TypeScript & Shadcn:** Framework e ferramentas para uma interface de usuário interativa.
- **Axios:** Cliente HTTP para consumo de APIs.

---

## Configuração do Ambiente

### Exemplo de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações (utilize valores de exemplo):

```env
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/example_db?schema=public
PORT=8080
JWT_SECRET=your_jwt_secret_here
