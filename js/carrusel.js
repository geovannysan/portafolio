
let boton = document.getElementById("btn-consulta")
let cedual = document.getElementById("numberce")
let nombr = document.getElementById("nombre")
let direcion = document.getElementById("direccion")
let cantidad = document.getElementById("cantiada")
let valor = document.getElementById("total")
let cerr = document.querySelector(".close")
let calcular = document.querySelector(".calcular")
let calcularcarr = document.querySelector(".calcularcarr")
let cerrar = document.getElementById("close")
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
var modalConsulta = new bootstrap.Modal(document.getElementById('calculosModal'))
var modalcalular = new bootstrap.Modal(document.getElementById('calculosModal'))
var cerrarpregunta = document.querySelector(".pregunta")

const imgElement = document.getElementById('imagenplan');
//modalConsulta.show();
document.querySelector('.modal').classList.add('zoom');
cerr.addEventListener("click", function () { myModal.hide(); })
calcular.addEventListener("click", function () {
    const imgElement = document.getElementById('planesimagen');
    imgElement.src = '/imagen/PLANES WEB-05.png';
    modalConsulta.hide();
    modalcalular.show();
})
calcularcarr.addEventListener("click", function () {
    imgElement.src = 'imagen/PLANES WEB-05.png';
    modalConsulta.hide();
    modalcalular.show();
})
cerrar.addEventListener("click", function () {
    myModal.hide();
})
cerrarpregunta.addEventListener("click", function () {
    console.log("cloc")
    modalConsulta.hide();
})
function MostarPlan(e,J) {
    modalConsulta.show();
    localStorage.setItem("PLANES", e)
    imgElement.src = "imagen/"+J+".png";
}
document.querySelector('.btn-close').addEventListener('click',()=>{
    modalConsulta.hide()
})
function rediret() {
    //localStorage.setItem("PLANES", "")
    window.location.href = "contratar.html"
}
boton.addEventListener('click', function (e) {
    console.log(cedual.value)

    if (cedual.value.trim() == "" || cedual.value.trim().length < 5) {
        /* $.alert({
             title: 'Atento!',
             content: 'Ingresa el número de identificación del propietario del servicio!',
         });*/
        return
    }
    Consultas(cedual.value).then(oupt => {
        if (oupt.estado == "exito") {
            let datos = oupt.datos[0]


            myModal.show();
            document.querySelector('.modal').classList.add('zoom');
            nombr.innerHTML = datos.nombre
            direcion.innerHTML = datos.direccion_principal
            cantidad.innerHTML = "Total de Facturas impagas: " + datos.facturacion.facturas_nopagadas
            valor.textContent = datos.facturacion.total_facturas

        }
        console.log(oupt)
    }).catch(err => {
        console.log(err)
    })
    console.log(e)
})
const Consultas = async (parm) => {
    let datos = {
        "cedula": "" + parm,
        "operador": "appspeed"
    }
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/PortalApi/GetClientsDetails", datos)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
/**
 $.confirm({
        title: 'Title',
        content: 'url:text.txt',
        onContentReady: function () {
            var self = this;
            this.setContentPrepend('<div>Prepended text</div>');
            setTimeout(function () {
                self.setContentAppend('<div>Appended text after 2 seconds</div>');
            }, 2000);
        },
        columnClass: 'medium',
    });
 */
