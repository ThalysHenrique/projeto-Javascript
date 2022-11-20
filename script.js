let cxNota1 = document.querySelector('#nota1')
let cxNota2 = document.querySelector('#nota2')
let cxNota3 = document.querySelector('#nota3')
let cxMedia = document.querySelector('#media')
let cxSituacao = document.querySelector('#situacao')
// CALCULAR MEDIA
function calcularMedia(n1, n2, n3) {
    return (n1 + n2 + n3) / 3
}

// DEFINIR SITUACAO FINAL COM BASE NA MEDIA
function situacaoFinal(mediaFinal) {
    let situacaoFinal = ''
    
    if (mediaFinal >= 7) {
        situacaoFinal = 'Aprovado(a)'
    } else if (mediaFinal <= 3) {
        situacaoFinal = 'Reprovado(a)'
    } else {
        situacaoFinal = 'Recuperação'
    }
    return situacaoFinal;
}

// FORMATAR A CAIXA DE SITUACAO FINAL
function formatarSituacao(situacaoFinal) {
    console.log('Situação Final ' + situacaoFinal)
    switch(situacaoFinal) {

        case 'Aprovado(a)':
            cxSituacao.classList.remove('reprovado')
            cxSituacao.classList.remove('recuperacao')
            cxSituacao.classList.add('aprovado')
            console.log('adicionar class aprovado')
            break
        
        case 'Reprovado(a)':
            cxSituacao.classList.remove('aprovado')
            cxSituacao.classList.remove('recuperacao')
            cxSituacao.classList.add('reprovado')
            console.log('adicionar class reprovado')
            break
        
        case 'Recuperação':
            cxSituacao.classList.remove('aprovado')
            cxSituacao.classList.remove('reprovado')
            cxSituacao.classList.add('recuperacao')
            console.log('adicionar class recuperacao')
                break

        default:
            console.log('Situação Indefinida')
    } // fim do switch case

}

// VALIDAR E GERAR FLASH MESSAGE
function validarNumero(numero) {
    let num1 = cxNota1.value
    let num2 = cxNota2.value
    let num3 = cxNota3.value
    if(num1 < 0 || num1 > 10 || num2 < 0 || num2 > 10 || num3 < 0 || num3 > 10) {
        formulario.reset() // limpar form
        aviso.textContent = 'Digite uma nota entre 0.0 e 10.0'
        aviso.classList.add('alerta')
        setTimeout(function(){
            aviso.textContent = ''
            aviso.classList.remove('alerta')
        }, 2000);
    }
}

// CALCULAR A MEDIA APOS O CLICK NO BOTAO
btnCalcular.addEventListener('click', function(e) {
    console.log('Calcular Média')
// pegar o valor que esta dentro das caixas
// usar metodo parseFloat p converter string p float
    let nota1 = parseFloat(cxNota1.value)
    let nota2 = parseFloat(cxNota2.value)
    let nota3 = parseFloat(cxNota3.value)
    let media = calcularMedia(nota1, nota2, nota3)
    
    console.log(nota1)
    console.log(nota2)
    console.log(nota3)
    console.log(media)

    if(isNaN(media) || media < 0) {
        console.log("Não é um número")
        cxSituacao.value = ''
    } else {
        cxMedia.value = parseFloat(media)
        cxSituacao.value = situacaoFinal(media)
        formatarSituacao(situacaoFinal(media))
    }
    e.preventDefault()
})

// APOS LIMPAR TIRAR AS CLASS DA CX SITUACAO
btnLimpar.addEventListener('click', function() {
    cxSituacao.classList.remove('aprovado')
    cxSituacao.classList.remove('reprovado')
    cxSituacao.classList.remove('recuperacao')
})



var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["aluno"] = document.getElementById("aluno").value;
    formData["nota1"] = document.getElementById("nota1").value;
    formData["nota2"] = document.getElementById("nota2").value;
    formData["nota3"] = document.getElementById("nota3").value;
    formData["media"] = document.getElementById("media").value;
    formData["situacao"] = document.getElementById("situacao").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("infoList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
		cell0.innerHTML = data.aluno;
    cell1 = newRow.insertCell(1);
		cell1.innerHTML = data.nota1;
    cell2 = newRow.insertCell(2);
		cell2.innerHTML = data.nota2;
    cell3 = newRow.insertCell(3);
		cell3.innerHTML = data.nota3;
    cell4 = newRow.insertCell(4);
		cell4.innerHTML = data.media;
    cell4 = newRow.insertCell(5);
		cell4.innerHTML = data.situacao;
    cell4 = newRow.insertCell(6);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("aluno").value = selectedRow.cells[0].innerHTML;
    document.getElementById("nota1").value = selectedRow.cells[1].innerHTML;
    document.getElementById("nota2").value = selectedRow.cells[2].innerHTML;
    document.getElementById("nota3").value = selectedRow.cells[3].innerHTML;
    document.getElementById("media").value = selectedRow.cells[4].innerHTML;
    document.getElementById("situacao").value = selectedRow.cells[5].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.aluno;
    selectedRow.cells[1].innerHTML = formData.nota1;
    selectedRow.cells[2].innerHTML = formData.nota2;
    selectedRow.cells[3].innerHTML = formData.nota3;
    selectedRow.cells[4].innerHTML = formData.media;
    selectedRow.cells[5].innerHTML = formData.situacao;
}

//Delete the data
function onDelete(td) {
    if (confirm('Tem certeza que deseja apagar?')) {
        row = td.parentElement.parentElement;
        document.getElementById('infoList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("aluno").value = '';
    document.getElementById("nota1").value = '';
    document.getElementById("nota2").value = '';
    document.getElementById("nota3").value = '';
    document.getElementById("media").value = '';
    document.getElementById("situacao").value = '';
    selectedRow = null;
}