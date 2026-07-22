# Carteira Bento — Versão 1

Primeira versão pública e sem login do **Carteira Bento**.

## Recursos incluídos

- Dashboard financeiro
- Receitas, despesas e renda passiva
- Patrimônio e dívidas
- Investimentos
- Metas financeiras
- Indicador de saúde financeira
- Gráfico de fluxo financeiro
- Salvamento automático no navegador
- Exportação de backup em JSON
- Botão para apagar todos os dados
- Tela demonstrativa para criação de usuário
- Layout responsivo para celular e computador

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os arquivos `index.html`, `styles.css` e `app.js`.
3. Vá em **Settings → Pages**.
4. Em **Source**, escolha `Deploy from a branch`.
5. Selecione a branch `main` e a pasta `/root`.
6. Salve.

## Observação importante

Os dados ficam armazenados apenas no navegador usando `localStorage`.

Na próxima etapa, o botão **Criar usuário** poderá ser conectado ao Supabase para:

- salvar os dados na nuvem;
- sincronizar entre aparelhos;
- manter histórico;
- recuperar senha;
- migrar automaticamente os dados locais após o cadastro.
