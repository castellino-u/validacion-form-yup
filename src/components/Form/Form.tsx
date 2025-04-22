import { useState } from 'react';
import style from './Form.module.css'
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { formSchema } from '../../schemas/formSchema';
import Swal from 'sweetalert2';

//Este fomr no va a ser un componente funcional porque me va a envolver a los inputs y nada más 
export const Form = () => {
    //SIEMPRE QUE VAMOS A TRABAJAR CON FORMULARIOS, VAMOS A DECLARAR LOS initial values
    //esto es para poder volver a vacio a todos los inputs cada vez que los llamemos

    const initialValues = {
        name:  "",
        email: "",
        password : "",
        repeatedPassword : ""
    }
    //siempre que trabajemos con forms, vamos a usar estados, 

    const [formValues, setFormValues] = useState(initialValues);
    //ahora creamos otro estado, que es donde vamos aguardar los errores que nos va a largar el yup a la hora de validar
    //hay que pensar en lo que va a hacer la app, y en base a eso crear los estados
    const [formErrors, setFormErrors] = useState<Record<string,string>>({})

    const [isDisabled, setIsDisabled] = useState(false)

    const  handleChange = async(e: React.ChangeEvent<HTMLInputElement>) =>{
        //desestructuramos el input 
        const {name, value} = e.target
        setFormValues((valoresPrevios) => ({
            ...valoresPrevios,
            [name] : value   //acá ya actualizamos los valores del input
        }))
        if (name !== "repeatedPassword"){
            try {
                await formSchema.validateAt(name, {...formValues, [name]: value })
                setFormErrors((erroresPrevios) => {
                    const newErrors = {...erroresPrevios}
                    delete newErrors [name]
                    return newErrors
                } )
                setIsDisabled(false)

            } catch (error : any ) {
                setFormErrors((erroresPrevios) =>(
                    {...erroresPrevios,[name]: error.message  }
                ))
                setIsDisabled(true)
            }
        }
    }

    const handleSumbmit = async (e: React.FormEvent) =>{
        e.preventDefault(); //este evento me previene que la página se recargue cuando suba el form

    try {
        await formSchema.validate(formValues, {abortEarly: false});
        setFormErrors({});
        
        Swal.fire({
            title: "Formulario enviado",
            icon: "success"
        })
        setFormValues(initialValues)
        //esto usa el sweetalert para disparar una alerta
    } catch (error) {
        if(error.inner){
            const newErrors : Record<string, string>={}
            error.inner.forEach((error)  => {
                if (error.path) newErrors[error.path] = error.message;

            });
            setFormErrors(newErrors)
        }
    }        
    }

    return (
    <>
        <div className={style.mainContainer}>
            <h2>Formulario</h2>
            <form action="submit" onSubmit={handleSumbmit}  className={style.formulario}>
                <Input name='name' label='Name' value={formValues.name} type='text' handleChange={handleChange} error={formErrors.name} ></Input>
                <Input name='email' label='Email' value={formValues.email} type='email' handleChange={handleChange} error={formErrors.email} ></Input>
                <Input name='password' label='Password' value={formValues.password} type='password' handleChange={handleChange} error={formErrors.password} ></Input>
                <Input name='repeatedPassword' label='Repeat Password' value={formValues.repeatedPassword} type='password' handleChange={handleChange} error={formErrors.repeatedPassword} ></Input>

                <div>
                    <Button isDisabled = {isDisabled} ></Button>
                </div>
            </form>
        </div>
    </>
    );
};