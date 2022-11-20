let cxGrade1 = document.querySelector('#grade1')
let cxGrade2 = document.querySelector('#grade2')
let cxGrade3 = document.querySelector('#grade3')
let cxAverage = document.querySelector('#average')
let cxSituation = document.querySelector('#situation')

function averageCalculate(n1, n2, n3) {
    return (n1 + n2 + n3) / 3
}
function endSituation(endAverage) {
    let endSituation = ''
    
    if (endAverage >= 7) {
        endSituation = 'Approved'
    } else if (endAverage <= 3) {
        endSituation = 'Disapproved'
    } else {
        endSituation = 'Recuperation'
    }
    return endSituation;
}

function formatSituation(endSituation) {
    console.log('End Situation ' + endSituation)
    switch(endSituation) {

        case 'Approved':
            cxSituation.classList.remove('disapproved')
            cxSituation.classList.remove('recuperation')
            cxSituation.classList.add('approved')
            console.log('add class approved')
            break
        
        case 'Disapproved':
            cxSituation.classList.remove('approved')
            cxSituation.classList.remove('recuperation')
            cxSituation.classList.add('disapproved')
            console.log('add class disapproved')
            break
        
        case 'Recuperation':
            cxSituation.classList.remove('approved')
            cxSituation.classList.remove('disapproved')
            cxSituation.classList.add('recuperation')
            console.log('add class recuperation')
                break

        default:
            console.log('Undefined Situation')
    }

}

function validateNumber(number) {
    let num1 = cxGrade1.value
    let num2 = cxGrade2.value
    let num3 = cxGrade3.value
    if(num1 < 0 || num1 > 10 || num2 < 0 || num2 > 10 || num3 < 0 || num3 > 10) {
        form.reset()
        warning.textContent = 'Enter a note between 0.0 e 10.0'
        warning.classList.add('alert')
        setTimeout(function(){
            warning.textContent = ''
            warning.classList.remove('alert')
        }, 2000);
    }
}

btnCalculate.addEventListener('click', function(e) {
    console.log('Average Calculate')
    let grade1 = parseFloat(cxGrade1.value)
    let grade2 = parseFloat(cxGrade2.value)
    let grade3 = parseFloat(cxGrade3.value)
    let average = averageCalculate(grade1, grade2, grade3)
    
    console.log(grade1)
    console.log(grade2)
    console.log(grade3)
    console.log(average)

    if(isNaN(average) || average < 0) {
        console.log("Isn't a number!")
        cxSituation.value = ''
    } else {
        cxAverage.value = parseFloat(average)
        cxSituation.value = endSituation(average)
        formatSituation(endSituation(average))
    }
    e.preventDefault()
})

btnClean.addEventListener('click', function() {
    cxSituation.classList.remove('approved')
    cxSituation.classList.remove('disapproved')
    cxSituation.classList.remove('recuperation')
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

function readFormData() {
    var formData = {};
    formData["student"] = document.getElementById("student").value;
    formData["grade1"] = document.getElementById("grade1").value;
    formData["grade2"] = document.getElementById("grade2").value;
    formData["grade3"] = document.getElementById("grade3").value;
    formData["average"] = document.getElementById("average").value;
    formData["situation"] = document.getElementById("situation").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("infoList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
		cell0.innerHTML = data.student;
    cell1 = newRow.insertCell(1);
		cell1.innerHTML = data.grade1;
    cell2 = newRow.insertCell(2);
		cell2.innerHTML = data.grade2;
    cell3 = newRow.insertCell(3);
		cell3.innerHTML = data.grade3;
    cell4 = newRow.insertCell(4);
		cell4.innerHTML = data.average;
    cell4 = newRow.insertCell(5);
		cell4.innerHTML = data.situation;
    cell4 = newRow.insertCell(6);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("student").value = selectedRow.cells[0].innerHTML;
    document.getElementById("grade1").value = selectedRow.cells[1].innerHTML;
    document.getElementById("grade2").value = selectedRow.cells[2].innerHTML;
    document.getElementById("grade3").value = selectedRow.cells[3].innerHTML;
    document.getElementById("average").value = selectedRow.cells[4].innerHTML;
    document.getElementById("situation").value = selectedRow.cells[5].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.student;
    selectedRow.cells[1].innerHTML = formData.grade1;
    selectedRow.cells[2].innerHTML = formData.grade2;
    selectedRow.cells[3].innerHTML = formData.grade3;
    selectedRow.cells[4].innerHTML = formData.average;
    selectedRow.cells[5].innerHTML = formData.situation;
}

function onDelete(td) {
    if (confirm('Are you sure you want to delete?')) {
        row = td.parentElement.parentElement;
        document.getElementById('infoList').deleteRow(row.rowIndex);
        resetForm();
    }
}

function resetForm() {
    document.getElementById("student").value = '';
    document.getElementById("grade1").value = '';
    document.getElementById("grade2").value = '';
    document.getElementById("grade3").value = '';
    document.getElementById("average").value = '';
    document.getElementById("situation").value = '';
    selectedRow = null;
}