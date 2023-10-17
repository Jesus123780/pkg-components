import styled, { css } from 'styled-components'
import { BGColor, PColor, SFVColor } from '../../../assets/colors'

export const Container = styled.div`
    background-color: #ffffff; 
    padding: 70px 30px;
    border-radius: 25px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    height: 80vh;
    width: 90%;
    margin: auto;
`

export const UserInfo = styled.div`
  margin-left: 20px;
  font-family: 'PFont-Light', sans-serif;
`

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`

export const ProfileSection = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  margin: 1.5rem auto;
  padding: 2rem;
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .profile-secction__avatar {
    display: flex;
    align-items: center;
    justify-content: start;

    img {
      border: 1px solid #cccccc89;
    }
  }
`

export const ReadOnlyText = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #777777;
  font-family: 'PFont-Light', sans-serif;
  padding: 1rem;
  margin-bottom: 0.5rem;
`

export const EditButton = styled.button`
  background-color: ${props => (props.editing ? '#ffcccc' : 'transparent')};
  color: ${props => (props.editing ? 'var(--color-text-white)' : 'inherit')};
  border: none;
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  border: 1px solid #cccccc69;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 0 0 auto;
  font-family: 'PFont-Light', sans-serif;

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    stroke: var(--color-base-white);
  }
`

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333333;
  font-family: 'PFont-Light', sans-serif;
`

export const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #555555;
  font-family: 'PFont-Light', sans-serif;
`


export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${`${SFVColor}69`};
  overflow: hidden auto;
  &:last-child {
    border-right: none;
    overflow: hidden auto ;
    height: 100%;
  }
  
  width: ${({ width }) => width || '100%'};
`

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem; /* Ajusta el margen inferior para una transición más suave */
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-family: 'PFont-Light', sans-serif;
  font-size: 1rem; /* Ajusta el tamaño de fuente para que coincida con ReadOnlyText */
`

export const Button = styled.button`
  background-color: transparent;
  border-radius: 50px;
  border: none;
  color: var(--color-primary-red); 
  cursor: pointer;
  font-size: 1rem;
  margin: 10px 0;
  padding: 15px 60px;
  text-align: start;
  width: 90%;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    ${props => props.isActive && css`
    background-color: #ff000068;
    color: var(--color-base-white);
    font-family: 'PFONT-LIGHT';
  `}
  &:hover {
    background-color: ${`${PColor}69`};
    color: ${BGColor};
  }
`


export const Card = styled.div`
    width: 100%;
    border: 1px solid #ccc;
    margin: 0 auto 50px;
    padding: 30px 10px;

    @media (max-width: 767.98px) {
        width: 100%;
    }
`

export const ContainerHead = styled.div`
    display: flex;
    margin: 0 12px;
`
export const ImgContainer = styled.div`
    padding: 10px;
    min-width: 10%;
`
export const ContainerUpload = styled.div`
    width: 80%;
    padding: 10px;
    margin: auto 0;
`

export const InputContent = styled.div`
    justify-content: center;
    display: flex;
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
`
export const ContentText = styled.div`
    width: 100%;
    margin: 0 20px;

    @media (max-width: 767.98px) {
        margin: 0;
        width: 100%;
        margin-top: 10px;
    }
`
export const InputText = styled.input`
    width: 100%;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    min-height: 46px;
    padding: 4px 15px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:focus {
        border-color: #bbb;
        box-shadow: none;
        outline: 0 none;
    }
`

export const InputTextDesabled = styled.input`
    width: 100%;
    margin: 5px 0;
        border: 1px solid #ccc;
    background-color: #ddd;
    border-radius: 4px;
    color: ${({ theme }) => {return theme.InvTColor}};
    font-size: 15px;
    min-height: 46px;
    padding: 4px 15px;
    cursor: no-drop;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:focus {
        border-color: #bbb;
        box-shadow: none;
        outline: 0 none;
    }
`

export const Form = styled.form`
    width: 99%;
    background-color: ${({ theme }) => {return theme.InvColor}};
    border: 1px solid #ccc;
    margin: auto;
`
export const ButtonSubmit = styled.button`
    outline: none;
    cursor: pointer;
    font-family: PFont-Regular;
    color: #fff;
    margin: 0 5px;
    padding: 12px 10px;
    font-weight: 600;
    font-size: 16px;
    min-width: 120px;
    width: 200px;
    border-radius: 4px;
    background-color: #09e5ab;
    margin: 0 20px;

    @media (max-width: 767.98px) {
        margin: auto;
        margin-top: 20px;
    }
`

export const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    width: ${({ width }) => {return width ? width : '50%'}};
    margin: ${({ margin }) => {return margin ? margin : '0 20px'}};

    @media (max-width: 767.98px) {
        width: 100%;
        margin: 0;
        margin-top: 12px;
    }
`

export const Text = styled.span`
    text-align: ${({ tAlign }) => {return tAlign ? tAlign : 'left'}};
    font-size: ${({ fSize }) => {return fSize ? fSize : '16px'}};
    font-family: PFont-Regular;
    ${({ margin }) => {return margin && css`margin: ${margin};`}};
    color: ${({ theme }) => {return theme.InvTColor}};
    ${({ tit }) => {return tit && css`
        font-weight: ${({ fontWeight }) => {return fontWeight ? fontWeight : '700'}};
    `} }
    ${({ aSelf }) => {return aSelf && css`
        align-self: ${({ alignS }) => {return alignS ? alignS : 'flex-end'}};
    `} }

    @media (max-width: 767.98px) {
        font-size: 15px;
    }
`

