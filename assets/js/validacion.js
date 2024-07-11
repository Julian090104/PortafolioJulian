
//EFECTO DE NAVEGACION EFECTO DE SCROLL
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

//FUNCIÓN PARA CERRAR EL MENÚ AL HACER CLIC EN UN LINK DEL MENÚ EN MODO RESPONSIVO
const propertyLinks = document.querySelectorAll('.menu__link');
const checkbox = document.getElementById('menu__bar');

propertyLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    checkbox.checked = false;
  });
});







const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_dctxol9';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email';
        alert('Sent!');
      }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
      });
  });