function getProblemList() {
    let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    let xhr = new XHR();
    xhr.open('POST', 'http://localhost:8080', true);
    xhr.onload = function() {
        let tmp = JSON.parse(this.responseText);
        for (let i = 0; i < tmp.length; ++i) {
            console.log(tmp[i]);
            let elem = document.createElement('option');
            elem.innerText = tmp[i];
            problemsSelectBox.appendChild(elem);
        }
    };

    xhr.send("get_problem_list");
}

problemsSelectBox = document.getElementById("problemsSelectBox");
inputParam = document.getElementById("inputParam");
btnAddProblem = document.getElementById("btnAddProblem");
btnCancelProblem = document.getElementById("btnCancelProblem");
list = document.getElementById("list");

let data = document.location.hash;
let problems = data.split("&")[1].substr(13, data.length - 25).split("%22,%22");

let li = document.createElement('li');
for (let i = 0; i < problems.length; ++i) {
    let buttonAdd = document.createElement('button');
    buttonAdd.innerText = "Add Problem";
    let buttonDelete = document.createElement('button');
    buttonDelete.innerText = "Delete";
    let label = document.createElement('label');
    let div = document.createElement('div');
    label.innerText = "(" + (i + 1) + ")    " + problems[i].split("%20").join(" ");
    //div.appendChild(buttonAdd);
    //div.appendChild(buttonDelete);
    div.appendChild(label);
    li.appendChild(div);
}
list.replaceChild(li, list.lastChild);

btnAddProblem.onclick = () => {
    let data = document.location.hash;
    let id = data.split("&")[0].substr(4);
    let problems = data.split("&")[1].substr(13, data.length - 25).split("%22,%22");
    console.log(problems);
    ServerConnector.addProblem(id, problemsSelectBox.value, inputParam.value);
    document.location.replace("./index.html");
};

btnCancelProblem.onclick = () => {
    document.location.replace("./index.html");
};

getProblemList();