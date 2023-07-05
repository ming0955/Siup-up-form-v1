/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
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

export const StepOne = React.memo(
  ({
    headingTitle,
    subCaption = '',
    data,
    validatedFields,
    targetGeo = [],
    setData,
    onSubmit,
    setValidatedFields,
  }: IstepOneProps) => {
    const [subCaptionTexts, setSubCaptionTexts] = useState<string[]>([])
    const [initCountry, setInitCountry] = useState('')
    const [countryList, setCountryList] = useState(targetGeo)
    const [phoneCountry, setPhoneCountry] = useState<any>()
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
      const arr = formatSubcaption(subCaption)
      setSubCaptionTexts(arr)
    }, [subCaption])

    const formatSubcaption = (subCaption: string): string[] => {
      if (!subCaption) return []
      return subCaption.split(':')
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://ipapi.co/json/')
          const data = await response.json()
          const _country = (data?.country_code || 'us').toLowerCase()
          setInitCountry(_country)
          const mergedArray = [...countryList, _country]
          setCountryList(mergedArray)
        } catch (error) {
          console.error('Error fetching IP address:', error)
          setInitCountry('us')
        }
      }

      fetchData()
    }, [])

    const formSubmit = async (formData: IFormProps) => {
      if (countryList.includes(phoneCountry)) {
        setData && setData(formData)
        onSubmit && onSubmit(formData)
      } else {
        setError('phoneNumber', { message: "This number can't be used in your location" })
      }
    }

    const ErrorBoxs = React.memo(({ message }: { message: string }) => {
      return <ErrorText>&nbsp;{message}</ErrorText>
    })

    type keyType = 'firstName' | 'lastName' | 'address' | 'zipCode' | 'city' | 'phoneNumber' | 'email'

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
                isValid={validatedFields.firstName}
              >
                <PreIcon isValid={validatedFields.firstName}>
                  <ForwardIcon />
                </PreIcon>
                <Input
                  placeholder='First Name'
                  autoComplete='off'
                  {...register('firstName', {
                    required: true,
                    minLength: { value: 3, message: 'First Name must be 3 characters or more' },
                    maxLength: { value: 50, message: 'First Name must be 50 characters or less' },
                  })}
                  onBlur={() => checkValid('firstName')}
                />
              </InputWrapper>
              {errors.firstName && <ErrorBoxs message={errors.firstName.message || errorMessages.firstName} />}
            </FieldBox>
            <FieldBox>
              <InputWrapper borderRemove={'left'} isDirty={dirtyFields.lastName && !errors.lastName}>
                <MiddleBorder />
                <Input
                  placeholder='Last Name'
                  autoComplete='off'
                  {...register('lastName', {
                    required: true,
                    minLength: { value: 3, message: 'Last Name must be 3 characters or more' },
                    maxLength: { value: 50, message: 'Last Name must be 50 characters or less' },
                  })}
                  onBlur={() => checkValid('lastName')}
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
                isValid={validatedFields.address}
              >
                <PreIcon isValid={validatedFields.address}>
                  <ForwardIcon />
                </PreIcon>
                <Input
                  placeholder='Address'
                  autoComplete='off'
                  {...register('address', { required: true })}
                  onBlur={() => checkValid('address')}
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
                isValid={validatedFields.zipCode}
              >
                <PreIcon isValid={validatedFields.zipCode}>
                  <ForwardIcon />
                </PreIcon>
                <Input
                  placeholder='Zipcode'
                  autoComplete='off'
                  {...register('zipCode', { required: true })}
                  onBlur={() => checkValid('zipCode')}
                />
              </InputWrapper>
              {errors.zipCode && <ErrorBoxs message={errors.zipCode.message || errorMessages.zipCode} />}
            </FieldBox>
            <FieldBox>
              <InputWrapper
                borderRemove={'left'}
                isDirty={dirtyFields.city && !errors.city}
                isValid={validatedFields.city}
              >
                <MiddleBorder />
                <Input
                  placeholder='City'
                  autoComplete='off'
                  {...register('city', { required: true })}
                  onBlur={() => checkValid('city')}
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
                isValid={validatedFields.phoneNumber}
              >
                <PreIcon isValid={validatedFields.phoneNumber}>
                  <ForwardIcon />
                </PreIcon>

                <Controller
                  name='phoneNumber'
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[0-9-]+$/,
                      message: 'Invalid phone number',
                    },
                    validate: {
                      isValidPhoneNumber: (value: any) => {
                        const parseNum = parsePhoneNumberFromString('+' + value)
                        const _country = (parseNum?.country || '').toLowerCase()
                        setPhoneCountry(_country)
                        return isValidPhoneNumber('+' + value) || 'Invalid phone number'
                      },
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <PSC.PhoneInputWrapper>
                      {initCountry && (
                        <PhoneInput
                          country={initCountry}
                          onlyCountries={countryList}
                          placeholder={'Phone Number'}
                          value={value}
                          onChange={onChange}
                          onBlur={() => checkValid('phoneNumber')}
                        />
                      )}
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
                isValid={validatedFields.email}
              >
                <PreIcon isValid={validatedFields.email}>
                  <ForwardIcon />
                </PreIcon>
                <Input
                  placeholder='Email'
                  autoComplete='off'
                  {...register('email', {
                    required: true,
                    pattern: {
                      value:
                        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                      message: 'Incorrect Email address.',
                    },
                  })}
                  onBlur={() => checkValid('email')}
                />
              </InputWrapper>
              {errors.email && <ErrorBoxs message={errors.email.message || errorMessages.email} />}
            </FieldBox>
          </Fields>
        </Form>
      </>
    )
  },
)

export default StepOne
