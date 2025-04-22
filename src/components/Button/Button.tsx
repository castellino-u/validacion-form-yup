import { FC } from 'react';
import style from './Button.module.css'

interface Props {
    isDisabled : boolean
}
export const Button : FC <Props> = ({isDisabled}) => {

  return (
    <>
    <button disabled= {isDisabled} >Submit</button>
    </>
  );
};