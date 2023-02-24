/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
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
  ShowCardNumber,
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
  setSubmiting,
}: IstepOneProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<IFormProps>({
    mode: 'all',
  })
  const [subCaptionTexts, setSubCaptionTexts] = useState<string[]>([])
  const [username, setUsername] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
  })

  useEffect(() => {
    const arr = formartSubcaption(subCaption)
    setSubCaptionTexts(arr)
  }, [subCaption])

  const formartSubcaption = (subCaption: string): string[] => {
    if (!subCaption) return []
    return subCaption.split(':')
  }

  // const onChangeCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
  //   const result = e.target.value
  //   const newResult = result
  //     .replace(/[^0-9A-z]/g, '')
  //     .split('')
  //     .reduce((str, l, i) => {
  //       return str + (!i || i % 4 ? '' : ' ') + l
  //     }, '')
  //   setCardNumber(newResult)
  // }

  const formSubmit = (formData: IFormProps) => {
    const newData = {
      ...data,
      cardNumber: formData.cardNumber?.split(' ').join(''),
    }

    if (steps === currentStep) {
      setSubmiting && setSubmiting(true)
      setTimeout(() => {
        onSubmit && onSubmit(newData)
        setSubmiting && setSubmiting(false)
      }, 2000)
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
      [key]: val && val !== '' && !errors[key] ? true : false,
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
    return <ShowCardNumber>{watch('cardNumber') || <CardNumberPlaceHolder />}</ShowCardNumber>
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
        {/* display card number and user name */}
        <CardNumberBox />
        <UserNameBox />
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
                autoComplete='off'
                {...register('cardNumber', {
                  required: true,
                  pattern: {
                    value:
                      /^AL\d{10}[0-9A-Z]{16}$|^AD\d{10}[0-9A-Z]{12}$|^AT\d{18}$|^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$|^BE\d{14}$|^BA\d{18}$|^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$|^HR\d{19}$|^CY\d{10}[0-9A-Z]{16}$|^CZ\d{22}$|^DK\d{16}$|^FO\d{16}$|^GL\d{16}$|^DO\d{2}[0-9A-Z]{4}\d{20}$|^EE\d{18}$|^FI\d{16}$|^FR\d{12}[0-9A-Z]{11}\d{2}$|^GE\d{2}[A-Z]{2}\d{16}$|^DE\d{20}$|^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$|^GR\d{9}[0-9A-Z]{16}$|^HU\d{26}$|^IS\d{24}$|^IE\d{2}[A-Z]{4}\d{14}$|^IL\d{21}$|^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^[A-Z]{2}\d{5}[0-9A-Z]{13}$|^KW\d{2}[A-Z]{4}22!$|^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$|^LB\d{6}[0-9A-Z]{20}$|^LI\d{7}[0-9A-Z]{12}$|^LT\d{18}$|^LU\d{5}[0-9A-Z]{13}$|^MK\d{5}[0-9A-Z]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$|^MR13\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{12}[0-9A-Z]{11}\d{2}$|^ME\d{20}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{13}$|PL\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}|PL\d{26}|^PT\d{23}$|^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$|^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^SA\d{4}[0-9A-Z]{18}$|^RS\d{20}$|^SK\d{22}$|^SI\d{17}$|^ES\d{22}$|^SE\d{22}$|^CH\d{7}[0-9A-Z]{12}$|^TN59\d{20}$|^TR\d{7}[0-9A-Z]{17}$|^AE\d{21}$|^GB\d{2}[A-Z]{4}\d{14}$/,
                    message: 'Please enter a valid IBAN.',
                  },
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
