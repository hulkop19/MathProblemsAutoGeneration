'use strict';

function quadEquationCreator(x1, x2) {
    let b = -x1 -x2;
    let c = x1 * x2;

    if (Math.random() > 0.5) {
        b = -b;
        c = -c;

        b = (b < 0)? "- " + Math.abs(b): "+ " + Math.abs(b);
        c = (c < 0)? "- " + Math.abs(c): "+ " + Math.abs(c);

        return "-x^2 " + b + "x " + c + " = 0";
    }

    b = (b < 0)? "- " + Math.abs(b): "+ " + Math.abs(b);
    c = (c < 0)? "- " + Math.abs(c): "+ " + Math.abs(c);

    return "x^2 " + b + "x " + c + " = 0";
}

function generator() {
    const x1 = Math.floor(Math.random() * 10);
    let x2 = Math.floor(Math.random() * 10);
    while (x1 === x2) {
        x2 = Math.floor(Math.random() * 10);
    }

    return {x1, x2};
}

const btnGen = document.getElementById('btnGen');
const btnClean = document.getElementById('btnClean');
const equList = document.getElementById('equationsList');
const rootsList = document.getElementById('rootsList');

function btnClick(btnGenerate, btnCl, btnGenCleanHandler, btnCleanClickHandler) {
    btnGenerate.onclick = () => {
        btnGenClickHandler();
    };

    btnCl.onclick = () => {
        btnCleanClickHandler();
    }
}

function btnGenClickHandler() {
    let elem;
    let roots;

    roots = generator();
    elem = document.createElement('li');
    elem.innerHTML = quadEquationCreator(roots.x1, roots.x2);
    equList.appendChild(elem);

    elem = document.createElement('li');
    elem.innerHTML = roots.x1 + ", " + roots.x2;
    rootsList.appendChild(elem);
}

function btnCleanClickHandler() {
    while( equList.firstChild ){
        equList.removeChild( equList.firstChild );
    }

    while( rootsList.firstChild ){
        rootsList.removeChild( rootsList.firstChild );
    }
}

btnClick(btnGen, btnClean, btnGenClickHandler, btnCleanClickHandler);
