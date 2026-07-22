# Carteira Bento v2

Base pública e modular do Carteira Bento.

## Estrutura

- `index.html`
- `css/style.css`
- `js/storage.js`
- `js/utils.js`
- `js/ui.js`
- `js/transactions.js`
- `js/assets.js`
- `js/investments.js`
- `js/goals.js`
- `js/dashboard.js`
- `js/app.js`

## Funcionalidades

- Dashboard financeiro
- Receitas, despesas e renda passiva
- Patrimônio e dívidas
- Investimentos
- Metas financeiras
- Indicador de saúde financeira
- Gráfico de fluxo financeiro
- Salvamento automático com localStorage
- Exportação e importação de backup JSON
- Exclusão completa dos dados
- Layout responsivo
- Base pronta para futura integração com Supabase

## Publicação no GitHub Pages

1. Crie um repositório.
2. Envie todo o conteúdo mantendo as pastas.
3. Vá em `Settings > Pages`.
4. Selecione `Deploy from a branch`.
5. Escolha `main` e `/root`.
6. Salve.

## Próximo passo

Conectar o botão Criar usuário ao Supabase e migrar os dados locais para a conta criada.


## Novidades da v3

- Categorias digitadas ficam memorizadas para lançamentos futuros.
- Campo de conta, cartão ou benefício usado no pagamento.
- Vale-refeição pode ser lançado como receita.
- Refeições podem ser lançadas como despesas pagas com Vale-refeição.
- O painel calcula automaticamente o saldo disponível do vale-refeição.
- Migração automática dos dados salvos na versão 2.
