let fulldata = document.querySelector('h1#data')
let data = new Date()

let pH = document.querySelector('img#pHoras')
let pM = document.querySelector('img#pMinutos')
let pS = document.querySelector('img#pSegundos')

uptSau(Number(data.getHours()))

uptDia(Number(data.getDate()))
uptSem(Number(data.getDay()))

uptHora(Number(data.getHours()))
uptMinu(Number(data.getMinutes()))
uptSegu(Number(data.getSeconds()))

setInterval(
    function update(){
        data = new Date()
        uptSegu(Number(data.getSeconds()))
        uptAnalog(Number(data.getSeconds()), Number(data.getMinutes()), Number(data.getHours()))
    }, 20)

function uptSau(h) {
    let saudacao = document.querySelector('h1#saud')
    if(h >= 5 && h < 12){
        saudacao.innerHTML = 'Bom dia!'
        document.body.style.background = '#93a2b9'
    } else if(h >= 12 && h < 19){
        saudacao.innerHTML = 'Boa tarde!'
        document.body.style.background = '#f3b256'
    } else {
        saudacao.innerHTML = 'Boa noite!'
        document.body.style.background = '#083c7c'
    } 
}

function uptDia(d){
    fulldata.innerHTML = `${d}/`

    uptMes(data.getMonth())
    uptAno(data.getFullYear())
}

function uptSem(s){
    let semana = document.querySelector('p#semana')
    switch(s){
        case 0:
        semana.innerHTML = 'DOMINGO'
        break;
        case 1:
        semana.innerHTML = 'SEGUNDA'
        break;
        case 2:
        semana.innerHTML = 'TERÇA'
        break;
        case 3:
        semana.innerHTML = 'QUARTA'
        break;
        case 4:
        semana.innerHTML = 'QUINTA'
        break;
        case 5:
        semana.innerHTML = 'SEXTA'
        break;
        case 6:
        semana.innerHTML = 'SÁBADO'
        break;
        default: semana.innerHTML = 'ERRO'
        break
    }
}

function uptMes(m){
    if(m <= 8) fulldata.innerHTML += `0`
    fulldata.innerHTML += `${m+1}/`
}

function uptAno(a){
    fulldata.innerHTML += `${a}`
}

function uptHora(h){
    uptSau(h)

    let h1 = 0
    let h2 = 0
    let h1img = document.querySelector('img#hora1')
    let h2img = document.querySelector('img#hora2')

    h1 = h/10
    h1 = parseInt(h1, 10)
    h2 = (h - (h1*10))

    h1img.src = `number/${h1}.png`
    h2img.src = `number/${h2}.png`

    if(h == 0){
        uptDia(data.getDate())
        uptSem(data.getDay())
    }
    
}

function uptMinu(m){
    let m1 = 0
    let m2 = 0
    let m1img = document.querySelector('img#minu1')
    let m2img = document.querySelector('img#minu2')

    m1 = m/10
    m1 = parseInt(m1, 10)
    m2 = (m - (m1*10))

    m1img.src = `number/${m1}.png`
    m2img.src = `number/${m2}.png`

    if(m == 0) uptHora(data.getHours())
}

function uptSegu(s){
    let s1 = 0
    let s2 = 0
    let s1img = document.querySelector('img#sec1')
    let s2img = document.querySelector('img#sec2')

    s1 = s/10
    s1 = parseInt(s1, 10)
    s2 = (s - (s1*10))

    s1img.src = `number/${s1}.png`
    s2img.src = `number/${s2}.png`

    if(s == 0) uptMinu(Number(data.getMinutes()))
}

function uptAnalog(S, M, H){
    let minus12 = H <= 11? 0 : 12
    let grauH = (H-minus12)*30 + M*0.5 + S*0.0083
    let grauS = S*6
    let grauM = M*6 + S*0.1
    
    pS.style.transform = `rotate(${grauS}deg)`
    pM.style.transform = `rotate(${grauM}deg)`
    pH.style.transform = `rotate(${grauH}deg)`
}