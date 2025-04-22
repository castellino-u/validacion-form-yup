import { FC } from 'react';
import style from './Input.module.css'

//esta interface va afuera para que se lo pueda aplicar al input
interface Props {
    label: string,
    name: string,
    value: string,
    type: string,
    handleChange : (e : React.ChangeEvent<HTMLInputElement>)=> void;
    error? : string //le ponemos el "?" para definir que sea opcional
}
//ahora hay que tipar al input para que sea un componente funcional
export const Input:  FC <Props>= ({label,name,value,type,handleChange,error} ) => {
    //a dentro hay que poner todo lo que va a devolver el componente
    

    return (
    <>
    <div className={style.containerInput}>
        <label htmlFor={name}>{label}</label>
        <input type={type} name = {name} onChange={handleChange} value={value}/>
        
    </div>

    </>
    );
};