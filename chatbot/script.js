// =====================================================
// GEOMETRÍA QUEST
// Primera Parte del JavaScript
// =====================================================

// -------------------------------
// BOTÓN DEL RETO
// -------------------------------

const botonReto = document.getElementById("retoBtn");
const mensajeReto = document.getElementById("mensajeReto");

const mensajes = [

"🏆 ¡Excelente! Tu misión comienza ahora. Busca figuras geométricas en tu entorno.",

"⭐ Muy bien. Cada objeto que observas tiene geometría. ¡Encuéntralos todos!",

"🚀 Desafío aceptado. ¿Cuántos círculos, cuadrados y triángulos puedes descubrir?",

"🎮 ¡Nivel iniciado! Observa tu salón e identifica todas las figuras posibles.",

"💎 Eres un explorador matemático. La geometría está escondida por todas partes."

];

botonReto.addEventListener("click",()=>{

const numero=Math.floor(Math.random()*mensajes.length);

mensajeReto.innerHTML=mensajes[numero];

mensajeReto.style.opacity="0";

setTimeout(()=>{

mensajeReto.style.transition="1s";

mensajeReto.style.opacity="1";

},100);

});


// -------------------------------
// EFECTO EN LAS TARJETAS
// -------------------------------

const tarjetas=document.querySelectorAll(".card");

tarjetas.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-12px) scale(1.05) rotate(1deg)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px) scale(1) rotate(0deg)";

});

});


// -------------------------------
// EFECTO DE ESCRITURA DEL TÍTULO
// -------------------------------

const titulo=document.querySelector("header h1");

const textoOriginal=titulo.textContent;

titulo.textContent="";

let posicion=0;

function escribirTitulo(){

if(posicion<textoOriginal.length){

titulo.textContent+=textoOriginal.charAt(posicion);

posicion++;

setTimeout(escribirTitulo,70);

}

}

window.addEventListener("load",escribirTitulo);


// -------------------------------
// APARICIÓN AL HACER SCROLL
// -------------------------------

const elementos=document.querySelectorAll(

".hero,.contenido,.card,.curiosidades,.reto,.chat"

);

const observador=new IntersectionObserver((entradas)=>{

entradas.forEach(entrada=>{

if(entrada.isIntersecting){

entrada.target.style.opacity="1";

entrada.target.style.transform="translateY(0px)";

}

});

});

elementos.forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(60px)";

el.style.transition="1s";

observador.observe(el);

});


// -------------------------------
// EFECTO DE BRILLO EN LOS BOTONES
// -------------------------------

const botones=document.querySelectorAll("button");

botones.forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const x=e.offsetX;

const y=e.offsetY;

btn.style.background=

`radial-gradient(circle at ${x}px ${y}px,

#ffffff,

#00ffff,

#00ff88)`;

});

btn.addEventListener("mouseleave",()=>{

btn.style.background=

"linear-gradient(45deg,#00ffff,#00ff88)";

});

});


// -------------------------------
// RELOJ DEL EXPLORADOR
// -------------------------------

const reloj=document.createElement("div");

reloj.style.position="fixed";

reloj.style.top="15px";

reloj.style.right="15px";

reloj.style.padding="12px";

reloj.style.background="rgba(0,0,0,.5)";

reloj.style.border="2px solid cyan";

reloj.style.borderRadius="10px";

reloj.style.color="white";

reloj.style.fontWeight="bold";

reloj.style.zIndex="999";

document.body.appendChild(reloj);

function actualizarHora(){

const ahora=new Date();

reloj.innerHTML=

"🕒 "+ahora.toLocaleTimeString();

}

setInterval(actualizarHora,1000);

actualizarHora();


// =====================================================
// AQUÍ CONTINÚA LA PARTE 5
// NO BORRES NADA
// =====================================================
// =====================================================
// CHATBOT GEMINI
// =====================================================

// =====================================================
// PEGA TU API KEY ENTRE LAS COMILLAS
// =====================================================

const API_KEY = "AQ.Ab8RN6Iv6Ms3_W13791uyNjPHIAdGk0wMtqnh36tDovcMIj5cQ";

// =====================================================

const botonEnviar = document.getElementById("enviar");

const pregunta = document.getElementById("pregunta");

const respuesta = document.getElementById("respuesta");

async function consultarGemini(){

    const texto = pregunta.value.trim();

    if(texto===""){

        respuesta.innerHTML="⚠️ Escribe una pregunta.";

        return;

    }

    respuesta.innerHTML="🤖 Pensando...";

    try{

        const peticion = await fetch(

        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                contents:[

                    {

                        parts:[

                            {

                                text:

`Eres un profesor experto en Matemáticas.

Responde únicamente preguntas relacionadas con geometría.

Explica de forma sencilla para estudiantes de Educación General Básica y Bachillerato.

Pregunta del estudiante:

${texto}`

                            }

                        ]

                    }

                ]

            })

        });

        const datos = await peticion.json();

        if(datos.error){

            respuesta.innerHTML="❌ Error:<br><br>"+datos.error.message;

            return;

        }

        const textoRespuesta=

        datos.candidates[0]

        .content.parts[0]

        .text;

        respuesta.innerHTML=textoRespuesta;

    }

    catch(error){

        respuesta.innerHTML=

        "❌ No fue posible conectar con Gemini.<br><br>"+error;

    }

}

botonEnviar.addEventListener(

"click",

consultarGemini

);

// ============================================
// ENVIAR CON ENTER
// ============================================

pregunta.addEventListener(

"keydown",

function(e){

    if(e.key==="Enter" && !e.shiftKey){

        e.preventDefault();

        consultarGemini();

    }

});

// ============================================
// CONTADOR DE PREGUNTAS
// ============================================

let preguntasRealizadas=0;

const contador=document.createElement("div");

contador.style.position="fixed";

contador.style.bottom="20px";

contador.style.left="20px";

contador.style.padding="12px";

contador.style.background="rgba(0,0,0,.6)";

contador.style.border="2px solid cyan";

contador.style.borderRadius="10px";

contador.style.color="white";

contador.style.zIndex="999";

contador.innerHTML="Preguntas: 0";

document.body.appendChild(contador);

botonEnviar.addEventListener("click",()=>{

preguntasRealizadas++;

contador.innerHTML=

"Preguntas: "+preguntasRealizadas;

});

// ============================================
// EFECTO DE ESCRITURA DE LA RESPUESTA
// ============================================

const respuestaOriginal = respuesta.innerHTML;

respuesta.innerHTML = "";

let indice = 0;

function escribirBienvenida(){

    if(indice < respuestaOriginal.length){

        respuesta.innerHTML += respuestaOriginal.charAt(indice);

        indice++;

        setTimeout(escribirBienvenida,25);

    }

}

window.addEventListener(

"load",

escribirBienvenida

);

// ============================================
// MENSAJE DE BIENVENIDA
// ============================================

setTimeout(()=>{

alert(

"🎮 Bienvenido a Geometría Quest.\n\nExplora la página y al final realiza preguntas al chatbot sobre geometría."

);

},1200);

// ============================================
// FIN DEL PROYECTO
// ============================================

console.log("Geometría Quest cargado correctamente.");
