// ==========================================
// AROMA & GRANO
// FUNCIONES JAVASCRIPT
// ==========================================


// ==========================================
// 1. PESTAÑAS DE LA CARTA
// ==========================================

const botonesTabs = document.querySelectorAll(".tab");
const grupos = document.querySelectorAll(".grupo");

botonesTabs.forEach(function(boton) {

    boton.addEventListener("click", function() {

        botonesTabs.forEach(function(tab) {
            tab.classList.remove("active");
        });

        grupos.forEach(function(grupo) {
            grupo.classList.remove("active");
        });

        boton.classList.add("active");

        const categoria = boton.dataset.tab;

        document.getElementById(categoria).classList.add("active");

    });

});


// ==========================================
// 2. HORARIO AUTOMÁTICO
// ==========================================

function actualizarHorario() {

    const ahora = new Date();

    const dia = ahora.getDay();

    const hora = ahora.getHours();

    const minutos = ahora.getMinutes();

    const horaActual = hora * 60 + minutos;

    let apertura;
    let cierre;

    // DOMINGO

    if (dia === 0) {

        apertura = 9 * 60;
        cierre = 17 * 60;

    }

    // LUNES A SÁBADO

    else {

        apertura = 8 * 60;
        cierre = 20 * 60;

    }

    const estado = document.getElementById("estadoLocal");

    if (horaActual >= apertura && horaActual < cierre) {

        estado.textContent = "🟢 Abierto ahora";

        estado.style.color = "#228b22";

    } else {

        estado.textContent = "🔴 Cerrado";

        estado.style.color = "#c0392b";

    }

}

actualizarHorario();


// ==========================================
// 3. WHATSAPP
// ==========================================

// Cambia este número por el número real
// de WhatsApp de la cafetería.

const numeroWhatsApp = "3205359482";


// BOTONES PARA PEDIR PRODUCTOS

const botonesPedir = document.querySelectorAll(".pedir");

botonesPedir.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const producto = boton.dataset.producto;

        const mensaje = "Hola, quiero pedir: " + producto;

        const enlace = "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            encodeURIComponent(mensaje);

        window.open(enlace, "_blank");

    });

});


// BOTÓN GENERAL DE WHATSAPP

const whatsappGeneral = document.getElementById("whatsappGeneral");

whatsappGeneral.href = "https://wa.me/" + numeroWhatsApp;


// ==========================================
// 4. VALIDACIÓN DE RESERVAS
// ==========================================

const formulario = document.getElementById("formReserva");

const fechaInput = document.getElementById("fecha");

const personasInput = document.getElementById("personas");


// OBTENER FECHA ACTUAL

function obtenerFechaActual() {

    const hoy = new Date();

    const año = hoy.getFullYear();

    const mes = String(hoy.getMonth() + 1).padStart(2, "0");

    const dia = String(hoy.getDate()).padStart(2, "0");

    return año + "-" + mes + "-" + dia;

}


// IMPEDIR FECHAS PASADAS

fechaInput.min = obtenerFechaActual();


// VALIDAR PERSONAS

personasInput.addEventListener("input", function() {

    if (personasInput.value > 10) {

        personasInput.value = 10;

    }

    if (personasInput.value < 1 && personasInput.value !== "") {

        personasInput.value = 1;

    }

});


// ==========================================
// 5. PROCESAR RESERVA
// ==========================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const fecha = document.getElementById("fecha").value;

    const hora = document.getElementById("hora").value;

    const personas = Number(document.getElementById("personas").value);


    // VALIDAR CAMPOS

    if (!nombre || !correo || !fecha || !hora || !personas) {

        alert("Por favor, completa todos los campos.");

        return;

    }


    // VALIDAR FECHA

    if (fecha < obtenerFechaActual()) {

        alert("No puedes reservar en una fecha pasada.");

        return;

    }


    // VALIDAR PERSONAS

    if (personas < 1 || personas > 10) {

        alert("El número de personas debe estar entre 1 y 10.");

        return;

    }


    // ======================================
    // MOSTRAR RESUMEN
    // ======================================

    const resumen = document.getElementById("resumenReserva");

    resumen.style.display = "block";

    resumen.innerHTML = `
        <h3>☕ ¡Reserva registrada!</h3>

        <p><strong>Nombre:</strong> ${nombre}</p>

        <p><strong>Correo:</strong> ${correo}</p>

        <p><strong>Fecha:</strong> ${fecha}</p>

        <p><strong>Hora:</strong> ${hora}</p>

        <p><strong>Personas:</strong> ${personas}</p>

        <br>

        <p>Gracias por elegir Aroma & Grano.</p>
    `;


    // LIMPIAR FORMULARIO

    formulario.reset();

    fechaInput.min = obtenerFechaActual();


    // MOSTRAR RESUMEN

    resumen.scrollIntoView({
        behavior: "smooth"
    });

});