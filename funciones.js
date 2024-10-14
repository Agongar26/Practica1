var Num = 0;
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open("GET", "examen.xml", true);
    xhttp.send();
}

function ActualizarDoc(Valor) {
    if (Valor > 0){
        this.Num++;
    } else{
        this.Num--;
    }
    loadDoc();
}

function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = "";
    var x = xmlDoc.getElementsByTagName("PREGUNTA");
    
    table += "<tr><th>" +
    x[Num].getElementsByTagName("ENCABEZADO")[0].childNodes[0]. nodeValue +
    "</th></tr><tr><td>" +
    x[Num].getElementsByTagName("RESPUESTA1")[0].childNodes[0].nodeValue +
    "</td></tr><tr><td>" +
    x[Num].getElementsByTagName("RESPUESTA2")[0].childNodes[0].nodeValue +
    "</td></tr><tr><td>" +
    x[Num].getElementsByTagName("RESPUESTA3")[0].childNodes[0].nodeValue +
    "</td></tr><tr><td>" +
    x[Num].getElementsByTagName("RESPUESTA4")[0].childNodes[0].nodeValue +
    "</td></tr>";
    //Num ++;
    document.getElementById("demo").innerHTML = table;
}