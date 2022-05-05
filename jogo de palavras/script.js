/*const corretaSom = new Audio('sons/correct.mp3');
const erradaSom = new Audio('sons/wrong.mp3')
corretaSom.volume -= 0.8;
erradaSom.volume -= 0.8;*/


let perguntas = [
    {
        titulo: "Quantos oceanos existem?",
        alternativas: ["3", "5", "1", "4"],
        correta: 1
    },
    
    {
        titulo: "Qual o maior oceano?",
        alternativas: ["Atlântico", "Glacial Ártico", "Índico", "Pacífico"],
        correta: 3
    },
    
    {
        titulo: "Os oceanos cobrem a superfície da terra em cerca de:",
        alternativas: ["70%", "100%", "28%", "49%"],
        correta: 0
    },

    {
        titulo: "A Fossa das Marianas se encontra no oceano:",
        alternativas: ["Glacial Ártico", "Atlântico", "Pacífico", "Glacial Antártico"],
        correta: 2
    },

    {
        titulo: "Qual a formula quimica da água?",
        alternativas: ["H2O", "HO2", "2HO", "HO"],
        correta: 0
    },

    {
        titulo: "Um corpo adulto possui até... de água no corpo",
        alternativas: ["80%", "65%", "78%", "53%"],
        correta: 1
    },

    {
        titulo: "Algas marinhas produzem cerca de ôxigenio... de todo o planeta",
        alternativas: ["12%", "70%", "99%", "55%"],
        correta: 3
    }
]

let app = {
    start: function() {
        this.atualPos = 0;
        this.totalPontos = 0;
        this.arrleatorio(perguntas);

        let alts = document.querySelectorAll('.alternativa');
        alts.forEach((element, index)=>{
            element.addEventListener('click', ()=>{
                this.checaResposta(index);
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
            swal({
                title: 'Parábens, Você completou o Quiz',
                text: 'Sua pontuação final foi: ' + this.totalPontos,
                incon: "success",
                button: "Finalizar"
            }).then((proxPag) =>{
                window.location.href = "fim.html";
            });
        }
    },

    checaResposta: function(user){
        if(this.qatual.correta == user){
            //corretaSom.play();
            this.totalPontos++;
            this.mostraResposta(user);
        }
        else{
            //erradaSom.play();
            this.mostraResposta(user);
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
        let res = perguntas[this.atualPos].correta;
        // formatar como a mensagem será exibida
        if(correto == res){
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
    },

    arrleatorio: function(arr){
        // Loop em todos os elementos
        for (let i = arr.length - 1; i > 0; i--) {
            // Escolhendo elemento aleatório
            const j = Math.floor(Math.random() * (i + 1));
            // Reposicionando elemento
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        // Retornando array com aleatoriedade
        return arr;
    }
}
app.start();
   