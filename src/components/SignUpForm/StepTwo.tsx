/* eslint-disable react/prop-types */
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormControlLabel, Checkbox } from '@mui/material'
import { IFormProps, IstepOneProps } from './types'
import ForwardIcon from '@mui/icons-material/Forward'
import CancelIcon from '@mui/icons-material/Cancel'
import { errorMessages } from './constants.enum'
import {
  CardImage,
  CardNumberPlaceHolder,
  SPAIcon,
  VisaIcon,
  MasterIcon,
  ExpressIcon,
  DiscoverIcon,
  CreditDefaultIcon,
  CardExpireDatePlaceHolder,
} from './Icons'

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
  ExpireDateBox,
  ShowCardExpireDate,
  ExpireDatePreLabel,
  ExpireDateValue,
  ExpireDateTopLabel,
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
  paymentMethod,
}: IstepOneProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<IFormProps>({
    mode: 'all',
  })
  const IbanPattern = {
    value:
      /^AL\d{10}[0-9A-Z]{16}$|^AD\d{10}[0-9A-Z]{12}$|^AT\d{18}$|^BH\d{2}[A-Z]{4}[0-9A-Z]{14}$|^BE\d{14}$|^BA\d{18}$|^BG\d{2}[A-Z]{4}\d{6}[0-9A-Z]{8}$|^HR\d{19}$|^CY\d{10}[0-9A-Z]{16}$|^CZ\d{22}$|^DK\d{16}$|^FO\d{16}$|^GL\d{16}$|^DO\d{2}[0-9A-Z]{4}\d{20}$|^EE\d{18}$|^FI\d{16}$|^FR\d{12}[0-9A-Z]{11}\d{2}$|^GE\d{2}[A-Z]{2}\d{16}$|^DE\d{20}$|^GI\d{2}[A-Z]{4}[0-9A-Z]{15}$|^GR\d{9}[0-9A-Z]{16}$|^HU\d{26}$|^IS\d{24}$|^IE\d{2}[A-Z]{4}\d{14}$|^IL\d{21}$|^IT\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^[A-Z]{2}\d{5}[0-9A-Z]{13}$|^KW\d{2}[A-Z]{4}22!$|^LV\d{2}[A-Z]{4}[0-9A-Z]{13}$|^LB\d{6}[0-9A-Z]{20}$|^LI\d{7}[0-9A-Z]{12}$|^LT\d{18}$|^LU\d{5}[0-9A-Z]{13}$|^MK\d{5}[0-9A-Z]{10}\d{2}$|^MT\d{2}[A-Z]{4}\d{5}[0-9A-Z]{18}$|^MR13\d{23}$|^MU\d{2}[A-Z]{4}\d{19}[A-Z]{3}$|^MC\d{12}[0-9A-Z]{11}\d{2}$|^ME\d{20}$|^NL\d{2}[A-Z]{4}\d{10}$|^NO\d{13}$|PL\d{2}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}|PL\d{26}|^PT\d{23}$|^RO\d{2}[A-Z]{4}[0-9A-Z]{16}$|^SM\d{2}[A-Z]\d{10}[0-9A-Z]{12}$|^SA\d{4}[0-9A-Z]{18}$|^RS\d{20}$|^SK\d{22}$|^SI\d{17}$|^ES\d{22}$|^SE\d{22}$|^CH\d{7}[0-9A-Z]{12}$|^TN59\d{20}$|^TR\d{7}[0-9A-Z]{17}$|^AE\d{21}$|^GB\d{2}[A-Z]{4}\d{14}$/,
    message: 'Please enter a valid IBAN.',
  }

  const CreditPattern = {
    value:
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    message: 'Please enter a valid Card Number.',
  }

  const [username, setUsername] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
  })

  const [selectedpattern, setPattern] = useState(IbanPattern)
  const [subCaptionTexts, setSubCaptionTexts] = useState<string[]>([])
  const [cardNum, setCardNum] = useState('')
  const [cardIcon, setCardIcon] = useState<React.ReactNode>()
  const [cardExpireDate, setCardExpireDate] = useState('')

  useEffect(() => {
    const arr = formartSubcaption(subCaption)
    setSubCaptionTexts(arr)
  }, [subCaption])

  const formartSubcaption = (subCaption: string): string[] => {
    if (!subCaption) return []
    return subCaption.split(':')
  }

  const cardType = (inputtxt: any) => {
    const matches = inputtxt.match(/(\d+)/)
    let cardno = ''
    if (matches) {
      cardno = inputtxt.split(' ').join('')
    }
    let cardtype1 = <CreditDefaultIcon />
    const visa = /^(?:4[0-9]{2,}?)$/
    const mastercardRegEx = /^(?:5[1-5][0-9]{3,})$/
    const amexpRegEx = /^(?:3[47][0-9]{3,})$/
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{5,})$/

    if (visa.test(cardno) === true) {
      cardtype1 = <VisaIcon />
    } else if (mastercardRegEx.test(cardno) === true) {
      cardtype1 = <MasterIcon />
    } else if (amexpRegEx.test(cardno) === true) {
      cardtype1 = <ExpressIcon />
    } else if (discovRegEx.test(cardno) === true) {
      cardtype1 = <DiscoverIcon />
    }
    setCardIcon(cardtype1)
  }

  const handleChangeCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value
    setValue('cardNumber', result.replaceAll(' ', ''), { shouldValidate: true })

    let newCardNum = ''
    if (paymentMethod === 'CreditCard' || paymentMethod === 'CC') {
      const _result = result.replace(/\s/g, '')
      for (let i = 0; i < _result.length; i++) {
        if (i % 4 == 0 && i > 0) newCardNum = newCardNum.concat(' ')
        newCardNum = newCardNum.concat(_result[i])
      }
      cardType(newCardNum)
    } else {
      newCardNum = result
        .replace(/[^\dA-Z]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
    }
    setCardNum(newCardNum)
  }

  const handleChangeExpireDate = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value
    setValue('expireDate', result.replaceAll('/', ''), { shouldValidate: true })

    const expdate = result
    const expDateFormatter =
      expdate.replace(/\//g, '').substring(0, 2) +
      (expdate.length > 2 ? '/' : '') +
      expdate.replace(/\//g, '').substring(2, 4)
    setCardExpireDate(expDateFormatter)
  }

  useEffect(() => {
    if (paymentMethod === 'CreditCard' || paymentMethod === 'CC') {
      setPattern(CreditPattern)
      setCardIcon(<CreditDefaultIcon />)
    } else {
      setCardIcon(<SPAIcon />)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod])

  const formSubmit = (formData: IFormProps) => {
    const newData = {
      ...data,
      cardNumber: formData.cardNumber?.replaceAll(' ', ''),
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

  type keyType = 'cardNumber' | 'expireDate' | 'cvv'

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
    return <ShowCardNumber>{cardNum || <CardNumberPlaceHolder />}</ShowCardNumber>
  }

  const CardExpireDate = () => (
    <ExpireDateBox>
      <ShowCardExpireDate>
        <ExpireDatePreLabel>VALID THRU</ExpireDatePreLabel>
        <ExpireDateValue>{cardExpireDate || <CardExpireDatePlaceHolder />}</ExpireDateValue>
        <ExpireDateTopLabel>MONTH &nbsp; YEAR</ExpireDateTopLabel>
      </ShowCardExpireDate>
    </ExpireDateBox>
  )

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
        <CardExpireDate />
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
                placeholder={
                  paymentMethod === 'CreditCard' || paymentMethod === 'CC'
                    ? '4242 4242 4242 4242'
                    : '0000 0000 0000 0000 0000 00'
                }
                autoComplete='off'
                value={cardNum}
                {...register('cardNumber', {
                  required: true,
                  pattern: selectedpattern,
                })}
                onBlur={(e) => checkValid(e.target.name as keyType)}
                onChange={(e) => handleChangeCardNumber(e)}
              />
              <CardIcon>{cardIcon}</CardIcon>
            </InputWrapper>
            {errors.cardNumber && <ErrorBoxs message={errors.cardNumber.message || errorMessages.cardNumber} />}
          </FieldBox>
        </Fields>

        {(paymentMethod === 'CreditCard' || paymentMethod === 'CC') && (
          <div style={{ display: 'flex' }}>
            <Fields>
              <FieldBox>
                <InputWrapper
                  borderRemove={'none'}
                  isDirty={dirtyFields.expireDate && !errors.expireDate}
                  isValid={validedFields.expireDate}
                >
                  <PreIcon isValid={validedFields.expireDate}>
                    <ForwardIcon />
                  </PreIcon>
                  <Input
                    placeholder='MM / YY'
                    autoComplete='off'
                    value={cardExpireDate}
                    {...register('expireDate', {
                      required: true,
                      pattern: {
                        value: /^[0-12]{1,2}[0-9]{3}$/,
                        message: 'Please enter a valid Date.',
                      },
                    })}
                    onBlur={(e) => checkValid(e.target.name as keyType)}
                    onChange={(e) => handleChangeExpireDate(e)}
                  />
                </InputWrapper>
                {errors.expireDate && <ErrorBoxs message={errors.expireDate.message || errorMessages.expireDate} />}
              </FieldBox>
            </Fields>
            &nbsp; &nbsp;
            <Fields>
              <FieldBox>
                <InputWrapper
                  borderRemove={'none'}
                  isDirty={dirtyFields.cvv && !errors.cvv}
                  isValid={validedFields.cvv}
                >
                  <PreIcon isValid={validedFields.cvv}>
                    <ForwardIcon />
                  </PreIcon>
                  <Input
                    type='password'
                    maxLength={4}
                    placeholder='CVV'
                    {...register('cvv', {
                      required: true,
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: 'Please enter a valid CVV.',
                      },
                    })}
                    onBlur={(e) => checkValid(e.target.name as keyType)}
                  />
                </InputWrapper>
                {errors.cvv && <ErrorBoxs message={errors.cvv.message || errorMessages.cvv} />}
              </FieldBox>
            </Fields>
          </div>
        )}

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
