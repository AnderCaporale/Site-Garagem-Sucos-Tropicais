let imagem1;
let botoes;
let tempo;
let count;


//Função para controlar a exibição das abas do site
function habilitar(id){

    document.querySelectorAll('.conteudo').forEach(elemento => {
        elemento.setAttribute('hidden', 'true');
    })

    document.querySelector('.selecionado').setAttribute('class', 'botao');

    document.getElementById(id).removeAttribute("hidden")
    document.getElementById(`bt-${id}`).setAttribute('class', 'selecionado');
}



//Função para mandar o email no contato
function sendMail() {
    var link = "mailto:garagemsucostropicais@hotmail.com"
             + "?cc="
             + "&subject=" + document.getElementById('assuntoEmail').value
             + "&body=" + document.getElementById('textoEmail').value
    ;

    window.location.href = link;
}



//Função para abrir Imagem Modal
function cliqueImagem(img){
    let count = img;
    let modalJanela = document.getElementById("janelaModal");
    let modalImg = document.getElementById("imgModal");
    let fecharBtn = document.getElementById("fecharModal");
    let proxBtn = document.getElementById("proxModal");
    let antBtn = document.getElementById("antModal");
    let fotos = document.getElementsByClassName("foto");

    modalJanela.style.display = "flex";
    modalImg.src = fotos[count].src;

    fecharBtn.onclick = function(){
        modalJanela.style.display = "none";
    }

    proxBtn.onclick = function(){
        count++;
        if (count >= fotos.length){
            count = 0;
        }
        modalImg.src = fotos[count].src;
        console.log(fotos[count].src)
    }

    antBtn.onclick = function(){
        count--;
        if (count <= 0){
            count = fotos.length - 1;
        }
        modalImg.src = fotos[count].src;
        console.log(fotos[count].src)
    }




}


//Funções para o slider do início
window.addEventListener("load", inicializar);   //Inicializar variáveis ao carregar a página

function inicializar(){
    imagem1 = document.getElementById("img1");
    botoes = document.getElementsByName("radio");
    tempo = 0;
    count = 0;
}

setInterval(function(){
    nextImage();
    }, 4000);


function nextImage(){
    count++;

    if (count>6){   //Se chegou na ultima imagem, volta pra primeira
        count = 1;
    }

    document.getElementById("radio"+count).checked = true;

    for (i=0; i<6; i++){
        if (botoes[i].checked){
            imagem1.style.marginLeft = -(i*imagem1.width) + "px";
        }
    }
}

//Mudar imagem do slider manualmente
function mudarImagem(){
    for (i=0; i<6; i++){
        if (botoes[i].checked){
            count = i;
            imagem1.style.marginLeft = -(i*imagem1.width) + "px";
            console.log(imagem1.width)
        }
        
    }
}

