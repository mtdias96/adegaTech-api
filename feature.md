## Urgentes

1. Fazer o tratamento de erros das querys
2. Configurar de forma correta filters e pipes de erros

# Dashboard Estoque

## 1. Estrutura Inicial do Estoque

### 1.1 Criar Modelo e Tabela para Produtos **Check**

- Definir os campos básicos:
  - `id`: Identificador único.
  - `name`: Nome do produto.
  - `quantity`: Quantidade disponível no estoque.
  - `min_stock`: Limite mínimo de estoque para alertas.
  - `price`: Preço do produto (se necessário).
- Configurar validações:
  - Não permitir valores negativos para a quantidade.
  - Validar a presença de campos obrigatórios.

### 1.2 Criar Modelo e Tabela para Histórico de Alterações **Check**

- Definir os campos:
  - `id`: Identificador único.
  - `product_id`: Referência ao produto.
  - `quantity`: Quantidade alterada.
  - `type`: Tipo da alteração (`increment` ou `decrement`).
  - `reason`: Motivo da alteração (ex.: reposição, avaria, ajuste manual).
  - `date`: Data da alteração.
  - `user_id`: Usuário responsável pela alteração.

---

## 2. Endpoints de Estoque

### 2.1 Criar Endpoint para Consulta de Estoque

- **GET `/api/stock`**: Retorna o estoque atual de um ou mais produtos.
  - Filtros opcionais:
    - Por nome do produto.
    - Por categoria (se aplicável).
    - Produtos abaixo do limite mínimo.

### 2.2 Criar Endpoint para Atualizar Estoque

- **POST `/api/stock/change`**: Permite incrementar ou decrementar estoque manualmente.
  - Parâmetros:
    - `productId`: ID do produto.
    - `quantity`: Quantidade a ser alterada.
    - `type`: Tipo de alteração (`increment` ou `decrement`).
    - `reason`: Motivo da alteração (opcional).
  - Validações:
    - Não permitir estoque negativo.
    - Registrar alterações no histórico.

---

## 3. Lógica de Alertas

### 3.1 Implementar Notificação de Estoque Baixo

- Verificar se o estoque de um produto está abaixo do limite mínimo configurado.
- Enviar notificação (por enquanto, usar logs ou salvar no banco de dados para teste).

---

## 4. Relatórios e Histórico

### 4.1 Criar Endpoint para Consulta de Histórico

- **GET `/api/stock/history`**: Retorna o histórico de alterações no estoque.
  - Filtros opcionais:
    - Por data.
    - Por tipo de alteração (`increment` ou `decrement`).
    - Por produto.

### 4.2 Criar Endpoint para Geração de Relatórios

- **GET `/api/stock/report`**: Gera relatórios baseados nas alterações de estoque.
  - Formatos:
    - PDF.
    - CSV.
  - Dados incluídos:
    - Produtos com estoque baixo.
    - Quantidade total de produtos decrementados (simulação de vendas).
    - Quantidade total de reposições.

---

## 5. Sincronização com Frontend

### 5.1 Criar Endpoint para Atualizações Periódicas

- **GET `/api/stock/updates`**: Fornece dados de estoque para atualização em tempo real.
  - Usar dados fictícios para simulação inicial.

---

## 6. Testes e Integração Futura

### 6.1 Testar Funcionalidades com Dados Mockados

- Criar dados fictícios para produtos e alterações no estoque.
- Simular decrementos e incrementos para validar endpoints e lógica.

### 6.2 Preparar Integração com Vendas

- Planejar como a lógica de vendas será conectada aos endpoints de estoque no futuro.
- Identificar pontos no código onde a lógica será estendida.

---

Essas tasks permitirão desenvolver um sistema de estoque funcional, organizado e preparado para futuras integrações, como o módulo de vendas.

--

## BUGS

1. Quando não á produtos o get de produtos está entrando em looping

## Dashboard Compras

1. Criar lógica para rotas de compra.
2. Preparar integração para API de pagamento.
3. Criar histórico de compras.
4. Criar rota para registrar compras realizadas.
5. Adicionar endpoint para consultar histórico de compras.
6. Adicionar lógica para gerar faturas ou recibos de compras realizadas.
7. Implementar controle de estoque nas compras realizadas.
8. Exibir total de compras no dashboard.
9. Adicionar notificação de compra concluída com sucesso.
10. Preparar estrutura para incluir métodos de pagamento futuros.
