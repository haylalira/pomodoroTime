
import { ButtonContainer, ButtonVariant } from './ButtonStyles'

 interface ButtonProps{
    variant?:ButtonVariant
}


export function Button( {variant = "primary"}: ButtonProps){
    return(   <ButtonContainer variant={variant}>enviar</ButtonContainer>)
 
}
