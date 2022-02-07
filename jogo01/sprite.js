function Sprite(x, y, largura, altura) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;

    this.desenha = function(xCanvas, yCanvas) {
        ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
    }
}

var bg = new Sprite(0, 0, 600, 550),
spriteChao = new Sprite(0, 550, 600, 50),
bonecoNormal = new Sprite(208, 623, 50, 50),
bonecoMorto = new Sprite(263, 623, 50, 50),
bonecoPula = new Sprite(318, 623, 50, 50),
bonecoCansado = new Sprite(373, 623, 50, 50);