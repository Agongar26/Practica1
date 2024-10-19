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
        table += "<tr><td><label class='label-input'><input type='radio' name='Exam' value='" +
        respuesta + "' " + checked + " onclick='checkAnswer(this, " + Num + ")'>" +
        respuesta + "</label></input></td></tr>";
    }

    document.getElementById("demo").innerHTML = table + "<br><p>Calificación: " + Calificacion + "</p>";

    document.getElementById("demo").innerHTML = table;

    const correctAnswers = xmlDoc.querySelectorAll('RESPUESTA[correcta="true"]');
    RespuestasCorrectas[Num] = correctAnswers[Num].textContent;

    if(Num<9){
        document.getElementById("controls").innerHTML = "<button type='button' onclick='ActualizarDoc(-1)'>Anterior</button><button type='button' onclick='ActualizarDoc(1)'>Siguiente</button>";//<p id='prueba'></p><p>" + Num + "</p>"
    } else{
        document.getElementById("controls").innerHTML = "<button type='button' onclick='ActualizarDoc(-1)'>Anterior</button><button type='button' onclick='ActualizarDoc(1)'>Siguiente</button><button type='button' onclick='ActualizarDoc(2)'>Finalizar</button>";//<p id='prueba'></p><p>" + Num + "</p></p><button type='button' onclick='ActualizarDoc(2)'>Finalizar</button>"
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
}

function Terminar() {
    if(Calificacion<5){
        document.getElementById("demo").innerHTML = "<h1 style='color: red;'>Has suspendido, ¡más suerte la próxima vez!<h1/><br><p>Tu calificación es: " + Calificacion.toFixed(2) + "/10.00</p>";
        document.getElementById("controls").innerHTML = "<button type='button' onclick='Soluciones()'>Ver solución examen</button><button type='button' onclick='Repetir()'>Repetir examen</button>";
    } else if(Calificacion == 5){
        document.getElementById("demo").innerHTML = "<h1 style='color: lightcoral;'>Has aprobado, ¡sigue así!<h1/><br><p>Tu calificación es: " + Calificacion.toFixed(2) + "/10.00</p>";
        document.getElementById("controls").innerHTML = "<button type='button' onclick='Soluciones()'>Ver solución examen</button><button type='button' onclick='Repetir()'>Repetir examen</button>";
    } else if(Calificacion > 5 && Calificacion < 7){
        document.getElementById("demo").innerHTML = "<h1 style='color: orange;'>Has aprobado, ¡continúa así!<h1/><br><p>Tu calificación es: " + Calificacion.toFixed(2) + "/10.00</p>";
        document.getElementById("controls").innerHTML = "<button type='button' onclick='Soluciones()'>Ver solución examen</button><button type='button' onclick='Repetir()'>Repetir examen</button>";
    } else if(Calificacion > 7 && Calificacion < 9){
        document.getElementById("demo").innerHTML = "<h1 style='color: yellowgreen;'>Enhorabuena, ¡Continúa así!<h1/><br><p>Tu calificación es: " + Calificacion.toFixed(2) + "/10.00</p>";
        document.getElementById("controls").innerHTML = "<button type='button' onclick='Soluciones()'>Ver solución examen</button><button type='button' onclick='Repetir()'>Repetir examen</button>";
    } else {
        document.getElementById("demo").innerHTML = "<h1 style='color: green;'>¡Excelente!, ¡continúa con esa actitud!<h1/><br><p>Tu calificación es: " + Calificacion.toFixed(2) + "/10.00</p>";
        document.getElementById("controls").innerHTML = "<button type='button' onclick='Soluciones()'>Ver solución examen</button><button type='button' onclick='Repetir()'>Repetir examen</button>";
    }
}

function Repetir() {
    Num = 0;
    Calificacion = 0;
    RespuestasCorrectas = [];
    RespuestasUsuairo = [];
    loadDoc();
}

function Soluciones(){
    var table = "";
    table += "<tr><th colspan='2'>Respuestas correctas</th></tr><tr>";
    
    for (var i=0; i<5; i++) {
       table += "<td><p style='font-weight: bold; font-size: 20px;'>" + (i+1) + ".-" + RespuestasCorrectas[i] + "</p></td><td><p style='font-weight: bold; font-size: 20px;'>" + (i+6) + ".-" + RespuestasCorrectas[i+5] + "</p></td></tr><tr>"
    }
    table += "</tr>";

    table += "<br><tr><th colspan='2'>Respuestas Usuario</th></tr><tr>";
    
    for (var i=0; i<5; i++) {
       table += "<td><p style='font-weight: bold; font-size: 20px;'>" + (i+1) + ".-" + RespuestasUsuairo[i] + "</p></td><td><p style='font-weight: bold; font-size: 20px;'>" + (i+6) + ".-" + RespuestasUsuairo[i+5] + "</p></td></tr><tr>"
    }
    table += "</tr>";

    document.getElementById("demo").innerHTML = table;
    document.getElementById("controls").innerHTML = "<button type='button' onclick='Repetir()'>Repetir examen</button>";
}