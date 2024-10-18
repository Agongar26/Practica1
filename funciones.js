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
    if (Valor == 1 && Num < 9){
        Num++;
        loadDoc();
    } else if (Valor < 0 && Num > 0){
        Num--;
        loadDoc();
    } else if (Valor == 2){
        Num++;
        Terminar();
    }
}

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var table = "";
    var x = xmlDoc.getElementsByTagName("PREGUNTA");

    table += "<tr><th>" +
    x[Num].getElementsByTagName("ENCABEZADO")[0].childNodes[0].nodeValue +
    "</th></tr>";

    for (var i = 0; i < 4; i++) {
        var respuesta = x[Num].getElementsByTagName("RESPUESTA")[i].childNodes[0].nodeValue;
        var checked = RespuestasUsuairo[Num] === respuesta ? "checked" : "";
        table += "<tr><td><input type='radio' name='Exam' value='" +
        respuesta + "' " + checked + " onclick='checkAnswer(this, " + Num + ")'>" +
        respuesta + "</input></td></tr>";
    }

    document.getElementById("demo").innerHTML = table;// + "<br><p id='Calificacion'>Calificación: " + Calificacion + "</p>";

    const correctAnswers = xmlDoc.querySelectorAll('RESPUESTA[correcta="true"]');
    RespuestasCorrectas[Num] = correctAnswers[Num].textContent;

    //document.getElementById('prueba2').innerHTML = RespuestasCorrectas[Num];

    if(Num<9){
        document.getElementById("controls").innerHTML = "<button type='button' onclick='ActualizarDoc(-1)'>Anterior</button><button type='button' onclick='ActualizarDoc(1)'>Siguiente</button>";//<p id='prueba'></p><p>" + Num + "</p>"
    } else{
        document.getElementById("controls").innerHTML = "<button type='button' onclick='ActualizarDoc(-1)'>Anterior</button><button type='button' onclick='ActualizarDoc(1)'>Siguiente</button></p><button type='button' onclick='ActualizarDoc(2)'>Finalizar</button>";//<p id='prueba'></p><p>" + Num + "</p></p><button type='button' onclick='ActualizarDoc(2)'>Finalizar</button>"
    } 
}

function checkAnswer(radio, num) {
    // Si ya había una respuesta seleccionada, ajustar la calificación
    if (RespuestasUsuairo[num]) {
        if (RespuestasUsuairo[num] === RespuestasCorrectas[num]) {
            Calificacion--;
        } else {
            Calificacion += 1/3;
        }
    }

    // Actualizar la respuesta seleccionada
    RespuestasUsuairo[num] = radio.value;

    // Ajustar la calificación según la nueva respuesta
    if (radio.value === RespuestasCorrectas[num]) {
        Calificacion++;
    } else {
        Calificacion -= 1/3;
    }

    //document.getElementById("Calificacion").innerHTML = "Calificación: " + Calificacion;
}

function Terminar() {
    document.getElementById("demo").innerHTML = "<p>Tu calificación es: " + Calificacion.toFixed(2) + "/10</p>";
    document.getElementById("controls").innerHTML = "";
}
