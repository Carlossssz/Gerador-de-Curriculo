
//Ul, 

function tornarLista(ulCont){
    let ulMudar = document.querySelector(`#${ulCont}`); //Seleciona o Ul
    let liHabilit = ulMudar.firstElementChild.textContent; //Seleciona o li dentro de ul

    let linhas = liHabilit.split("\n"); //Divide o li com base nas quebras de linha

    ulMudar.innerHTML = ""; //Para remover o "li" que já está contido no ul;

    linhas.forEach(function(linha){ //passa o array com o texto separado por quebra de linha;
        let li = document.createElement("li");
        li.textContent = linha.trim();
        ulMudar.appendChild(li);
    })
}

tornarLista("habilidadesUl");
tornarLista("idiomasUl");