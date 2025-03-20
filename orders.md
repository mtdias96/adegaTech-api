# Integração das Tabelas no Fluxo de Venda Fake

Sim, as tabelas `Order` e `OrderItem` fornecem uma boa base para implementar o fluxo de venda fake com controle de estoque e caixa. Veja como integrá-las passo a passo:

## 1. Recebimento da Solicitação de Venda **CHECK**

- **Entrada:** Receber os dados da venda (por exemplo, identificação do produto, quantidade, usuário, etc.).

## 2. Validação do Produto e Estoque **CHECK**

- Consultar a tabela de produtos (não apresentada aqui) para:
  - Verificar se o produto existe.
  - Confirmar se a quantidade em estoque é suficiente.
- Se o estoque for insuficiente, retornar uma mensagem de erro.

## 3. Cálculo do Valor Total da Venda **CHECK**

- Calcular o total da venda multiplicando a quantidade pelo preço unitário de cada produto.
- Armazenar esse valor no campo `total` da tabela `Order`.

## 4. Simulação do Processamento do Pagamento **Check**

- Criar uma função que simula a aprovação do pagamento (ex.: sempre retornar "sucesso" ou simular falhas).
- Esta função poderá futuramente ser substituída por uma integração com uma API real de pagamento.
- Opcionalmente, utilizar o campo `payment` da tabela `Order` para armazenar os dados retornados da API de pagamento real, quando essa integração ocorrer. \*_Pending_

## 5. Registro da Venda **Check**

- Ao confirmar o pagamento simulado:
  - Criar um registro na tabela `Order` com as informações da transação, como:
    - `userId`, `adegaId`, `total`, `status` (inicialmente `PENDING` ou outro conforme sua lógica).
    - Data de criação (`createdAt`) e atualização (`updatedAt`).
  - Para cada item vendido, criar registros correspondentes na tabela `OrderItem` associando:
    - `orderId`, `productId`, `quantity` e `price`.

## 6. Atualização do Controle de Caixa

- Após a confirmação da venda, incrementar o saldo do caixa com o valor total da venda.
- Registrar essa entrada para auditoria futura ou conferência.

## 7. Atualização do Controle de Estoque

- Subtrair a quantidade vendida do estoque atual do produto. **Check**
- Registrar a movimentação para manter um histórico (útil para auditoria e relatórios). \*_Pending_

## 8. Confirmação e Feedback

- Retornar uma mensagem de sucesso para o usuário, informando que a venda foi concluída e que os controles de caixa e estoque foram devidamente atualizados.

## 9. Pontos Futuros para Integração com API de Pagamento

- Estruturar a função de pagamento de forma modular para facilitar a troca da simulação por uma chamada real à API de pagamento.
- Garantir que o fluxo de callback ou verificação de status não impacte a lógica de atualização de caixa e estoque.

# Analogias para Entender o Fluxo do Pedido

Imagine que você está em uma sorveteria. Quando você faz um pedido, você recebe um **bilhete** que mostra o que você comprou e quanto vai pagar. Esse bilhete é dividido em duas partes:

1. **O Bilhete (Tabela Order):**

   - **O que é:**
     Pensa no bilhete como o resumo do seu pedido. Nele, você anota informações como:
     - Quem fez o pedido (por exemplo, seu nome ou ID de usuário)
     - O total que você vai pagar (soma dos preços dos itens)
     - A data e hora do pedido
     - O status do pedido (por exemplo, "PENDENTE" ou "APROVADO")
   - **O que salvar:**
     Quando o front-end enviar um pedido, você salva essas informações no registro da tabela `Order`.

2. **As Linhas do Bilhete (Tabela OrderItem):**
   - **O que é:**
     Cada linha do bilhete mostra um item específico que você pediu. Por exemplo, se você pediu dois sabores de sorvete ou várias coberturas, cada um deles aparece como uma linha.
   - **O que salvar:**
     Para cada produto no seu pedido, você salva:
     - O ID do produto
     - A quantidade pedida (por exemplo, quantas bolas de sorvete)
     - O preço daquele item
     - A associação com o pedido (para saber a qual bilhete ele pertence)

## Como Funciona na Rota `orders`

### Informações que você precisa receber:

- **Dados do Pedido (para a tabela Order):**

  - `userId`: Quem está fazendo o pedido.
  - `adegaId`: (Se aplicável) Qual estabelecimento está sendo usado.
  - `total`: O valor total da compra (pode ser calculado a partir dos itens).
  - `status`: O status do pedido (inicialmente, "PENDENTE").
  - Outras informações como data, que geralmente são preenchidas automaticamente.

- **Dados dos Itens do Pedido (para a tabela OrderItem):**
  - Uma lista (array) de itens, onde cada item inclui:
    - `productId`: Qual produto está sendo comprado.
    - `quantity`: Quantos desse produto estão sendo comprados.
    - `price`: O preço daquele produto (pode ser o valor unitário ou calculado para a quantidade).

### Cenários:

- **Um Único Produto:**
  Você cria um registro na tabela `Order` e, dentro dele, um registro na tabela `OrderItem` com os detalhes desse produto.

- **Vários Produtos:**
  Você cria um registro na tabela `Order` e, para cada produto, você cria um registro separado na tabela `OrderItem`. Assim, todas as linhas do bilhete mostram cada item que você comprou.

## Resumindo

- **Tabela Order:** Guarda o "bilhete" inteiro (quem, quando, quanto, status).
- **Tabela OrderItem:** Guarda cada "linha" do bilhete (detalhe de cada produto comprado).

Essa estrutura permite que, mesmo que o pedido tenha vários produtos, você mantenha tudo organizado e consiga saber exatamente o que foi pedido e por quem.
