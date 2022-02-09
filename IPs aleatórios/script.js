function aleatorio(){
    var select = document.getElementById('ip')
    var val = select.options[select.selectedIndex].value
    var res = document.getElementById('res')

    if (val == "Select")
        alert("Selecione uma classe!!!")

    else if (val == "A") {
        let num1 = 1 + Math.floor(254 * Math.random())
        let num2 = 1 + Math.floor(254 * Math.random())
        let num3 = 1 + Math.floor(254 * Math.random())
        res.value = `10.${num1}.${num2}.${num3}`
    }

    else if (val == "B") {
        let num1 = 16 + Math.floor(16 * Math.random())
        let num2 = 1 + Math.floor(254 * Math.random())
        let num3 = 1 + Math.floor(254 * Math.random())
        res.value = `172.${num1}.${num2}.${num3}`
    }

    else if (val == "C") {
        let num1 = 1 + Math.floor(254 * Math.random())
        let num2 = 1 + Math.floor(254 * Math.random())
        res.value = `192.168.${num1}.${num2}`
    }
}

