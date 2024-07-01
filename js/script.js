let botaoImage =  document.querySelector("#foto"); //captura o input que aciona o input file para escolher a foto
let fileSelector = document.querySelector("#fileSelector"); //captura o input file para selecionar a foto
let apagar = document.querySelector("#apagar"); //captura o botão que dá a opção de excluir a foto
let curriculoFoto = document.querySelector("#curriculoFoto"); //Captura o campo que será exibido a foto selecionada, no curriculo;


botaoImage.addEventListener("click", function(e){//Adiciona um ouvinte para evento de click;
    e.preventDefault();
    fileSelector.click(); //executa uma função de click no input file ao clicar o botaoImage;
}) 


let imageSrc; //Variável para armazenar a URL da imagem

let imageBoole = true;

fileSelector.addEventListener("change", function(){ //Define a imagem após selecionála
    imageBoole = false;
    const file = this.files[0];
    const reader = new FileReader(); /**permite que aplicativos da web leiam de forma assíncrona o conteúdo de arquivos (ou buffers de dados brutos)
     armazenados no computador do usuário, usando File ou Blob objetos para especificar o arquivo ou dados a serem lidos. */
    
    
     reader.onload = function(e){ //Onload "carregando", após fileReader for carregado executa a função a seguir
        imageSrc = e.target.result;
        curriculoFoto.style.backgroundImage = `url('${imageSrc}')`;
        botaoImage.style.backgroundImage = `url('${imageSrc}')`;
        botaoImage.style.color = "transparent";
        botaoImage.style.textShadow = "none";
        apagar.style.display = "block";
    }
    reader.readAsDataURL(file);
})

let lixao = document.querySelector("#lixao");

botaoImage.addEventListener("mouseenter", function(){
    if(imageBoole === false){ //Verificação para saber se já tem alguma imagem selecionada e liberar a exibição do botão lixeira;
        lixao.style.display = "block";
    }
})
botaoImage.addEventListener("mouseleave", function(){ //Faz a lixeira sumir ao tirar o mouse de cima do botão que seleciona imagem;
    lixao.style.display = "none"
})
lixao.addEventListener("mouseenter", function(){
    lixao.style.display = "block"  //Mantém a lixeira visivel ao por o mouse encima dela, tirando de cima do botaoImage;
    botaoImage.disabled = true; //Desabilita o botaoImage para que ele não seja acionado ao clicar na lixeira;
})
lixao.addEventListener("mouseleave", function(){
    botaoImage.disabled = false; //Habilita o botão image ao tirar o mouse de cima da lixeira;
})

lixao.addEventListener("click",  function(){ //Adiciona um evento de click na lixeira
    botaoImage.style.backgroundImage = "none";
    curriculoFoto.style.backgroundImage = "none";
    botaoImage.style.color = "rgb(52, 83, 109)";
    botaoImage.style.textShadow = "2px 1px 3px rgba(0, 0, 0, 0.253)";
    imageBoole = true;
})


//Fazer aparecer o campo para adicionar nova experiência profissional e formação acadêmica;
function newCamp(element){
    let valorData = element.dataset.aparecer;
    let blocoAparecer = document.querySelector(`#${valorData}`);

    element.addEventListener("click", function(event){
        event.preventDefault();
        blocoAparecer.style.display = "flex";
    })
}

//Fazer sumir o campo que adiciona nova experiência profissional e formação acadêmica;
function offCamp(element){
    let valorData = element.dataset.fechar;
    let blocoFechar = document.querySelector(`#${valorData}`);

    element.addEventListener("click", function(event){
        event.preventDefault();
        blocoFechar.style.display = "none";
    })
}

function addExpEFormacao(elemento1, elemento2){
    let onNewCamp = document.querySelectorAll(`.${elemento1}`); //Tive que passar elementos em forma de variável porque o elemento ainda não está criado no DOM ao iniciar a página
    let offNewCamp = document.querySelectorAll(`.${elemento2}`);

    onNewCamp.forEach(function(element){
        newCamp(element)
    })

    offNewCamp.forEach(function(element){
        offCamp(element)
    })
}

let curriculoInfoPessoal = document.querySelector(".curriculoInfoPessoal"); //Captura o campo onde fica as informações primárias
let check = document.querySelector("#checkboxMais"); //captura o checkbox de "Acrescentar detalhes adicionais"
let adicional = document.querySelector("#adicional");


check.addEventListener("change", function(event){ //adiciona um evento que vai executar a função quando o checkbox for alterado;
    let extras = document.querySelectorAll(".extra");
    var campoExtra = document.querySelectorAll(".campoExtra");
    let curriculoPessoalLi = document.querySelectorAll(".curriculoInfoPessoal .permanente");
    var contatoContador = false;

    //Verifica se os li com classe "permanete" contém valor, caso tenha, "contato" fica na tela, caso não, "contato" sai da tela;
    curriculoPessoalLi.forEach(function(element){
        if(element.textContent !== ""){
            contatoContador = true
        }
    })

    if(event.target.checked){ //.target aponta para o elemento que chamou a função, "o botão check que acionou o evento 'change', portanto apontou para ele mesmo ";
        //Adicionar campos adicionais.
        adicional.innerHTML = `
    <div class="areaDeInput">
                            <div class="nascimento inputBox"> 
                                <input type="date" id="nascimento" name="nascimento" data-input="currNasc">
                                <label for="nascimento">Data de Nascimento</label>
                            </div> <!-- Data de Nascimento -->
                            
                            <div class="nacionalidade inputBox"> 
                                <input type="text" id="nacionalidade" name="nacionalidade" placeholder="Ex: Brasileira" data-input="currNatur">
                                <label for="nacionalidade">Nacionalidade</label>
                            </div> <!-- Naturalidade -->
                            
                            <div class="portifolio inputBox"> 
                                <input type="text" id="portifolio" name="portifolio" placeholder="ex: Linkedin, website e portifólio" data-input="currPort">
                                <label for="portifolio">Link</label>
                            </div> <!-- Portifolio -->
                        
                            <div class="estadoCivil inputBox" id="estadoC"> 
                                <select name="estadoCivil" id="estadoCivil" name="estadoCivil" data-input="currEstadoC">
                                    <option value="nenhum">Nenhum</option>
                                    <option value="solteiro">Solteiro(a)</option>
                                    <option value="casado">Casado(a)</option>
                                    <option value="separado">Separado(a)</option>
                                    <option value="divorciado">Divorciado(a)</option>
                                    <option value="viuvo">Viúvo(a)</option>
                                </select>
                                <label for="estadoCivil">Estado Civil</label>
                            </div> <!-- Estado Civil -->
                        </div>

                        <div class="areaDeInput">
                            <div class="experiencia inputBox">
                                <div class="newCamp" id="newCampExp">
                                    <button class="fecharNewCamp fecharCamp" data-fechar="newCampExp"></button>
                                    <div class="newInputCamp"><input type="text" id="cargo" name="cargo"><label for="cargo">Cargo</label></div>
                                    <div class="newInputCamp"><input type="text" id="empregador" name="empregador"><label for="empregador">Empregador</label></div>
                                    <div class="newInputCamp"><input type="text" id="cidade" name="cidade"><label for="cidade">Cidade</label></div>
                                    <div class="newInputCamp"><input type="text" id="estado" name="estado"><label for="estado">Estado</label></div>
                                    <div class="newInputCamp"><input type="month" id="dataInicio" name="dataInicio" class="form-control"><label for="dataInicio">Data Inicio</label></div>
                                    <div class="newInputCamp"><input type="month" id="dataFinal" name="dataFinal" class="form-control"><label for="dataFinal">Data Final</label></div>
                                    <div class="newInputCamp"><input type="button" id="confirmarExp" value="confirmar" onclick='adicionarCampo("currExpContainer", "cargo", "empregador", "cidade", "estado", "dataInicio", "dataFinal", "expCurriculo", "newCampExp", 1)'></div>
                                </div> 
                                <input type="button" data-aparecer="newCampExp" value="Adicionar Experiência Profissional" class="adicionarInfo aparecerNewCamp">
                                <label for="exp">Experiência Profissional</label>
                            </div> <!-- Experiência -->
                        
                            <div class="formacaoAcademica inputBox">
                                <div class="newCamp" id="newCampFormacao">
                                    <button class="fecharNewCamp fecharCamp" data-fechar="newCampFormacao"></button>
                                    <div class="newInputCamp"><input type="text" name="instituicao" id="instituicao"><label for="instituicao">Instituição</label></div>
                                    <div class="newInputCamp"><input type="text" name="cidadeForm" id="cidadeForm"><label for="cidade">Cidade</label></div>
                                    <div class="newInputCamp"><input type="text" name="qualific" id="qualific"><label for="qualific">Qualificação ou grau</label></div>
                                    <div class="newInputCamp"><input type="text" name="area" id="area"><label for="area">Área de estudo</label></div>
                                    <div class="newInputCamp" id="newCampStatus"><select name="status" id="status">
                                        <option value="nenhum">Nenhum</option>
                                        <option value="Concluído">Concluído</option>
                                        <option value="Formado">Formado</option>
                                        <option value="Cursando">Cursando</option>
                                        <option value="Trancado">Trancado</option>
                                    </select><label for="status">Status</label></div>
                                    <div class="newInputCamp"><input type="month" name="dataInicioEstudos" id="dataInicioEstudos" class="form-control"><label for="dataInicioEstudos">Data de inicio</label></div>
                                    <div class="newInputCamp"><input type="month" name="dataTerminoEstudos" id="dataTerminoEstudos" class="form-control"><label for="dataTerminoEstudos">Data de término</label></div>
                                    <div class="newInputCamp"><input type="button" id="confirmarExp" value="confirmar" onclick='adicionarCampo("currFormacao", "instituicao", "cidadeForm", "qualific", "area", "status", "dataInicioEstudos", "formacaoCurriculo", "newCampFormacao", 0, "dataTerminoEstudos")'></div>
                                </div> 
                                <input type="button" data-aparecer="newCampFormacao" value="Adicionar Formação Acadêmica" class="adicionarInfo aparecerNewCamp">
                                <label for="formacao">Formação Acadêmica</label>
                            </div> <!-- Formação Acadêmica -->
                        </div>

                        <div class="areaDeTexto">
                            <div class="habilidades inputBox"> 
                                <textarea name="habilit" id="habilit" rows="4" placeholder="Pressione 'Enter' para pular linha e adicionar uma nova Competência"></textarea>
                                <label for="habilit">Habilidades</label>
                            </div> <!-- Habilidades -->

                            <div class="idiomas inputBox"> 
                                <textarea name="idioma" id="idioma" placeholder="Pressione 'Enter' para pular linha e adicionar um novo idioma" rows="4"></textarea>
                                <label for="idioma">Idiomas</label>
                            </div> <!-- Idiomas -->

                            <div class="resumo inputBox"> 
                                <textarea name="resumo" id="resumo" placeholder="Resumo..." rows="4"></textarea>
                                <label for="resumo">Resumo</label>
                            </div> <!-- Resumo -->
                        </div>
`;

        addExpEFormacao("aparecerNewCamp", "fecharCamp"); //Função apara ativar a funcionalidade dos botões de adicionar Experiência Profissional e Formação Acadêmica;

        //Faz os elementos com a classe "extra" que possuem valor, apareçam no curriculo
        extras.forEach(function(element){ 
            if(element.textContent !== ""){ //verifica se o texto contido no elemento é diferente de " ";
                element.style.display = "block";
            }
        })


        //Faz os campos extras desaparecerem ao desmarcar o checkbox
        campoExtra.forEach(function(element){
            let ultimoFilho = element.lastElementChild; //pega o ultimo filho do elemento;
            
            if(ultimoFilho.textContent.trim() !== ""){ //Verifica se o ultimo filho contem texto
                element.style.display = "block";
            } 
        })

        if(contatoContador){
            curriculoInfoPessoal.style.display = "block";
        }

        mandarValor(); //Chama a função que vai passar o valor dos inputs para a demonstração do curriculo, novamente porque eles não recebem o evento de "input" ao iniciar a página pois não estão nela;
        
    }else{
        //Remover campos adicionais.
        adicional.innerHTML = " ";
        extras.forEach(function(element){ //Faz os elementos com a classe "extra" sumirem do curriculo;
            element.style.display = "none";
        })

        campoExtra.forEach(function(element){
            element.style.display = "none";
        })

        if(contatoContador === false){
            curriculoInfoPessoal.style.display = "none"
        }
    }
    
})


//Função para edição de arrays em lista desordenada. Criar um elemento <li> para cada linha que for escrita no campo textArea "habilidades";
function transformTextEmLinhas(textoInicial, listaAdicionar, container){
    const textArea = document.querySelector(`#${textoInicial}`);
    const texto = textArea.value;

    const linhas = texto.split('\n') //Divide o texto em linhas

    const lista = document.querySelector(`#${listaAdicionar}`);

    lista.innerHTML = "";

    linhas.forEach(function(linha){
        if(linha.trim() !== ""){ //Para ignorar as linhas vazias;
            const li = document.createElement("li");
            li.textContent = linha.trim(); //Adiciona texto da linha ao li/ trim() é para remover espaços em branco antes e depois da string;
            lista.appendChild(li);
        }
    })
    let containerUl = document.querySelector(`#${listaAdicionar}`); //Seleciona o Ul;
    let containerCamp = document.querySelector(`#${container}`); //Seleciona o container de Habilidades;

    if(containerUl.children.length > 0){ //Verifica se a quantias de filhos dentro do Ul é maior 0;
        containerCamp.style.display = "flex"; //Faz o container aparecer
    }else{
        containerCamp.style.display = "none"; //Faz o container sumir;
    }
}


//FUNÇÃO PASSAR VALOR DOS INPUTS PARA O CURRICULO;
function mandarValor(){
let allInputs = document.querySelectorAll("input, select, textarea");
allInputs.forEach(function(element){
             // Faz a identificação se o elemento é um input, select ou textarea
            let tipoDeEvento;
            switch(element.tagName.toLocaleLowerCase()){
                case 'select': tipoDeEvento = 'change'
                break;
                case 'input': 
                case 'textarea': tipoDeEvento = 'input'
                break;
            }
            element.addEventListener(tipoDeEvento, function(e){
                let curriculoNome = document.querySelector("#curriculoNome"); //Seleciona a área onde vai ficar o nome no curriculo
                let nomeCompleto = document.querySelector("#nome").value.toUpperCase() + " " +document.querySelector("#sobrenome").value.toUpperCase(); //Concatena nome e sobrenome
                let h1 = document.querySelector("header h1");
                identificador = e.target.id; //Armazena o id do input que ativou a função "input";
                
                if(identificador == "nome" || identificador == "sobrenome"){ //só para verificar se o input preenchido foi "nome" ou "sobrenome", para não ficar atribuindo o valor toda vez que um input aleatório for alterado.
                    if(nomeCompleto.length > 15 && nomeCompleto.length < 20){
                        h1.style.fontSize = "30px";

                    } else if(nomeCompleto.length >= 20){
                        h1.style.fontSize = "25px";          //Mudar tamanho do Nome com base no tamanho do nome da pessoa;

                    }else{
                        h1.style.fontSize = "50px";
                    }
                    curriculoNome.textContent = nomeCompleto;
                }

                if(identificador == "endereco" ||
                    identificador == "tell" ||
                    identificador == "email" ||
                    identificador == "nascimento" ||            //Fazer a exibição da área de Contado apenas quando um desses inputs forem alterados
                    identificador == "nacionalidade" ||
                    identificador == "portifolio" ||
                    identificador == "estadoCivil"){
                    curriculoInfoPessoal.style.display = "block";

                    let inputData = document.querySelector(`#${identificador}`).dataset.input; //captura o valor do data-input do input que foi ativado. Ex: "data-input='currEnd'";
                    let campoCorrespondente = document.querySelector(`#${inputData}`); //Passa o valor do data-input para capturar o elemento que possui o ID igual;
                    
                    let valorDoInput = document.querySelector(`#${identificador}`).value; //Captura o valor que está sendo digitado dentro do input;

                    if(campoCorrespondente){ //Fazer essa verificação para ver se o input acionado é válido, se não a linha abaixo vai ficar tentando mudar o estilho de "nada" e vai retornar erro;
                        campoCorrespondente.style.display = "block"; //Faz a linha correspondente ao input aparecer;
                        campoCorrespondente.textContent = valorDoInput; //Passa o valor do input para a linha que apareceu;
                    }

                    if(element.value === ""){
                        campoCorrespondente.style.display = "none";
                    }
                    
                    //Verifica sem "contato" vai ficar visivel ou não
                    let contatoLi = document.querySelectorAll(".curriculoInfoPessoal ul li");
                    let allEmpty = true
                    contatoLi.forEach(function(e){
                        if(e.textContent !== ""){
                            curriculoInfoPessoal.style.display = "block";
                            allEmpty = false;
                        }
                    });
                    if(allEmpty){
                        curriculoInfoPessoal.style.display = "none";
                    }
                }

                if(identificador == "habilit"){ 
                    transformTextEmLinhas("habilit", "habilidadesUl", "habilidades") //Id do textArea, Ul, Container
                }
                if(identificador == "idioma"){
                    transformTextEmLinhas("idioma", "idiomasUl", "currIdiomas") //Id do textArea, Ul, Container
                }
                if(identificador == "resumo"){
                    let currResumoContainer = document.querySelector("#currResumo");//Container ;
                    let currResumoText = document.querySelector("#currResumoText"); //Campo onde vai aparecer o resumo. tag <p>;
                    let inputResumo = document.querySelector("#resumo").value; //Valor do input do resumo;

                    linhas = inputResumo.split("\n");

                    currResumoText.innerHTML = ""; //Para limpar o conteúdo anterior;

                    

                    // e.target retorna o elemento que ativou o INPUT, NÃO ESQUEÇA ISSO DNV.
                    if(e.target.value === ""){
                        currResumoContainer.style.display = "none";
                    }else{
                        currResumoContainer.style.display = "block";
                    }

                    linhas.forEach(function(linha){
                        let textNode = document.createTextNode(linha);
                        let br = document.createElement("br");
                        currResumoText.appendChild(textNode);
                        currResumoText.appendChild(br);
                    })
                }
            })
    })
}

mandarValor(); //Chama a função que vai passar o valor dos inputs para a demonstração do curriculo;


//Container no curriculo, elemento 1, elemento2, elemento3, elemento4, elemento5, elemento6, div onde vai ser inserido os parágrafos, caixa de inputs que adiciona os valores;
function adicionarCampo(currContainer, element1, element2, element3, element4, element5, element6, divContent, newCamp, contador = 0, element7 = ""){
    document.querySelector(`#${currContainer}`).style.display = "block" //torna o container visivel;
    let novasExp = document.querySelector("#novasExp");
    let novasFormacoes = document.querySelector("#novasFormacoes");
    
    // Cria um novo input tipo hidden
    let novoInput = document.createElement("input");
    novoInput.setAttribute("type", "hidden");


    let el1 = document.querySelector(`#${element1}`).value;
    let el2 = document.querySelector(`#${element2}`).value;
    let el3 = document.querySelector(`#${element3}`).value;
    let el4 = document.querySelector(`#${element4}`).value;
    let el5 = document.querySelector(`#${element5}`).value;
    let el6 = document.querySelector(`#${element6}`).value;
    if(element7 !== ""){var el7 = document.querySelector(`#${element7}`).value;} 

    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let pularLinha = document.createElement("br");
    
    
    let divCont = document.querySelector(`#${divContent}`); //div onde vai ser inserido os parágrafos
    if(contador == 1){
        p1.textContent = `${el1}, ${el5} - ${el6}`;
        p2.textContent = `${el2} - ${el3}, ${el4}`;

        divCont.appendChild(p1);
        divCont.appendChild(p2);
        divCont.appendChild(pularLinha);

        //adiciona name ao input com valor da quantia de filhos que o o elemento onde está, tem.
        novoInput.setAttribute("name", `newExp${novasExp.children.length}`);
        //Define o valor do input
        novoInput.value = `${p1.textContent}\n${p2.textContent}\n${pularLinha.textContent}`

        //Adiciona o input ao container invisivel;
        novasExp.appendChild(novoInput);

        console.log(novasExp);
        
    }else{
        p1.textContent = `${el3}: ${el4}, ${el6} - ${el7}`;
        p2.textContent = `${el1} - ${el2}`;
        p3.textContent = `Status - ${el5}`;

        divCont.appendChild(p1);
        divCont.appendChild(p2);
        divCont.appendChild(p3);
        divCont.appendChild(pularLinha);


        novoInput.setAttribute("name", `newForm${novasFormacoes.children.length}`);
        novoInput.value = `${p1.textContent}\n${p2.textContent}\n${p3.textContent}\n${pularLinha.textContent}`

        novasFormacoes.appendChild(novoInput);

        console.log(novasFormacoes)
    }
    
    
    
    //Formata os campos de input;
    document.querySelector(`#${element1}`).value = "";
    document.querySelector(`#${element2}`).value = "";
    document.querySelector(`#${element3}`).value = "";
    document.querySelector(`#${element4}`).value = "";
    document.querySelector(`#${element5}`).value = "";
    document.querySelector(`#${element6}`).value = "";
    if (element7 !== "") {
        document.querySelector(`#${element7}`).value = "";
    }

    document.querySelector(`#${newCamp}`).style.display = "none"; //Fecha a caixa de inputs;
}

