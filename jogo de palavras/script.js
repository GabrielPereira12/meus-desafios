let pergunta = {
    titulo: "Gato",
    alternativas: ["Gat", "Cat", "Gate", "Dog"],
    correta: 1
};

function start() {

    let alts = document.querySelectorAll('.alternativa');
    alts.forEach(function(element, index) {
        element.addEventListener('click', function(){
            console.log("Checa resposta")
        });
    });
    mostraquestao(pergunta);
}

function mostraquestao(q){
    // mostrando o titulo
    let titleDiv = document.getElementById('titulo');
    titleDiv.textContent = q.titulo;
    // mostrando as alternativas
    let alts = document.querySelectorAll('.alternativa');
    alts.forEach(function(element, index) {
        element.textContent = q.alternativas[index];
    });
}

start();