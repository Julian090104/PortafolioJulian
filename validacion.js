document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact__form');
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const mensajeInput = document.querySelector('#mensaje');

    form.addEventListener('submit', function(event) {
        let valid = true;

        // Limpiar mensajes de error previos
        clearErrors();

        // Validar campo nombre
        if (nombreInput.value.trim() === '') {
            showError(nombreInput, 'El nombre es requerido');
            valid = false;
        }

        // Validar campo email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'El correo electrónico es requerido');
            valid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'El correo electrónico no es válido');
            valid = false;
        }

        // Validar campo mensaje
        if (mensajeInput.value.trim() === '') {
            showError(mensajeInput, 'El mensaje es requerido');
            valid = false;
        }

        // Si algún campo no es válido, prevenir el envío del formulario
        if (!valid) {
            event.preventDefault();
        }
    });

    // Función para mostrar mensaje de error
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.innerText = message;
        input.parentElement.appendChild(error);
        input.classList.add('input-error');
    }

    // Función para limpiar mensajes de error
    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(function(error) {
            error.remove();
        });

        const inputs = document.querySelectorAll('.input-error');
        inputs.forEach(function(input) {
            input.classList.remove('input-error');
        });
    }

    // Función para validar formato de correo electrónico
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
