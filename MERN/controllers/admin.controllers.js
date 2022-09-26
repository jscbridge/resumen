const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const user = {
    registro: (req, res) => {
        res.json(req.body)
        // register(req, res)
    },

    login: (req, res) => {
        loguear(req, res)
    }
}

async function register(req, res) {

    //! ---- Variables de la información del registro -----
    const nombre = req.body.nombre;
    const primerApellido = req.body.primerApellido;
    const segundoApellido = req.body.segundoApellido;
    const email = req.body.email;
    const dni = req.body.dni
    const direccion = req.body.direccion;
    const poblacion = req.body.poblacion;
    const password = req.body.password;
    const password2 = req.body.password2;


    //! Expresiones Regulares validaciones:
    var regExpDni = new RegExp(/^[0-9]{8}\-?[a-zA-Z]{1}/);
    var regExpName = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]+$/u); //agregado espacio para poner dos apellidos
    var regExpEmail = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);
    var regExpPass = new RegExp(/^(?=\w*\d)(?=\w*[a-zA-Z])\S{6,10}$/);
    var regExpCp = new RegExp(/^\d{5}$/);
    var regExpDir = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\d / -]+$/u) //agregado números y el espacio para poner en la dirección


    //! Zona de validaciones

    const nombreOk = regExpName.test(nombre);
    const apellido1Ok = regExpName.test(primerApellido);
    const apellido2Ok = regExpName.test(segundoApellido);
    const emailOk = regExpEmail.test(email);
    const passOk = regExpPass.test(password);
    const pass2Ok = regExpPass.test(password2);
    const mismoPassOk = password == password2;
    const dniOk = regExpDni.test(dni) && validation_dni(dni);
    const poblacionOk = regExpDir.test(poblacion);
    const cpOk = regExpCp.test(cp);
    const dirOk = regExpDir.test(direccion);

    var ok = nombreOk && apellido1Ok && apellido2Ok && emailOk && passOk && dniOk && pass2Ok && mismoPassOk && cpOk && poblacionOk && dirOk;





    
}


/**
     * Valida que el dni introducido por el usuario es real, utilizando el algoritmo de la policía
     * @param {string} dni - La informacion que recibe del formulario de registro
     * @return {string} letra - Devuelve la letra que correspondería según el algoritmo policial al número de dni introducido para comprobar si es correcto.
     */

 function validationFormat(dni) {
    dni = dni.toUpperCase();
    var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    var nums = parseInt(dni.substring(0, dni.length - 1));
    var letra = letras[nums % letras.length]; // [nums % letras.length] = posicion de la letra del array de la policia
    return letra == dni[8];
}
/**
     * Deja el dni con el formato que necesitamos para nuestra base de datos
     * @param {string} dni - La informacion que recibe del formulario de registro
     * @return {string} conGuion - Devuelve el dni que nos ha introducido el usuario sin el guion, si lo tuviera, para que tenga el formato que necesitamos.
     */

function quitarGuion(dni) {
    var conGuion = dni.split("-");
    if (conGuion.length == 1) {
        return dni;
    } else {
        return conGuion[0] + conGuion[1];
    }
}
/**
     * Recoge el dni sin guion que hemos generado en la funciónm quitar guion y da ese valor a la variable dni que utilizaremos para el registro.
     * @param {string} dni - La informacion que recibe del dni sin guion de la función quitar guion
     * @return {string} dhi - Devuelve la variable dni con el nuevo valor asignado
     */

function validation_dni(dni) {
    dni = quitarGuion(dni);
    return validationFormat(dni);
}

module.exports = user //revisar el nombre para importarlo en las rutas