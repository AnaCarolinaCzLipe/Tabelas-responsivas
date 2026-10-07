document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("tbody");
    const headers = document.querySelectorAll("th");
    let ordenacaoAtual = { coluna: -1, crescente: true };

   
    function extrairDados() {
        const linhas = Array.from(tbody.querySelectorAll("tr"));
        const dados = [];
        const rowspansPendentes = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
        const valoresPendentes = { 0: "", 1: "", 2: "", 3: "", 4: "" };

        linhas.forEach(tr => {
            const celulas = Array.from(tr.querySelectorAll("td"));
            let linhaArr = [];
            let indiceDOM = 0;

            for (let col = 0; col < 5; col++) {
                if (rowspansPendentes[col] > 0) {
                    linhaArr.push(valoresPendentes[col]);
                    rowspansPendentes[col]--;
                } else {
                    const td = celulas[indiceDOM];
                    const texto = td.innerText;
                    linhaArr.push(texto);
                    
                    if (td.hasAttribute("rowspan")) {
                        rowspansPendentes[col] = parseInt(td.getAttribute("rowspan")) - 1;
                        valoresPendentes[col] = texto;
                    }
                    indiceDOM++;
                }
            }
            dados.push(linhaArr);
        });
        return dados;
    }

   
    function renderizarTabela(dados) {
        tbody.innerHTML = ""; 
        
        for (let i = 0; i < dados.length; i++) {
            const tr = document.createElement("tr");
            
            for (let col = 0; col < 5; col++) {
                
                let deveOcultar = false;
                if (i > 0 && dados[i][col] === dados[i - 1][col]) {
                    deveOcultar = true;
                }

                if (!deveOcultar) {
                    const td = document.createElement("td");
                    td.innerText = dados[i][col];
                    
                   
                    if (col === 0 || col === 1) td.className = "escrita";
                    else td.className = "numeros";

                    
                    let rowspan = 1;
                    for (let proximo = i + 1; proximo < dados.length; proximo++) {
                        if (dados[proximo][col] === dados[i][col]) rowspan++;
                        else break;
                    }
                    
                    if (rowspan > 1) {
                        td.setAttribute("rowspan", rowspan);
                    }
                    tr.appendChild(td);
                }
            }
            tbody.appendChild(tr);
        }
    }


    function limparTexto(texto) {
        let limpo = texto.replace("º", "").replace(" milhões", "").replace(" mil", "").replace(",", ".");
        return limpo.trim();
    }

    // 3. Adicionar o evento de clique nos cabeçalhos
    headers.forEach((th, index) => {
        th.style.cursor = "pointer"; 
        th.title = "Clique para ordenar";
        
        th.addEventListener("click", () => {
            const dados = extrairDados();
            
            if (ordenacaoAtual.coluna === index) {
                ordenacaoAtual.crescente = !ordenacaoAtual.crescente;
            } else {
                ordenacaoAtual.coluna = index;
                ordenacaoAtual.crescente = true;
            }

            // Lógica de ordenação
            dados.sort((a, b) => {
                let valorA = a[index];
                let valorB = b[index];
                
                // Colunas de números (Ano = 2, Vendas = 3, Posição = 4)
                if (index >= 2) {
                    let numA = parseFloat(limparTexto(valorA));
                    let numB = parseFloat(limparTexto(valorB));
                    
                    // Ajuste para não confundir "800 mil" com "43 milhões"
                    if (valorA.includes("mil") && !valorA.includes("milhões")) numA = numA / 1000;
                    if (valorB.includes("mil") && !valorB.includes("milhões")) numB = numB / 1000;
                    
                    return ordenacaoAtual.crescente ? numA - numB : numB - numA;
                } else {
                    // Colunas de texto (Artista = 0, Álbum = 1)
                    return ordenacaoAtual.crescente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
                }
            });

            renderizarTabela(dados);
        });
    });
});