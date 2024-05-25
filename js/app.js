document.addEventListener('DOMContentLoaded', function () {

    const email = {
        nombre: '',
        apellido: '',
        date: '',
        tel: '',
        email: ''


    }



    // Seleccion de elementos de la interfaz
    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputDate = document.querySelector('#date');
    const inputtel = document.querySelector('#tel');
    const inputemail = document.querySelector('#email');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario input[type="submit"]')
    const btnReset = document.querySelector('#formulario input[type="reset"]');
    const spinner = document.querySelector('#spinner')

    // Asignamos los eventos
    inputNombre.addEventListener('input', validar);
    inputApellido.addEventListener('input', validar);
    inputDate.addEventListener('input', validar);
    inputtel.addEventListener('input', validar)
    inputemail.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        resetFormulario();

        
    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('d-flex');
        spinner.classList.remove('visually-hidden');

        setTimeout(() => {
            spinner.classList.remove('d-flex');
            spinner.classList.add('visually-hidden');

            resetFormulario();

            // Creamos un alerta
            const alertaExito = document.querySelector('p');
            alertaExito.classList.add('bg-success', 'bg-gradient', 'text-white', 'p-1', 'm-1', 'text-center', 'rounded', 'text-uppercase');
            alertaExito.textContent = 'mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        
        }, 3000);

    }

    function validar(e) {

        if (e.target.value.trim() === '') {
            mostrarAlerta(`El ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignamos los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobamos el objeto de email
        comprobarEmail();




    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);



        // Generamos alerta en HTML
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-danger', 'text-center', 'p-2')




        // mostramos el error en el formulario
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        // Comprobamos si ya existe un alerta
        const alerta = referencia.querySelector('.bg-danger');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado


    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return

        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        // Reiniciamos el objeto
        email.nombre = '';
        email.apellido = '';
        email.date = '';
        email.tel = '';
        email.email = '';

        formulario.reset();
        comprobarEmail();

    }


});