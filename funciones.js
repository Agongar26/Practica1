var Num = 0;
var Calificacion = 0;

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
    if (Valor > 0 && Num < 9){
        this.Num++;
    } else if (Valor < 0 && Num > 0){
        this.Num--;
    }
    loadDoc();
}

function RespuestaCorrecta() {
        // Cargar el XML
    const parser = new DOMParser();
    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
    <EXAMEN>
        <PREGUNTA>
        <ENCABEZADO>¿QUÉ SIGNIFICA HTML?</ENCABEZADO>
        <RESPUESTA correcta="true">HyperText Markup Languaje</RESPUESTA>
        <RESPUESTA>HyperText Markdown Language</RESPUESTA>
        <RESPUESTA>HyperTool Markup Language</RESPUESTA>
        <RESPUESTA>HyperTool Markdown Language</RESPUESTA>
    </PREGUNTA>
    </EXAMEN>`;
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    // Obtener todas las respuestas correctas
    const correctAnswers = xmlDoc.querySelectorAll('RESPUESTA[correcta="true"]');

    // Mostrar las respuestas correctas
    correctAnswers.forEach(answer => {
        document.getElementById('prueba2').innerHTML = answer.textContent;
    });
}

function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = "";
    var x = xmlDoc.getElementsByTagName("PREGUNTA");
    let RespuestasCorrectas = [];
    
    table += "<tr><th>" +
    x[Num].getElementsByTagName("ENCABEZADO")[0].childNodes[0].nodeValue +
    "</th></tr><tr><td><input type='radio' name='Exam' value='" +
    x[Num].getElementsByTagName("RESPUESTA")[0].childNodes[0].nodeValue +
    "' onclick='checkAnswer(this, " + Num + ")'>" +
    x[Num].getElementsByTagName("RESPUESTA")[0].childNodes[0].nodeValue +
    "</input></td></tr><tr><td><tr><td><input type='radio' name='Exam' value='"+
    x[Num].getElementsByTagName("RESPUESTA")[1].childNodes[0].nodeValue +
    "' onclick='checkAnswer(this, " + Num + ")'>" +
    x[Num].getElementsByTagName("RESPUESTA")[1].childNodes[0].nodeValue +
    "</input></td></tr><tr><td><input type='radio' name='Exam' value ='>" +
    x[Num].getElementsByTagName("RESPUESTA")[2].childNodes[0].nodeValue +
    "' onclick='checkAnswer(this, " + Num + ")'>" +
    x[Num].getElementsByTagName("RESPUESTA")[2].childNodes[0].nodeValue +
    "</input></td></tr><tr><td><input type='radio' name='Exam' value='>" +
    x[Num].getElementsByTagName("RESPUESTA")[3].childNodes[0].nodeValue +
    "' onclick='checkAnswer(this, " + Num + ")'>" +
    x[Num].getElementsByTagName("RESPUESTA")[3].childNodes[0].nodeValue +
    "</input></td></tr>";
    //Num ++;
    document.getElementById("demo").innerHTML = table + "<br><p id='Calificacion'>Calificación: " + Calificacion + "</p>";

    let radios = document.getElementsByName('Exam');
    let selectedValue;
    for (let radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }

    document.getElementById("Calificacion").innerHTML = Calificacion;

    // Obtener todas las respuestas correctas
    const correctAnswers = xmlDoc.querySelectorAll('RESPUESTA[correcta="true"]');
    
    RespuestasCorrectas[Num] = correctAnswers[Num].textContent;
    document.getElementById('prueba2').innerHTML = RespuestasCorrectas[Num];
}

function checkAnswer(radio, num) {

    if (radio.value === RespuestasCorrectas[num]) {
        alert("Acierto");
        Calificacion++;
        document.getElementById("Calificacion").innerHTML = Calificacion;
    } else {
        alert("Fallo");
        document.getElementById("Calificacion").innerHTML = Calificacion;
        Calificacion--;
    }
}