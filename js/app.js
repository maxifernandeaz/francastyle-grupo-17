document.addEventListener('DOMContentLoaded', function() {

    // Seleccion de elementos de la interfaz
    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputDate = document.querySelector('#date');
    const inputtel = document.querySelector('#tel');
    const inputemail = document.querySelector('#email');
    const formulario = document.querySelector('#formulario');

    // Asignamos los eventos
    inputNombre.addEventListener('blur', validar);
    inputApellido.addEventListener('blur', validar);
    inputDate.addEventListener('blur', validar);
    inputtel.addEventListener('blur', validar)
    inputemail.addEventListener('blur', validar);

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta()
        } else {
            console.log('si tiene algo');
        }
    }

    function mostrarAlerta() {
        // Generamos alerta en HTML
        const error = document.createElement('p');
        error.textContent = 'Hubo un error...';
        
        

        // mostramos el error en el formulario
        formulario.appendChild(error)
    }


});