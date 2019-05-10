class ServerConnector {
    static writeToBase(text) {
        let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHR();
        xhr.open('POST', 'http://localhost:8080', true);
        xhr.onload = function() {
            console.log(this.responseText);
        };

        xhr.send(text);
    }

    static readFromBase() {
        let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHR();
        xhr.open('GET', 'http://localhost:8080', true);
        xhr.onload = function() {
            let tmp = JSON.parse(this.responseText);
            console.log(tmp);
            updateHtml(tmp, list);
        };

        xhr.send();
    }

    static addWork(name, numberOfVariants) {
        let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHR();
        xhr.open('POST', 'http://localhost:8080', true);
        xhr.onload = function() {
            let tmp = JSON.parse(this.responseText);
            console.log(tmp);
            updateHtml(tmp, list);
        };

        xhr.send("add_work " + name + " " + numberOfVariants);
    }

    static deleteWork(id) {
        let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHR();
        xhr.open('POST', 'http://localhost:8080', true);
        xhr.onload = function() {
            let tmp = JSON.parse(this.responseText);
            console.log(tmp);
            updateHtml(tmp, list);
        };

        xhr.send("delete_work " + id);
    }

    static addProblem(id, problemName, param) {
        let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHR();
        xhr.open('POST', 'http://localhost:8080', true);
        xhr.onload = function() {
            let tmp = JSON.parse(this.responseText);
            console.log(tmp);
            updateHtml(tmp, list);
        };

        xhr.send("add_problem " + id + " " + problemName + " " + param);
    }

    static getWorkPdf(id) {
        let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHR();
        xhr.open('POST', 'http://localhost:8080', true);
        xhr.onload = function() {
            window.location.assign(this.responseText);
        };

        xhr.send("get_pdf " + id);
    }
}