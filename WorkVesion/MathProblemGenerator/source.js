// const list = document.getElementById('list');
// var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
// var xhr = new XHR();
// xhr.open('GET', 'http://localhost:8080', true);
// xhr.onload = function() {
//     //let jsonWorks = JSON.parse(this.responseText);
//     console.log(this.responseText);
//     //updateHtml(jsonWorks, list);
// }
// xhr.onerror = function() {
//     alert( 'Ошибка ' + this.status );
// }
// xhr.send();
//

// function readTextFile(file)
// {
//     let rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     let allText = '';
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 allText = rawFile.responseText;
//             }
//         }
//     }
//     rawFile.send(null);
//     return allText;
// }
//
// let work1 = new Work("first", 10);
// let fiveDivProblem = new FiveDivProblem(1,100,2,4,1,9,5);
// let euclideanAlgorithmProblem = new EuclideanAlgorithmProblem(1000,9999,6,12,5,9);
//
// work1.addProblem(fiveDivProblem);
// work1.addProblem(euclideanAlgorithmProblem);
//
// let work2 = new Work("first", 10);
// fiveDivProblem = new FiveDivProblem(1, 100, 2, 4, 1, 9, 5);
// euclideanAlgorithmProblem = new EuclideanAlgorithmProblem(1000, 9999, 6, 12, 5, 9);
//
// work2.addProblem(fiveDivProblem);
// work2.addProblem(euclideanAlgorithmProblem);
//
// let works = [];
// works.push(work1);
// works.push(work2);
// console.log(JSON.stringify(works));

/*
for (let i = 0; i < work1.variantsNumber; ++i) {
  console.log(work1.variants[i]);
}
'use strict';
const btnGen = document.getElementById('btnGen');
console.log(document);

function btnClick(btnGen, btnGenClickHandler) {
    btnGen.onclick = () => {
        btnGenClickHandler();
    };
}

function btnGenClickHandler() {
    window.location.href = "addWork/index.html";
}

btnClick(btnGen, btnGenClickHandler);*/

btnNewWork = document.getElementById("btnNewWork");
inputWorkName = document.getElementById("inputWorkName");
inputVariantsNumber = document.getElementById("inputVariantsNumber");
list = document.getElementById("list");
problemsSelectBox = document.getElementById("problemsSelectBox");

ServerConnector.readFromBase();

function btnClick(btn, btnHandler) {
    btn.onclick = () => {
        btnHandler();
    }
}

function btnNewWorkHandler() {
    //Actions.addWork(inputWorkName.value, inputVariantsNumber.value);
    ServerConnector.addWork(inputWorkName.value, inputVariantsNumber.value);
}

function updateHtml(works, list) {
    let li = document.createElement('li');
    for (let i = 0; i < works.length; ++i) {
        let buttonGetPdf = document.createElement('button');
        buttonGetPdf.innerText = "Get Pdf";
        buttonGetPdf.name = works[i].Id;
        buttonGetPdf.onclick = () => {
            ServerConnector.getWorkPdf(buttonGetPdf.name);
        };
        let buttonAdd = document.createElement('button');
        buttonAdd.innerText = "Add Problem";
        buttonAdd.name = works[i].Id;
        buttonAdd.onclick = () => {
            //ServerConnector.addProblem(buttonDelete.name, problemsSelectBox.value);
            let problems = JSON.stringify(works[i].Variants[0]);
            document.location.replace("./addProblem.html" + "#id=" + buttonAdd.name + "&variants=" + problems);
        };
        let buttonDelete = document.createElement('button');
        buttonDelete.innerText = "Delete";
        buttonDelete.name = works[i].Id;
        buttonDelete.onclick = () => {
            ServerConnector.deleteWork(buttonDelete.name);
        };
        let label = document.createElement('label');
        let div = document.createElement('div');
        label.innerText = works[i].Name;
        div.appendChild(buttonAdd);
        div.appendChild(buttonDelete);
        div.appendChild(buttonGetPdf);
        div.appendChild(label);
        li.appendChild(div);
    }
    list.replaceChild(li, list.lastChild);
}

btnClick(btnNewWork, btnNewWorkHandler);
