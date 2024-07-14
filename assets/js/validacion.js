// EFECTO DE NAVEGACION EFECTO DE SCROLL
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// FUNCIÓN PARA CERRAR EL MENÚ AL HACER CLIC EN UN LINK DEL MENÚ EN MODO RESPONSIVO
const propertyLinks = document.querySelectorAll('.menu__link');
const checkbox = document.getElementById('menu__bar');

propertyLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    checkbox.checked = false;
  });
});

const btn = document.getElementById('button');
const form = document.getElementById('form');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');

const nombreResult = document.getElementById("nombre-counter");
const nombreLimit = 50;
nombreResult.textContent = 0 + "/" + nombreLimit;

nombre.addEventListener("input", function () {
  const nombreLength = nombre.value.length;
  const errorNombre = document.querySelector('.contact__error--nombre');
  nombreResult.textContent = nombreLength + "/" + nombreLimit;

  if (nombreLength > nombreLimit) {
    errorNombre.innerText = 'El nombre debe tener máximo 50 caracteres';
    nombre.style.borderColor = "#FF2851";
    nombreResult.style.color = "#FF2851";
  }
  else {
    errorNombre.innerText = '';
    nombre.style.borderColor = "#f0f0f0";
    nombreResult.style.color = "var(--color-cenizo56)";
  }
});

const asuntoResult = document.getElementById("asunto-counter");
const asuntoLimit = 50;
asuntoResult.textContent = 0 + "/" + asuntoLimit;

asunto.addEventListener("input", function () {
  const asuntoLength = asunto.value.length;
  const errorAsunto = document.querySelector('.contact__error--asunto');
  asuntoResult.textContent = asuntoLength + "/" + asuntoLimit;

  if (asuntoLength > asuntoLimit) {
    errorAsunto.innerText = 'El asunto debe tener máximo 50 caracteres';
    asunto.style.borderColor = "#FF2851";
    asuntoResult.style.color = "#FF2851";
  }
  else {
    errorAsunto.innerText = '';
    asunto.style.borderColor = "#f0f0f0";
    asuntoResult.style.color = "var(--color-cenizo56)";
  }
});

const mensajeResult = document.getElementById("mensaje-counter");
const mensajeLimit = 300;
mensajeResult.textContent = 0 + "/" + mensajeLimit;

mensaje.addEventListener("input", function () {
  const mensajeLength = mensaje.value.length;
  const errorMensaje = document.querySelector('.contact__error--mensaje');
  mensajeResult.textContent = mensajeLength + "/" + mensajeLimit;

  if (mensajeLength > mensajeLimit) {
    errorMensaje.innerText = 'El mensaje debe tener máximo 300 caracteres';
    mensaje.style.borderColor = "#FF2851";
    mensajeResult.style.color = "#FF2851";
  }
  else {
    errorMensaje.innerText = '';
    mensaje.style.borderColor = "#f0f0f0";
    mensajeResult.style.color = "var(--color-cenizo56)";
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Clear previous errors
  document.querySelector('.contact__error--nombre').innerText = '';
  document.querySelector('.contact__error--email').innerText = '';
  document.querySelector('.contact__error--asunto').innerText = '';
  document.querySelector('.contact__error--mensaje').innerText = '';

  let isValid = true;

  if (nombre.value === '') {
    document.querySelector('.contact__error--nombre').innerText = 'El campo nombre es obligatorio';
    isValid = false;
  }

  if (email.value === '') {
    document.querySelector('.contact__error--email').innerText = 'El campo email es obligatorio';
    isValid = false;
  } else if (!validateEmail(email.value)) {
    document.querySelector('.contact__error--email').innerText = 'Por favor, ingresa un correo electrónico válido';
    isValid = false;
  }

  if (asunto.value === '') {
    document.querySelector('.contact__error--asunto').innerText = 'El campo asunto es obligatorio';
    isValid = false;
  }

  if (mensaje.value === '') {
    document.querySelector('.contact__error--mensaje').innerText = 'El campo mensaje es obligatorio';
    isValid = false;
  }

  if (isValid &&
    asunto.value.length <= asuntoLimit &&
    nombre.value.length <= nombreLimit &&
    mensaje.value.length <= mensajeLimit) {

    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_dctxol9';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email';
        Swal.fire({
          icon: 'success',
          title: 'Correo Enviado',
          text: '¡Tu mensaje ha sido enviado con éxito!',
        });
        nombre.value = '';
        email.value = '';
        asunto.value = '';
        mensaje.value = '';
        nombreResult.textContent = 0 + "/" + nombreLimit;
        asuntoResult.textContent = 0 + "/" + asuntoLimit;
        mensajeResult.textContent = 0 + "/" + mensajeLimit;
      }, (err) => {
        btn.value = 'Send Email';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.',
        });
      });
  }
});
