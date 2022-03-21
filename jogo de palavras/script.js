const corretaSom = new Audio('sons/correct.mp3');
const erradaSom = new Audio('sons/wrong.mp3')
corretaSom.volume -= 0.8;
erradaSom.volume -= 0.8;


let perguntas = [
    {
    titulo: "Gato",
    alternativas: ["Rat", "Cat", "Gate", "Dog"],
    correta: 1
    },
    
    {
    titulo: "Alligator",
    alternativas: ["Motor", "Jaré", "Alicate", "Jacaré"],
    correta: 3
    },
    
    {
    titulo: "Tombstone",
    alternativas: ["Lápide", "Cascalho", "Pedra", "Cova"],
    correta: 0
    }
]

let app = {
    start: function() {
        this.atualPos = 0;
        this.totalPontos = 0;

        let alts = document.querySelectorAll('.alternativa');
        alts.forEach((element, index)=>{
            element.addEventListener('click', ()=>{
                this.checaResposta(index);
                this.mostraResposta(index);
            })
        })
        this.atualizaPontos();
        this.mostraquestao(perguntas[this.atualPos]);
    },

    mostraquestao: function(q){
        this.qatual = q;
        // mostrando o titulo
        let titleDiv = document.getElementById('titulo');
        titleDiv.textContent = q.titulo;
        // mostrando as alternativas
        let alts = document.querySelectorAll('.alternativa');
        alts.forEach(function(element, index) {
            element.textContent = q.alternativas[index];
        })
    },

    proximaPerg: function(){
        this.atualPos++;
        if(this.atualPos == perguntas.length){
            this.atualPos = 0;
        }
    },

    checaResposta: function(user){
        if(this.qatual.correta == user){
            console.log("Correta");
            //corretaSom.play();
            this.totalPontos++;
        }
        else{
            console.log("Errada!");
            //erradaSom.play();
        }

        this.atualizaPontos();
        this.proximaPerg();
        this.mostraquestao(perguntas[this.atualPos]);
    },

    atualizaPontos: function(){
        let scoreDiv = document.getElementById('pontos');
        scoreDiv.textContent = `Sua pontuação é: ${this.totalPontos}`;
    },

    mostraResposta: function(correto){
        let resultDiv = document.getElementById('result');
        let result = '';
        // formatar como a mensagem será exibida
        if(this.qatual.correta == correto){
            result = 'Resposta Correta!';
        }
        else{
            // obtendo a questão atual
            let pergunta = perguntas[this.atualPos];
            // obtenha o indice da resposta correta da questão atual
            let cIndice = pergunta.correta;
            // obtenha o texto da resposta correta da questão atual
            let cTexto = pergunta.alternativas[cIndice];
            result = `Incorreto! Resposta Correta: ${cTexto}`;
        }
        resultDiv.textContent = result;
    }
}
app.start(); 