import styled from 'styled-components'

 export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'sucess'  

 interface ButtonContainerProps {
    variant:ButtonVariant
}

const ButtonVariants ={
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    sucess:'green',

}

export const ButtonContainer = styled.button<ButtonContainerProps>`

    width:180px ;
    height: 40px;

    background-color: ${props => props.theme['green-500']}

    /* ${
        props => `background-color: ${ButtonVariants[props.variant]}`
    } */
`