import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import CancelIcon from '@mui/icons-material/Cancel'
import ForwardIcon from '@mui/icons-material/Forward'
import { IstepOneProps, IFormProps } from './types'
import * as PSC from './phoneInput.style'
import {
  HeadingTitle,
  SubCaption,
  Form,
  Fields,
  Input,
  ErrorText,
  PreIcon,
  InputWrapper,
  MiddleBorder,
  FieldBox,
  HeaderContainer,
} from './styles'
import { errorMessages } from './constants.enum'

export const StepOne = ({
  headingTitle,
  subCaption = '',
  steps,
  setCurrentStep,
  currentStep,
  data,
  setData,
  onSubmit,
  validedFields,
  setValidedFields,
}: IstepOneProps) => {
  const [subCaptionTexts, setSubCaptionTexts] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setError,
    formState: { errors, dirtyFields },
  } = useForm<IFormProps>({
    defaultValues: {
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      address: data?.address || '',
      zipCode: data?.zipCode || '',
      city: data?.city || '',
      phoneNumber: data?.phoneNumber || '',
      email: data?.email || '',
    },
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

  const formSubmit = (formData: IFormProps) => {
    if (steps === currentStep) {
      if (onSubmit) onSubmit(formData)
    } else {
      if (setCurrentStep) setCurrentStep(currentStep + 1)
      if (setData) setData(formData)
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

  type keyType = 'firstName' | 'lastName' | 'address' | 'zipCode' | 'city' | 'phoneNumber' | 'email'

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

  return (
    <>
      <HeaderContainer>
        <HeadingTitle>{headingTitle || 'Enter Your Information'}</HeadingTitle>
        {subCaptionTexts.map((text, i) => {
          return (
            <SubCaption key={i}>
              {text}
              {i === 0 && ' : '}
            </SubCaption>
          )
        })}
      </HeaderContainer>

      <Form onSubmit={handleSubmit((data) => formSubmit(data))} id='stepOneForm'>
        <Fields>
          <FieldBox>
            <InputWrapper
              borderRemove={'right'}
              isDirty={dirtyFields.firstName && !errors.firstName}
              isValid={validedFields.firstName}
            >
              <PreIcon isValid={validedFields.firstName}>
                <ForwardIcon />
              </PreIcon>
              <Input
                placeholder='First Name'
                autoComplete='off'
                {...register('firstName', {
                  required: true,
                  minLength: { value: 3, message: 'First Name must be 3 characters more' },
                  maxLength: { value: 50, message: 'First Name must be 50 characters less' },
                })}
                onBlur={(e) => checkValid(e.target.name as keyType)}
              />
            </InputWrapper>
            {errors.firstName && <ErrorBoxs message={errors.firstName.message || errorMessages.firstName} />}
          </FieldBox>
          <FieldBox>
            <InputWrapper
              borderRemove={'left'}
              isDirty={dirtyFields.lastName && !errors.lastName}
              isValid={validedFields.lastName}
            >
              <MiddleBorder />
              <Input
                placeholder='Last Name'
                autoComplete='off'
                {...register('lastName', {
                  required: true,
                  minLength: { value: 3, message: 'Last Name must be 3 characters more' },
                  maxLength: { value: 50, message: 'Last Name must be 50 characters less' },
                })}
                onBlur={(e) => checkValid(e.target.name as keyType)}
              />
            </InputWrapper>
            {errors.lastName && <ErrorBoxs message={errors.lastName.message || errorMessages.lastName} />}
          </FieldBox>
        </Fields>

        <Fields>
          <FieldBox>
            <InputWrapper
              borderRemove='none'
              isDirty={dirtyFields.address && !errors.address}
              isValid={validedFields.address}
            >
              <PreIcon isValid={validedFields.address}>
                <ForwardIcon />
              </PreIcon>
              <Input
                placeholder='Address'
                autoComplete='off'
                {...register('address', { required: true })}
                onBlur={(e) => checkValid(e.target.name as keyType)}
              />
            </InputWrapper>
            {errors.address && <ErrorBoxs message={errors.address.message || errorMessages.address} />}
          </FieldBox>
        </Fields>

        <Fields>
          <FieldBox>
            <InputWrapper
              borderRemove={'right'}
              isDirty={dirtyFields.zipCode && !errors.zipCode}
              isValid={validedFields.zipCode}
            >
              <PreIcon isValid={validedFields.zipCode}>
                <ForwardIcon />
              </PreIcon>
              <Input
                placeholder='Zipcode'
                autoComplete='off'
                {...register('zipCode', { required: true })}
                onBlur={(e) => checkValid(e.target.name as keyType)}
              />
            </InputWrapper>
            {errors.zipCode && <ErrorBoxs message={errors.zipCode.message || errorMessages.zipCode} />}
          </FieldBox>
          <FieldBox>
            <InputWrapper borderRemove={'left'} isDirty={dirtyFields.city && !errors.city} isValid={validedFields.city}>
              <MiddleBorder />
              <Input
                placeholder='City'
                autoComplete='off'
                {...register('city', { required: true })}
                onBlur={(e) => checkValid(e.target.name as keyType)}
              />
            </InputWrapper>
            {errors.city && <ErrorBoxs message={errors.city.message || errorMessages.city} />}
          </FieldBox>
        </Fields>

        <Fields>
          <FieldBox>
            <InputWrapper
              borderRemove='none'
              isDirty={dirtyFields.phoneNumber && !errors.phoneNumber}
              isValid={validedFields.phoneNumber}
            >
              <PreIcon isValid={validedFields.phoneNumber}>
                <ForwardIcon />
              </PreIcon>
              <Controller
                name='phoneNumber'
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <PSC.PhoneInputWrapper>
                    <PhoneInput
                      country={'gb'}
                      preferredCountries={['gb']}
                      regions={['europe']}
                      disableCountryCode={true}
                      placeholder={'Phone Number'}
                      value={value}
                      onChange={onChange}
                      onBlur={() => checkValid('phoneNumber')}
                    />
                  </PSC.PhoneInputWrapper>
                )}
              />
            </InputWrapper>
            {errors.phoneNumber && <ErrorBoxs message={errors.phoneNumber.message || errorMessages.phoneNumber} />}
          </FieldBox>
        </Fields>
        <Fields>
          <FieldBox>
            <InputWrapper
              borderRemove='none'
              isDirty={dirtyFields.email && !errors.email}
              isValid={validedFields.email}
            >
              <PreIcon isValid={validedFields.email}>
                <ForwardIcon />
              </PreIcon>
              <Input
                placeholder='Email'
                autoComplete='off'
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Incorrect Email address.',
                  },
                })}
                onBlur={(e) => checkValid(e.target.name as keyType)}
              />
            </InputWrapper>
            {errors.email && <ErrorBoxs message={errors.email.message || errorMessages.email} />}
          </FieldBox>
        </Fields>
      </Form>
    </>
  )
}
