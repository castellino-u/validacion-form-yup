//Primero definir el schema
//Definir el tipo de datos que van a tener los inputs

//Inputs: 
// Validar que el nombre sea obligatorio y tenga mínimo 3 caracteres. 
// ● Validar que el correo tenga formato válido y sea obligatorio. 
// ● Validar que la contraseña tenga mínimo 6 caracteres y sea obligatoria. 
// ● Validar que la contraseña repetida coincida con la contraseña. 

import * as Yup  from 'yup';


const formSchema = Yup.object({
    name: Yup.string().min(3, "Debe tener más de 3 caracteres").required(),
    email: Yup.string().email("Ingrese una dirección de correo válida").required(),
    password: Yup.string().min(6).required(),
    repeatedPassword : Yup.string().oneOf([Yup.ref("password")],"Las contaseñas deben coincidir") 
})