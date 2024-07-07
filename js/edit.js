
document.addEventListener("DOMContentLoaded", ()=>{
    //obtengo el formulario de edicion
    const formulario = document.querySelector("#editarPosteo")

    //obtengo los parmetros de la URL 

    const parametrosURL = new URLSearchParams(window.location.search);
    const IdPosteo = parametrosURL.get("id")

    // funcion para obtener los datos del posteo X ID

    const fetchPosteos = async (id) =>{
        try {
            const respuesta = await axios.get(`http://localhost:3030/posteos/${id}`)
            // consoe.log(respuesta)
            const posteo = respuesta.data
            // asigno los valores obtenidos a los campos del formulario. 
            document.querySelector("#nuevo-titulo").value = posteo.titulo
            document.querySelector("#nuevo-contenido").value = posteo.contenido

            
        } catch (error) {
            console.error("Error al obtener los post", error)
            
        }
    }

// llamo a la funcion para obtener el posteo. 
if (IdPosteo) {
    fetchPosteos(IdPosteo)
}
// FUNCION PARA ACTUALIZAR POSTEO
formulario.addEventListener("submit", async function(evento){
    evento.preventDefault()

    const actualizarPosteo = {
        titulo: document.querySelector("#nuevo-titulo").value,
        contenido: document.querySelector("#nuevo-contenido").value
    }
    try {
        await axios.put(`http://localhost:3030/posteos/${IdPosteo}`,actualizarPosteo)
        alert (`El posteo ${IdPosteo} se actualizo`)
        window.location.href = "sobrenosotros.html"
    } catch (error) {
        console.error("Error al actualizar el posteo", error)
    }
})

})


