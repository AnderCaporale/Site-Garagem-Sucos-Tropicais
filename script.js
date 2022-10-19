let imagem1;
let botoes;
let countCarrosel;
let proximaImagemCarrosel = true;

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
    }

    antBtn.onclick = function(){
        count--;
        if (count <= 0){
            count = fotos.length - 1;
        }
        modalImg.src = fotos[count].src;
    }
}





//Funções para o slider do início
window.addEventListener("load", inicializar);   //Inicializar variáveis ao carregar a página

function inicializar(){
    imagem1 = document.getElementById("img1");
    botoes = document.getElementsByName("radio");
    countCarrosel = 1;      //Contador da imagem do carrosel, começa em 1
    
    let posicaoInicial, posicaoFinal;   //Posições inicial e final do cursor
    let slider = document.getElementById("slider");

    slider.addEventListener('dragstart', (e) => e.preventDefault()); //Não deixa mover imagem
    slider.addEventListener('mousedown', (e)=>{
        posicaoInicial = e['screenX'];
    })

    slider.addEventListener('mouseup', (e)=>{
        posicaoFinal = e['screenX'];
        moverCarrosel(posicaoFinal, posicaoInicial);
    })
    
    slider.addEventListener('touchstart', (e)=>{
        posicaoInicial = e.touches[0]['screenX'];
    })

    slider.addEventListener('touchend', (e)=>{
        posicaoFinal = e.changedTouches[0]['screenX'];
        moverCarrosel(posicaoFinal, posicaoInicial);
    })
}

function moverCarrosel(posicaoFinal, posicaoInicial){

    let resultadoMovimento = posicaoFinal - posicaoInicial;

    if (resultadoMovimento < 0){
        proximaImagemCarrosel = true;           //Deve exibir proxima imagem
        nextImage();
    } else if(resultadoMovimento > 0){
        proximaImagemCarrosel = false;          //Deve exibir imagem anterior
        nextImage();
    }
}

setInterval(function(){
    nextImage();
    }, 5000);


//Função para mover a imagem por tempo ou por touch
function nextImage(){
    let qtdFotos = document.getElementById("slider").firstElementChild.childElementCount;

    if (proximaImagemCarrosel){
        countCarrosel++;
        if (countCarrosel>qtdFotos){    //Se chegou na ultima imagem, volta pra primeira
            countCarrosel = 1;
        }
    } else{
        countCarrosel--;
        if (countCarrosel<1){           //Se está na primeira, vai pra última quando volta
            countCarrosel = qtdFotos;
        }
    }
    proximaImagemCarrosel = true;       //Coloca a próxima imagem se não houver touch

    //Seleciona radio da próxima imagem (e já desmarca a anterior)
    document.getElementById("radio"+countCarrosel).checked = true;

    //Coloca a imagem correta na exibição (a primeira começa em 0)
    imagem1.style.marginLeft = -((countCarrosel-1)*imagem1.width) + "px";

}

//Mudar imagem do slider manualmente
function mudarImagem(numImagem=0){

    // Se não for passado nenhum parâmetro, percorre os botões para ver qual imagem está selecionada
    let qtdFotos = document.getElementById("slider").firstElementChild.childElementCount;
    for (i=0; i<qtdFotos; i++){
        if (botoes[i].checked){
            countCarrosel = i;
            imagem1.style.marginLeft = -(i*imagem1.width) + "px";
        }
    }

    // Se for passado parâmetro numImagem, já coloca a imagem correta diretamente
    //imagem1.style.marginLeft = -(numImagem*imagem1.width) + "px";
}

