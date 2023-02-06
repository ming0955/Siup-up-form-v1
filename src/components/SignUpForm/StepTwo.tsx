/* eslint-disable react/prop-types */
import React, { useEffect, ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormControlLabel, Checkbox } from '@mui/material'
import { IFormProps, IstepOneProps } from './types'
import ForwardIcon from '@mui/icons-material/Forward'
import CancelIcon from '@mui/icons-material/Cancel'
import { errorMessages } from './constants.enum'
import { CardImage, CardNumberPlaceHolder, SPAIcon } from './Icons'
import {
  HeadingTitle,
  CardWrapper,
  SubCaption,
  Form,
  Fields,
  Input,
  ErrorText,
  PreIcon,
  CardIcon,
  AgreeBox,
  FieldBox,
  InputWrapper,
  MiddleBorder,
  UserName,
  FirstName,
  LastName,
  CardNumber,
  HeaderContainer,
} from './styles'

export const StepTwo = ({
  headingTitle,
  subCaption = '',
  steps,
  setCurrentStep,
  currentStep,
  setData,
  data,
  onSubmit,
  validedFields,
  setValidedFields,
}: IstepOneProps) => {
  const [subCaptionTexts, setSubCaptionTexts] = useState<string[]>([])
  const [cardNumber, setCardNumber] = useState('')
  const [username, setUsername] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
  })

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<IFormProps>({
    mode: 'all',
  })

  useEffect(() => {
    const arr = formartSubcaption(subCaption)
    setSubCaptionTexts(arr)
  }, [subCaption])

  const formartSubcaption = (subCaption: string): string[] => {
    if (!subCaption) return []
    return subCaption.split(':')
  }

  const onChangeCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value
    const newResult = result
      .replace(/[^0-9A-z]/g, '')
      .split('')
      .reduce((str, l, i) => {
        return str + (!i || i % 4 ? '' : ' ') + l
      }, '')
    setCardNumber(newResult)
  }

  const formSubmit = (formData: IFormProps) => {
    const newData = {
      ...data,
      cardNumber: formData.cardNumber?.split(' ').join(''),
    }

    if (steps === currentStep) {
      if (onSubmit) onSubmit(newData)
    } else {
      if (setCurrentStep) setCurrentStep(currentStep + 1)
      if (setData) setData(newData)
    }
  }

  const ErrorBoxs = ({ message }: { message: string }) => {
    return (
      <ErrorText>
        <CancelIcon />
        &nbsp;{message}
      </ErrorText>
    )
  }

  type keyType = 'cardNumber'

  const checkValid = (key: keyType) => {
    const val = getValues(key)
    setValidedFields({
      ...validedFields,
      [key]: val && val !== '' ? true : false,
    })
    if (!val) {
      setError(key, { message: errorMessages[key] })
    }
  }

  const UserNameBox = () => {
    return (
      <UserName>
        <FirstName>{username.firstName}</FirstName>
        <LastName>{username.lastName}</LastName>
      </UserName>
    )
  }

  const CardNumberBox = () => {
    return <CardNumber>{cardNumber !== '' ? cardNumber : <CardNumberPlaceHolder />}</CardNumber>
  }

  return (
    <>
      <HeaderContainer>
        <HeadingTitle>{headingTitle || 'Enter Your Payment Details'}</HeadingTitle>
        {subCaptionTexts.map((text, i) => {
          return (
            <SubCaption key={i}>
              {text}
              {i === 0 && ' : '}
            </SubCaption>
          )
        })}
      </HeaderContainer>
      <CardWrapper>
        <CardImage />
        <CardNumberBox />
        {data?.firstName && <UserNameBox />}
      </CardWrapper>
      <Form onSubmit={handleSubmit((data) => formSubmit(data))} id='stepTwoForm'>
        <Fields>
          <FieldBox>
            <InputWrapper borderRemove={'right'} isDirty isValid>
              <PreIcon isValid>
                <ForwardIcon />
              </PreIcon>
              <Input
                placeholder='First Name'
                value={username.firstName}
                onChange={(e) => setUsername({ ...username, firstName: e.target.value })}
              />
            </InputWrapper>
          </FieldBox>
          <FieldBox>
            <InputWrapper borderRemove={'left'} isDirty isValid>
              <MiddleBorder />
              <Input
                placeholder='Last Name'
                value={username.lastName}
                onChange={(e) => setUsername({ ...username, lastName: e.target.value })}
              />
            </InputWrapper>
          </FieldBox>
        </Fields>

        <Fields>
          <FieldBox>
            <InputWrapper
              borderRemove='none'
              isDirty={dirtyFields.cardNumber && !errors.cardNumber}
              isValid={validedFields.cardNumber}
            >
              <PreIcon isValid={validedFields.cardNumber}>
                <ForwardIcon />
              </PreIcon>
              <Input
                placeholder='0000 0000 0000 0000 0000 00'
                value={cardNumber}
                autoComplete='off'
                {...register('cardNumber', {
                  required: true,
                  onChange: (e) => onChangeCardNumber(e),
                })}
                onBlur={(e) => checkValid(e.target.name as keyType)}
              />
              <CardIcon>
                <SPAIcon />
              </CardIcon>
            </InputWrapper>
            {errors.cardNumber && <ErrorBoxs message={errors.cardNumber.message || errorMessages.cardNumber} />}
          </FieldBox>
        </Fields>

        <AgreeBox>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                size='small'
                sx={{
                  color: '#88B431',
                  '&.Mui-checked': {
                    color: '#88B431',
                  },
                }}
              />
            }
            label='I accept the general terms and conditions'
          />
        </AgreeBox>
      </Form>
    </>
  )
}
