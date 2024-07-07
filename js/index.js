document.addEventListener("DOMContentLoaded", () => {

    const bodyTablaPosteos = document.querySelector("#body-tabla-posteos")
    const formCrearPosteos = document.querySelector("#form-crear-posteos")

    // funcion para obtener los datos de nuestra API usando axioskk
    const fetchPosteos = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3030/posteos/')

            const posteos = respuesta.data
            // limpiar la tabla antes de agregar nuevos datos.
            bodyTablaPosteos.innerHTML = "";

            // iterar sobre los datos y agregar los nuevos
            posteos.forEach(posteo => {
                // crear una nueva fila. 
                const fila = document.createElement("tr")
                //crear las celdas para el titulo, contenido y acciones. 
                const celdaTitulo = document.createElement("td")
                const celdaContenido = document.createElement("td")
                const celdaAcciones = document.createElement("td")

                // asignar el contenido de las celdas

                celdaTitulo.textContent = posteo.titulo
                celdaContenido.textContent = posteo.contenido

                // crear el boton eliminar
                const botonEliminar = document.createElement("button")
                botonEliminar.textContent = "Eliminar"
                botonEliminar.classList.add('btn', 'btn-outline-danger')
                botonEliminar.addEventListener("click", () => { borrarPosteo(posteo.id) })


                // crear el boton de editar
                const botonEditar = document.createElement("button")
                botonEditar.textContent = "Editar"
                botonEditar.classList.add('btn', 'btn-outline-primary', 'mx-1', 'my-1','px-3')
                botonEditar.addEventListener("click", () => {
                    // redirigir a la pagina de edicion con el id del psot en la URL
                    window.location.href = `edit.html?id=${posteo.id}`
                })
                // agregar los botnos a las celdas de acciones. 
                celdaAcciones.appendChild(botonEliminar)
                celdaAcciones.appendChild(botonEditar)

                // agregar las celdas a las fila. 
                fila.appendChild(celdaTitulo)
                fila.appendChild(celdaContenido)
                fila.appendChild(celdaAcciones)

                // agregar la fila al cuerpo de la tabla
                bodyTablaPosteos.appendChild(fila)

            })
        }
        catch (error) {
            console.error("Error al obtener los post", error)
        }
    }


    // Funcion para eliminar un posteo
    const borrarPosteo = async (id) => {
        try {
            await axios.delete(`http://localhost:3030/posteos/${id}`)
            // recargar la lista de posteos despues de eliminar
            fetchPosteos()
        } catch (error) {
            console.error("Error al obtener los post", error)
        }

    }

    // funcion para crear un nuevo posteo
    formCrearPosteos.addEventListener("submit", async function (e) {
        e.preventDefault();
        const nuevoPosteo = {
            titulo: document.querySelector('#nuevo-titulo').value,
            contenido: document.querySelector('#nuevo-contenido').value,
        };
        try {
            await axios.post(`http://localhost:3030/posteos/`, nuevoPosteo)
            // limpiar el formulario
            formCrearPosteos.reset()
            // recargamos la lista de posteos despues de crear uno nuevo
            fetchPosteos()

        } catch (error) {
            console.error("Error al crear el posteo", error)
        }

    })


    // llamar a la funcion para mostrar los posteos al cargar la página
    fetchPosteos()





})