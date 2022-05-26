let imagem1;
let botoes;
let count;
let proximo = true;

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
    count = 1;      //Contador da imagem do carrosel, começa em 1
    
    let posicaoInicial, posicaoFinal;

    slider = document.getElementById("slider");

    slider.addEventListener('dragstart', (e) => e.preventDefault());
    slider.addEventListener('mousedown', (e)=>{
        console.log("mousestart");
        posicaoInicial = e['screenX'];
        console.log(posicaoInicial);
    })

    slider.addEventListener('mouseup', (e)=>{
        posicaoFinal = e['screenX'];
        let resultadoMovimento = posicaoFinal - posicaoInicial;
        
        console.log("mouseend");
        console.log(posicaoFinal);
        console.log(`Movimento Inicial: ${posicaoInicial}, Movimento Final: ${posicaoFinal}, Diferença: ${resultadoMovimento}`);

        if (resultadoMovimento < 0){
            console.log("proxima imagem");
            proximo = true;     //Deve exibir proxima imagem
            nextImage();
        } else if(resultadoMovimento > 0){
            console.log("imagem anterior");
            proximo = false;        //Deve exibir imagem anterior
            nextImage();
        }
    })
    

    slider.addEventListener('touchstart', (e)=>{
        //console.log("touchstart");
        posicaoInicial = e.touches[0]['screenX'];
        //console.log(posicaoInicial);
    })

    slider.addEventListener('touchend', (e)=>{
        posicaoFinal = e.changedTouches[0]['screenX'];
        let resultadoMovimento = posicaoFinal - posicaoInicial;
        
        //console.log("touchend");
        //console.log(`Movimento Inicial: ${posicaoInicial}, Movimento Final: ${posicaoFinal}, Diferença: ${resultadoMovimento}`);

        if (resultadoMovimento < 0){
            //console.log("proxima imagem");
            proximo = true;     //Deve exibir proxima imagem
            nextImage();
        } else if(resultadoMovimento > 0){
            //console.log("imagem anterior");
            proximo = false;        //Deve exibir imagem anterior
            nextImage();
        }
    })
}

setInterval(function(){
    nextImage();
    }, 200000);


//Função para mover a imagem por tempo ou por touch
function nextImage(){
    if (proximo){
        count++;
        if (count>6){   //Se chegou na ultima imagem, volta pra primeira
            count = 1;
        }
    } else{
        count--;
        if (count<1){   //Se está na primeira, vai pra última quando volta
            count = 6;
        }
    }
    proximo = true;     //Coloca a próxima imagem se não houver touch

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
        }
    }
}

