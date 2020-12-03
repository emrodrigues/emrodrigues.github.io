let fixo;
let juros = [];

function calctaxas()
{
    let inputValor = document.querySelector("input#valor").value;

    if(document.querySelector("input#point").checked) point(inputValor);
    else if(document.querySelector("input#link").checked) link(inputValor);
    else qrcode(inputValor);

    if(!document.querySelector("input#qrcode").checked)
        for(let i = 2; i <= 12; i++) preenche(i, inputValor, fixo, juros[i-2]);
}

function point(inputValor)
{
    preenche(0, inputValor, 1.99, 0);

    if(document.querySelector("input#hora").checked)
    {
        fixo = 5.31;
        preenche(1, inputValor, 4.74, 0);
    }
    else if(document.querySelector("input#dia14").checked)
    {
        fixo = 4.36;
        preenche(1, inputValor, 3.79, 0);
    }
    else
    {
        fixo = 3.60;
        preenche(1, inputValor, 3.03, 0);
    }

    juros = [4.09, 5.41, 6.70, 7.96, 9.20, 10.41, 11.61, 12.78, 13.92, 15.05, 16.14];
}

function link(inputValor)
{
    if(document.querySelector("input#hora").checked) fixo = 4.99;
    else if(document.querySelector("input#dia14").checked) fixo = 4.49;
    else fixo = 3.99;

    preenche(0, inputValor, fixo, 0);
    preenche(1, inputValor, fixo, 0);
    
    juros = [2.03, 4.06, 6.09, 7.64, 8.92, 10.06, 10.62, 11.23, 12.41, 13.60, 14.80];
}

function qrcode(inputValor)
{
    if(document.querySelector("input#hora").checked) preenche(0, inputValor, 1.99, 0), preenche(1, inputValor, 1.99, 0);
    else if(document.querySelector("input#dia14").checked) preenche(0, "N/A", "N/", "A"), preenche(1, "N/A", "N/", "A");
    else preenche(0, inputValor, 1.69, 0), preenche(1, inputValor, 1.69, 0);

    for(let i = 2; i <= 12; i++)
    {
        preenche(i, "nan", "nan", "nan");
    }
}


function preenche(i, inputValor, fixo, taxa)
{
    let calcTaxa = fixo + taxa;
    let valorFinal = (inputValor*100)/(100-calcTaxa);
    let taxaFinal = valorFinal - inputValor;
    let textoValorFinal = document.querySelector(`td#tx${i}f`);
    let textoTaxaFinal = document.querySelector(`td#tx${i}`);
    let textoParcela = document.querySelector(`td#tx${i}p`);
    
    textoValorFinal.innerHTML = `R$${parseFloat(valorFinal.toFixed(2))}`;
    textoTaxaFinal.innerHTML = `R$${parseFloat(taxaFinal.toFixed(2))}`;
    if(i != 0) textoParcela.innerHTML = `R$${parseFloat(valorFinal/i).toFixed(2)}`;
    else textoParcela.innerHTML = textoValorFinal.innerHTML;
}