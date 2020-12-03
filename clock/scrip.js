let fulldata = document.querySelector('h1#data');   //data
let data = new Date();

let pH = document.querySelector('img#pHoras');      //ponteiro das horas
let pM = document.querySelector('img#pMinutos');    //ponteiro dos minutos
let pS = document.querySelector('img#pSegundos');   //ponteiro dos segundos

uptSau(Number(data.getHours()));                    //atualiza saudação

uptData();                                          //atualiza a data
uptSem(Number(data.getDay()));                      //atualiza o dia da semana

uptHora(Number(data.getHours()));                   //atualiza as horas
uptMinu(Number(data.getMinutes()));                 //atualiza os minutos
uptSegu(Number(data.getSeconds()));                 //atualiza os segundos

setInterval
(
    function update()
    {
        data = new Date();                      //a data completa é sempre atualizada dentro da variável
        uptSegu(Number(data.getSeconds()));     //a função uptSegu atualiza o restante da hora conforme necessário
        uptAnalog(Number(data.getSeconds()), Number(data.getMinutes()), Number(data.getHours()));   //o relógio analógico atualiza por inteiro sempre
    },
20) //programa atualiza 1x a cada 20 milissegundos

function uptSegu(s)
{
    let s1 = 0; //primeiro algarismo dos segundos
    let s2 = 0; //segundo algarismo
    let s1img = document.querySelector('img#sec1'); //imagem do primeiro algarismo
    let s2img = document.querySelector('img#sec2'); //imagem do segundo algarismo

    s1 = s/10;
    s1 = parseInt(s1, 10);
    s2 = (s - (s1*10));

    s1img.src = `number/${s1}.png`;
    s2img.src = `number/${s2}.png`;

    if(s == 0) uptMinu(Number(data.getMinutes())); //quando os segundos forem 0, chama a função que atualiza os minutos
}

function uptMinu(m)
{
    let m1 = 0; //primeiro algarismo dos minutos
    let m2 = 0; //segundo algarismo
    let m1img = document.querySelector('img#minu1');    //imagem do primeiro algarismo
    let m2img = document.querySelector('img#minu2');    //imagem do segundo algarismo

    m1 = m/10;
    m1 = parseInt(m1, 10);
    m2 = (m - (m1*10));

    m1img.src = `number/${m1}.png`;
    m2img.src = `number/${m2}.png`;

    if(m == 0) uptHora(data.getHours());    //quando o minuto for 0, chama a função que atualiza as horas
}

function uptHora(h)
{
    if(h == 5 || h == 12 || h == 18) uptSau(h); //caso a hora esteja nestes intervalos, atualiza a saudação

    let h1 = 0; //primeiro algarimso das horas
    let h2 = 0; //segundo algarismo
    let h1img = document.querySelector('img#hora1');    //imagem do primeiro algarismo
    let h2img = document.querySelector('img#hora2');    //imagem do segundo algarismo

    h1 = h/10;
    h1 = parseInt(h1, 10);
    h2 = (h - (h1*10));

    h1img.src = `number/${h1}.png`;
    h2img.src = `number/${h2}.png`;

    if(h == 0)  //quando a hora for 0, atualiza a data e o dia da semana
    {
        uptData();
        uptSem(data.getDay());
    }
}

function uptData()
{
    let d = Number(data.getDate());

    if (d < 10) fulldata.innerHTML = `0${d}/`;
    else fulldata.innerHTML = `${d}/`;

    let m = Number(data.getMonth());

    if(m <= 8) fulldata.innerHTML += `0`;
    fulldata.innerHTML += `${m+1}/`;

    fulldata.innerHTML += Number(data.getFullYear());
}

function uptSau(h)
{
    let saudacao = document.querySelector('h1#saud');

    if(h >= 5 && h < 12)
    {
        saudacao.innerHTML = 'Bom dia!';
        document.body.style.background = '#93a2b9';
    }
    else if(h >= 12 && h < 19)
    {
        saudacao.innerHTML = 'Boa tarde!';
        document.body.style.background = '#f3b256';
    }
    else
    {
        saudacao.innerHTML = 'Boa noite!';
        document.body.style.background = '#083c7c';
    } 
}

function uptSem(s)
{
    let semana = document.querySelector('p#semana');

    switch(s)
    {
        case 0: semana.innerHTML = 'DOMINGO';
            break;
        case 1: semana.innerHTML = 'SEGUNDA-FEIRA';
            break;
        case 2: semana.innerHTML = 'TERÇA-FEIRA';
            break;
        case 3: semana.innerHTML = 'QUARTA-FEIRA';
            break;
        case 4: semana.innerHTML = 'QUINTA-FEIRA';
            break;
        case 5: semana.innerHTML = 'SEXTA-FEIRA';
            break;
        case 6: semana.innerHTML = 'SÁBADO';
            break;

        default: semana.innerHTML = 'ERRO';
    }
}

function uptAnalog(S, M, H)
{
    let minus12 = H <= 11? 0 : 12;
    let grauH = (H-minus12)*30 + M*0.5 + S*0.0083;
    let grauS = S*6;
    let grauM = M*6 + S*0.1;
    
    pS.style.transform = `rotate(${grauS}deg)`;
    pM.style.transform = `rotate(${grauM}deg)`;
    pH.style.transform = `rotate(${grauH}deg)`;
}