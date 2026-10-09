# Tabelas-responsivas

Esse projeto foi criado com a ideia de reforçar e aplicar técnicas avançadas de HTML, CSS e Javascript.

Seu objetivo é implementar uma tabela responsiva em HTML, que foi alimentada com dados dos 55 álbuns de música mais vendidos da história. A partir dessa base, foi manipulado o código Javascript para executar uma ordenação interativa ao clicar nos cabeçalhos da tabela *(Artista, Álbum, Ano, Vendas e Posição)*, alternando entre ordem crescente.

<img width="1885" height="70" alt="image" src="https://github.com/user-attachments/assets/34b111bf-9522-47f7-be5c-9be7e10bfaf4" />

##  Tecnologias utilizadas

- **HTML5:** Estruturação semântica completa (`<thead>`, `<tbody>`, `<caption>`, etc.).
- **CSS3:** Estilização responsiva, aplicação de efeito zebra (`:nth-child`), bordas colapsadas e alinhamentos específicos.
- **JavaScript (Vanilla):** Manipulação de DOM, ordenação de arrays e lógica de renderização sem uso de frameworks externos.
- **Visual Studio Code** - versão: 1.139.1

---

##  Funcionalidades

- **Estrutura Semântica:** Tabela construída utilizando as melhores práticas do HTML5.
- **Estilo Zebra:** Linhas com cores alternadas para facilitar a leitura de grandes volumes de dados.
- **Agrupamento de Dados (Rowspan):** Células com informações repetidas em sequência (como o mesmo artista ou ano) são agrupadas visualmente.
- **Ordenação Dinâmica (Desafio JS):** 
  - Ao clicar em qualquer coluna do cabeçalho, a tabela é ordenada automaticamente.
  - O script identifica se a coluna contém texto (ordem alfabética) ou números (ordem matemática).
  - O agrupamento de `rowspan` é desfeito para a ordenação e reconstruído dinamicamente em tempo real com base na nova ordem dos dados.
- **Responsividade:** A tabela se adapta à largura da tela do usuário.

---

##  Estrutura do Projeto

O projeto foi organizado separando as responsabilidades em pastas para manter o código limpo:

```text
📦 Projeto
 ┣ 📂 Css
 ┃ ┗ 📜 tabela-analipe.css
 ┣ 📂 Javascript
 ┃ ┗ 📜 tabela-analipe.js
 ┣ 📂 imagem
 ┃ ┗ 🖼️ brilhos.svg
 ┗ 📜 index.html
