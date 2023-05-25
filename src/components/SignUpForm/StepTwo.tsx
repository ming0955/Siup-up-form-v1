/* eslint-disable react/prop-types */
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormControlLabel, Checkbox } from '@mui/material'
import { IFormProps, IstepOneProps } from './types'
import ForwardIcon from '@mui/icons-material/Forward'
// import CancelIcon from '@mui/icons-material/Cancel'
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
  CreditCardImage,
  CreditCardNumberPlaceHolder,
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
  setData,
  data,
  onSubmit,
  validatedFields,
  setValidatedFields,
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
  const creditCardPayment = paymentMethod === 'CreditCard' || paymentMethod === 'CC'

  const formartSubcaption = (subCaption: string): string[] => {
    if (!subCaption) return []
    return subCaption.split(':')
  }

  const handleChangeCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value
    let newCardNum = ''

    if (creditCardPayment) {
      if (result.length > 19) {
        e.preventDefault()
        return
      }
      const _result = result.replace(/\s/g, '')
      for (let i = 0; i < _result.length; i++) {
        if (i % 4 == 0 && i > 0) newCardNum = newCardNum.concat(' ')
        newCardNum = newCardNum.concat(_result[i])
      }
      cardType(newCardNum)
    } else {
      if (result.length > 42) {
        e.preventDefault()
        return
      }
      newCardNum = result
        .replace(/[^\dA-Z]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
    }

    setValue('cardNumber', result.replaceAll(' ', ''), { shouldValidate: true })
    setCardNum(newCardNum)
  }

  const checkValidDate = (date: string) => {
    const yy = Number('20' + date.split('/')[1])
    const mm = Number(date.split('/')[0])
    const expireDate = Number(new Date(yy, mm, 1, 0, 0, 0, 0))
    const today = new Date()
    const expectedDate = new Date().setMonth(today.getMonth() + 1)
    return expireDate > expectedDate
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

  const handleChangeExpireDate = (e: any) => {
    e.target.value = e.target.value
      .replace(
        /^([1-9]\/|[2-9])$/g,
        '0$1/', // 3 > 03/
      )
      .replace(
        /^(0[1-9]|1[0-2])$/g,
        '$1/', // 11 > 11/
      )
      .replace(
        /^([0-1])([3-9])$/g,
        '0$1/$2', // 13 > 01/3
      )
      .replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
        '$1/$2', // 141 > 01/41
      )
      .replace(
        /^([0]+)\/|[0]+$/g,
        '0', // 0/ > 0 and 00 > 0
      )
      .replace(
        // eslint-disable-next-line no-useless-escape
        /[^\d\/]|^[\/]*$/g,
        '', // To allow only digits and `/`
      )
      .replace(
        /\/\//g,
        '/', // Prevent entering more than 1 `/`
      )

    const result = e.target.value

    if (result.length > 5) {
      e.preventDefault()
      return
    }

    const expdate = result
    const expDateFormatter =
      expdate.replace(/\//g, '').substring(0, 2) +
      (expdate.length > 2 ? '/' : '') +
      expdate.replace(/\//g, '').substring(2, 4)
    setCardExpireDate(expDateFormatter)

    if (result.length === 5) {
      const isValidDate = checkValidDate(result)

      if (isValidDate) {
        setValue('expireDate', result, { shouldValidate: true })
      } else {
        setError('expireDate', { message: 'Please enter a valid Date.' })
      }
    }
  }

  useEffect(() => {
    const arr = formartSubcaption(subCaption)
    setSubCaptionTexts(arr)
  }, [subCaption])

  useEffect(() => {
    if (creditCardPayment) {
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
      paymentMethod: paymentMethod || 'IBAN',
    }

    if (creditCardPayment) {
      newData.expireDate = formData.expireDate
      newData.cvv = formData.cvv
    }

    setData && setData(newData)
    onSubmit && onSubmit(newData)
  }

  const ErrorBoxs = ({ message }: { message: string }) => {
    return <>{creditCardPayment ? null : <ErrorText>&nbsp;{message}</ErrorText>}</>
  }

  type keyType = 'cardNumber' | 'expireDate' | 'cvv'

  const checkValid = (key: keyType) => {
    const val = getValues(key)
    setValidatedFields({
      ...validatedFields,
      [key]: val && val !== '' && !errors[key] ? true : false,
    })
    if (!val) {
      setError(key, { message: errorMessages[key] })
    }
  }

  const UserNameBox = () => {
    return (
      <UserName>
        <FirstName>{creditCardPayment ? '' : username.firstName}</FirstName>
        <LastName>{creditCardPayment ? '' : username.lastName}</LastName>
      </UserName>
    )
  }

  const CardNumberBox = () => {
    const placeholder = creditCardPayment ? <CreditCardNumberPlaceHolder /> : <CardNumberPlaceHolder />
    return <ShowCardNumber credit={creditCardPayment}>{cardNum || placeholder}</ShowCardNumber>
  }

  const CardExpireDate = () => {
    return (
      <ExpireDateBox>
        <ShowCardExpireDate>
          <ExpireDatePreLabel>VALID THRU</ExpireDatePreLabel>
          <ExpireDateValue>{cardExpireDate || <CardExpireDatePlaceHolder />}</ExpireDateValue>
          <ExpireDateTopLabel>MONTH &nbsp; YEAR</ExpireDateTopLabel>
        </ShowCardExpireDate>
      </ExpireDateBox>
    )
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
        {creditCardPayment ? <CreditCardImage /> : <CardImage />}
        <CardNumberBox />
        <UserNameBox />
        {creditCardPayment && <CardExpireDate />}
      </CardWrapper>
      <Form onSubmit={handleSubmit((data) => formSubmit(data))} id='stepTwoForm'>
        <Fields>
          <FieldBox>
            <InputWrapper borderRemove={creditCardPayment ? 'none' : 'right'} isDirty isValid>
              <PreIcon isValid>
                <ForwardIcon />
              </PreIcon>
              <Input
                placeholder={creditCardPayment ? 'Card holer' : 'First Name'}
                value={creditCardPayment ? '' : username.firstName}
                onChange={(e) => setUsername({ ...username, firstName: e.target.value })}
              />
            </InputWrapper>
          </FieldBox>
          {!creditCardPayment && (
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
          )}
        </Fields>

        <Fields>
          <FieldBox>
            <InputWrapper
              borderRemove='none'
              isDirty={dirtyFields.cardNumber && !errors.cardNumber}
              isValid={validatedFields.cardNumber}
            >
              <PreIcon isValid={validatedFields.cardNumber}>
                <ForwardIcon />
              </PreIcon>
              <Input
                placeholder={creditCardPayment ? 'Card Number' : '0000 0000 0000 0000 0000 00'}
                autoComplete='off'
                value={cardNum}
                {...register('cardNumber', {
                  required: true,
                  pattern: selectedpattern,
                  maxLength: 34,
                  minLength: 16,
                })}
                onBlur={(e) => checkValid(e.target.name as keyType)}
                onChange={(e) => handleChangeCardNumber(e)}
              />
              <CardIcon>{creditCardPayment ? null : cardIcon}</CardIcon>
            </InputWrapper>
            {errors.cardNumber && <ErrorBoxs message={errors.cardNumber.message || errorMessages.cardNumber} />}
          </FieldBox>
        </Fields>

        {creditCardPayment && (
          <div style={{ display: 'flex' }}>
            <Fields>
              <FieldBox>
                <InputWrapper
                  borderRemove={'none'}
                  isDirty={dirtyFields.expireDate && !errors.expireDate}
                  isValid={validatedFields.expireDate}
                >
                  <PreIcon isValid={validatedFields.expireDate}>
                    <ForwardIcon />
                  </PreIcon>
                  <Input
                    placeholder='MM / YY'
                    autoComplete='off'
                    value={cardExpireDate}
                    {...register('expireDate', {
                      required: true,
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
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
                  isValid={validatedFields.cvv}
                >
                  <PreIcon isValid={validatedFields.cvv}>
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
                required
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
