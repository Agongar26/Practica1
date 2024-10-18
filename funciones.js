var Num = 0;
var Calificacion = 0;
var RespuestasCorrectas = [];
var RespuestasUsuairo = [];

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
        Num++;
    } else if (Valor < 0 && Num > 0){
        Num--;
    }
    loadDoc();
}


function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var table = "";
    var x = xmlDoc.getElementsByTagName("PREGUNTA");

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

    document.getElementById("demo").innerHTML = table + "<br><p id='Calificacion'>Calificación: " + Calificacion + "</p>";

    const correctAnswers = xmlDoc.querySelectorAll('RESPUESTA[correcta="true"]');
    RespuestasCorrectas[Num] = correctAnswers[Num].textContent;

    /*let Seleccionada = xmlDoc.querySelector("input[name='RESPUESTA']:checked");
    RespuestasUsuairo[Num] = Seleccionada.value;*/

    //document.getElementById('prueba2').innerHTML = RespuestasCorrectas[Num];
}

function checkAnswer(radio, num) {
    if (radio.value === RespuestasCorrectas[num]) {
        //alert("Acierto");
        Calificacion++;
    } else {
        //alert("Fallo");
        Calificacion -= 1/3;
    }
    document.getElementById("Calificacion").innerHTML = "Calificación: " + Calificacion;
}
