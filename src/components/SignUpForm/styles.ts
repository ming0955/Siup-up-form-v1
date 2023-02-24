import styled, { css } from 'styled-components'
import { SF_FormColor } from './constants.enum'
import {
  IStep,
  IinputStyleProps,
  ErrorTextStyleProps,
  IinputWrapperStyleProps,
  IButtonGroupProps,
  IpreIconStyleProps,
  IstepButtonsSytleProps,
} from './types'

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 370px;
  padding: 1em 0;
  font-family: sans-serif;
`

export const StepContainer = styled.div`
  display: flex;
`

export const StepWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50%;
`

export const SteperLine = styled.div<IStep>`
  position: relative;
  height: 2px;
  background: ${(props) =>
    props.active ? props.firstColor || SF_FormColor.PRIMARY : props.secondColor || SF_FormColor.SECONDARY};

  &:after {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 100%;
    background: ${(props) =>
      props.active ? props.firstColor || SF_FormColor.PRIMARY : props.secondColor || SF_FormColor.SECONDARY};
    right: ${(props) => (props.stepNum === 1 ? '67%' : 'unset')};
    left: ${(props) => (props.stepNum === 2 ? '67%' : 'unset')};
    position: absolute;
    top: -8px;
  }
`
export const StepNum = styled.span<IStep>`
  position: absolute;
  display: flex;
  font-size: 10px;
  top: 14px;
  font-family: 'Lato';
  right: ${(props) => (props.stepNum === 1 ? '63%' : 'unset')};
  left: ${(props) => (props.stepNum === 2 ? '63%' : 'unset')};
  color: ${(props) => (props.active ? SF_FormColor.TEXTACTIVE : SF_FormColor.TEXTCOLOR)};
  color: ${(props) => props.sucess && SF_FormColor.PRIMARY};
`

export const FormContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  margin-top: 20px;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 20px;
`

export const HeadingTitle = styled.p`
  display: flex;
  font-style: normal;
  font-size: 22px;
  line-height: 26px;
  color: ${SF_FormColor.PRIMARY};
  margin: 10px 0 7px;
  font-family: 'Latoblack';
`

export const SubCaption = styled.p`
  margin: 0;
  padding: 0;
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #747474;
  font-family: 'Lato';
`

export const Form = styled.form``

export const Fields = styled.div`
  display: flex;
  margin-bottom: 16px;
`

export const FieldBox = styled.div`
  display: flex;
  flex: 1;
  height: auto;
  flex-direction: column;
`

export const InputWrapper = styled.div<IinputWrapperStyleProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0em 0.5em;
  height: 35px;
  border: 1px solid ${SF_FormColor.BORDER};

  ${({ isValid }) =>
    isValid &&
    css`
      background-color: #f4ffed;
      border-color: ${SF_FormColor.PRIMARY};
    `};

  ${({ borderRemove }) =>
    borderRemove && borderRemove === 'left'
      ? css`
          border-left: none;
        `
      : borderRemove === 'right'
      ? css`
          border-right: none;
        `
      : css``};

  ${({ borderRemove }) =>
    borderRemove && borderRemove === 'left'
      ? css`
          input {
            width: calc(100% - 17px);
          }
        `
      : css`
          input {
            width: calc(100% - 25px);
          }
        `};

  &:focus-within {
    border-color: ${SF_FormColor.PRIMARY};
  }

  & input {
    color: ${SF_FormColor.TEXTACTIVE} !important;
    font-family: 'Roboto' !important;
    &::placeholder {
      color: ${SF_FormColor.PLACEHOLDER} !important;
    }
  }
`

export const PreIcon = styled.div<IpreIconStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 12px;
  background-color: ${(props) => (props.isValid ? SF_FormColor.PRIMARY : SF_FormColor.PLACEHOLDER)};

  svg {
    font-size: 12px;
    line-height: 13px;
    color: #fff;
  }
`

export const MiddleBorder = styled.div`
  width: 5px;
  height: 25px;
  border-left: 1px solid ${SF_FormColor.BORDER};
  transform: translateX(-5px);
`

export const Input = styled.input<IinputStyleProps>`
  position: relative;
  border: none;
  outline: none !important;
  background-color: transparent;
  border-right: ${(props) => props.borderRight && `1px solid ${SF_FormColor.BORDER}`};

  &[name='cardNumber'] {
    width: calc(100% - 100px);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: ${SF_FormColor.TEXTACTIVE} !important;
  }
`

export const ErrorText = styled.p<ErrorTextStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  color: ${SF_FormColor.RED};
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 11px;
  margin: 0;
  transform: translateY(3px);

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: 0px;
    height: 1px;
    width: 100%;
    display: block;
    background-color: ${SF_FormColor.RED};
    transition: all 0.5s ease-in-out;
  }

  svg {
    font-size: 12px;
    font-weight: 100;
  }
`

export const CardWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: -15px;
  margin-bottom: 20px;
  height: 200px;

  img {
    width: 100%;
  }
`

export const CardIcon = styled.div`
  display: flex;
  width: 61px;
  height: 25px;

  img {
    width: 100%;
  }
`

export const AgreeBox = styled.div`
  display: flex;
  margin-top: -0.7em;
  align-items: center;

  input {
    cursor: pointer;
    width: fit-content;
  }

  .MuiFormControlLabel-label {
    color: rgba(116, 116, 116, 0.5);
    font-size: 12px;
    font-family: 'Lato';
  }
`

export const Label = styled.label`
  color: ${SF_FormColor.TEXTCOLOR};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
`

export const ButtonGroup = styled.div<IButtonGroupProps>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: ${(props) => (props.marginTop ? '17px' : '20px')};
`

export const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
`

export const StepButton = styled.button<IstepButtonsSytleProps>`
  position: relative;
  display: flex;
  overflow: hidden;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 800;
  font-size: 16px !important;
  line-height: 21px;
  color: #fff;
  white-space: nowrap;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14);
  padding: 10px 46px 10px 27px;
  background: linear-gradient(180deg, #8bb832 0%, #749c27 100%);
  box-shadow: inset 0px -0.5px 0px 0.5px #4c6c0c;
  border-radius: 5px;
  border: none;
  cursor: ${(props) => (props.isSubmiting ? 'not-allowed' : 'pointer')};

  &:hover span {
    transform: scale(1.01);
  }
  &:active span {
    transform: scale(1);
  }

  ${({ isSubmiting }) =>
    isSubmiting &&
    css`
      span {
        opacity: 0;
      }
    `}

  @media (min-width: 280px) {
    font-size: 18px !important;
  }

  @media (min-width: 340px) {
    font-size: 20px !important;
  }
`

export const Badge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Text = styled.span`
  font-size: inherit;
`

export const ButtonIconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  height: 27px;
  top: 7px;
  right: 3px;
  border-left: 2px solid #e3e3e3;

  svg {
    fill: #e3e3e3;
  }

  img {
    width: 19px;
  }
`

export const BackButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-right: 15px;
  height: 17px;
  color: #343434;
  border-bottom: 1px solid #6e6e53;

  &:hover {
    transform: scale(0.99);
    border-bottom: none;
  }
  &:active {
    transform: scale(1);
  }
`

export const UserName = styled.div`
  position: absolute;
  bottom: 13%;
  left: 7%;
  display: flex;
`

export const LastName = styled.p`
  margin: 0;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #fffefe;
  @media (min-width: 481px) {
    font-size: 18px;
  }
`

export const FirstName = styled(LastName)`
  margin-right: 10px;
`

export const ShowCardNumber = styled.div`
  position: absolute;
  bottom: 26%;
  left: 7%;
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
  @media (min-width: 481px) {
    font-size: 17px;
  }
`

export const TermsCondition = styled.div`
  margin-top: 33px;
  p {
    display: flex;
    align-items: center;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    margin: 0;
    padding: 0;
    color: #343434;
  }
`

export const RowSpace = styled.div`
  display: flex;
  width: 100;
  height: 16px;
`
export const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`
