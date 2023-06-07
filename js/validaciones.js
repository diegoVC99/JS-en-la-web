export function valida(input){
    const tipoDeInput= input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= " "

    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput,input)

    }
}

const tiposDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeDeError ={
    nombre:{
        valueMissing:"El campo nombre no puede estar vacio",
    },
    email:{
        valueMissing:"El correo no puede estar vacio",
        typeMismatch:"El correo no es valido",
    },
    password:{
        valueMissing:"El campo contraseña no puede estar vacio",
        patternMismatch:"al menos 6 caracteres, maximo 12, debe de contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales"
    },
    nacimiento:{
        valueMissing:"Este campo no puede estar vacio",
        customError:"debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing:"Este campo no puede estar vacio",
        patternMismatch:"El formato requerido XXXX-XXXX-XX 10 numeros"
    },
    direccion:{
        valueMissing:"Este campo de direccion no puede estar vacio",
        patternMismatch:"La direccion debe de tener entre 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing:"Este campo cuidad no puede estar vacio",
        patternMismatch:"La cuidad debe de tener entre 3 a 20 caracteres",
    },
    estado:{
        valueMissing:"Este campo de estado no puede estar vacio",
        patternMismatch:"El estado debe de tener entre 5 a 20 caracteres"
    },
};

const validadores ={
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje = "";
    tiposDeErrores.forEach( error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}


function validarNacimiento(input){
    const fechaCliente= new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "debes tener al menos 18 años de edad";

    }

    input.setCustomValidity(mensaje);
}


function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual ;

};