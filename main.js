const botoes = document.querySelectorAll("div.btn-formatacao");
const sons = document.getElementsByTagName("audio");
let img = document.querySelectorAll("img.foto");
const corpo = document.querySelector("body");

lista_sons = ['som-inez', 'som-flay', 'som-juliette', 'som-karol', 'som-regina', 'som-nadaAverIrmao', 'som-melody', 'som-juninhoCaldeirao', 'som-ygona']

class Pad{
    constructor(botoes, sons, imagens, lista_nome_sons){
        this.botoes = botoes
        this.sons = sons
        this.imagens = imagens
        this.lista = lista_nome_sons
    }
    addSom(nome){
        this.lista.push(nome)
    }
}

const padMemes = new Pad(botoes, sons, img, lista_sons)

let verificador = 0;
let ultimoValorI = null
function tocar(som){
    img = document.querySelectorAll("img.foto");
    window.scrollTo({//quando tocar em um botão a tela scrolla pra cima para o usuário ver a imagem
        top:0,
        behavior: 'smooth'
    })
    for(let i = 0; i < sons.length; i++){
        if(som == padMemes.lista[i]){ //procura o som
            if(verificador == 0 || i == 0){//verifica se é o 1° som tocado ou é o som da posição 0 da lista_sons
                if(ultimoValorI != null){//se ultimoValorI for diferente de null quer dizer que ja foi tocado um som e tem uma imagem na tela
                    padMemes.sons[ultimoValorI].pause()
                    padMemes.sons[ultimoValorI].currentTime = 0;
                    img[ultimoValorI].style.display = 'none'//tira essa ultima imagem da tela
                    img[i].style.display = 'flex'//coloca a nova imagem
                    padMemes.sons[i].play()// toca o som correspondente a imagem
                    ultimoValorI = i//guarda qual foi o ultimo som e imagem
                    break
                }
                else{//é p primeiro som/imagem a ser reproduzido
                    img[i].style.display = 'flex'//mostrar a imagem
                    padMemes.sons[i].play()//tocar som
                    verificador++//mostra ao programa que o próximo som/imagem a ser reproduzido não é o 1°
                    ultimoValorI = i//guarda o som/imagem que foi reproduzido
                    break
                }
            }
            else{//não é o 1° som/imagem a ser reproduzido
                padMemes.sons[ultimoValorI].pause()
                padMemes.sons[ultimoValorI].currentTime = 0;
                img[ultimoValorI].style.display = 'none';
                img[i].style.display = 'flex';
                padMemes.sons[i].play()
                ultimoValorI = i
                break
            }
        }
    }
}
const showForms = document.querySelector("div.botao-forms")
const forms = document.querySelector("form")

showForms.addEventListener("click", ()=>{
    forms.style.display = 'flex'
})

const adicionar = document.querySelector("input#adicionar")

let input_audio = document.querySelector("input#audio")
let input_imagem = document.querySelector("input#imagem")

let imagem_url;
let audio_url;

input_imagem.addEventListener("change", (event)=>{
    imagem_url = URL.createObjectURL(event.target.files[0])
})
input_audio.addEventListener("change", (event)=>{
    audio_url = URL.createObjectURL(event.target.files[0])
})
adicionar.addEventListener("click", (event)=>{
    let input_nome = document.querySelector("input#nome").value//pegando valores dos inputs
    let input_cor = document.querySelector("input#cor").value
    
    document.querySelector("form").style.display = 'none'
    padMemes.addSom(String(input_nome))

    //criando botão e nó de texto
    div = document.createElement("div")
    paragrafo = document.createElement("p")
    texto_paragrafo = document.createTextNode(input_nome)
    
    //colocando o nó de textp dentro de uma tag P e colocando a tag P dentro de uma tag DIV(o botão)
    paragrafo.appendChild(texto_paragrafo)
    div.appendChild(paragrafo)
    div.style.background = input_cor
    div.classList.toggle("btn-formatacao")
    const container_botoes = document.querySelector("div.container")
    container_botoes.appendChild(div)//jogando o botão com seu texto no pad

    //criando tag IMG
    imagem = document.createElement("img")
    imagem.classList.toggle("foto")
    imagem.src = imagem_url
    const container_img = document.querySelector("div.imagens-container")
    container_img.appendChild(imagem)//jogando tag IMG no container de imgs

    //criando tag AUDIO
    audio = document.createElement("AUDIO")
    audio.src = audio_url
    audio.classList.toggle(input_nome)//colocando uma classe
    const container_sons = document.querySelector("div.sons-container")
    container_sons.appendChild(audio)//jogando tag AUDIO no container de audios

    addEventListener("click", tocar(input_nome))
})