import React, { useEffect, useState } from 'react'
import { ErrorBox, FormContainer, RowSpace, SignUpContainer, TermsCondition } from './styles'
import { Steps } from './Steps'
import { StepOne } from './StepOne'
import { IFormProps } from './types'
import { StepTwo } from './StepTwo'
import { StepButtons } from './StepButtons'
import { SF_FormColor } from './constants.enum'

interface Props {
  id?: string
  className?: string
  firstColor?: string
  secondColor?: string
  headingTitle: string[]
  subCaption: string[]
  steps: number
  loading: boolean
  currentStep: number
  paymentMethod?: string
  message?: string
  isLoading?: boolean
  back?: () => void
  onSubmit: (data: IFormProps, e?: { preventDefault: () => void }) => Promise<void>
}

const SignUpForm = ({
  id,
  className,
  firstColor,
  secondColor,
  headingTitle,
  subCaption,
  steps,
  loading,
  currentStep,
  paymentMethod,
  onSubmit,
  back,
  message,
}: Props) => {
  const [data, setData] = useState<IFormProps>({
    firstName: '',
    lastName: '',
    zipCode: '',
    city: '',
    phoneNumber: '',
    email: '',
    cardNumber: '',
  })

  const [validatedFields, setValidatedFields] = useState({
    firstName: false,
    lastName: false,
    address: false,
    zipCode: false,
    city: false,
    phoneNumber: false,
    email: false,
    cardNumber: false,
  })

  return (
    <SignUpContainer id={id || 'sf-sign-up-form'} className={className || 'sf-sign-up-form'}>
      {steps && steps > 1 && (
        <Steps
          currentStep={currentStep}
          firstColor={firstColor || SF_FormColor.PRIMARY}
          secondColor={secondColor || SF_FormColor.SECONDARY}
          steps={steps}
        />
      )}
      <FormContainer className='sf-form-container'>
        {currentStep === 1 && (
          <StepOne
            headingTitle={headingTitle[0]}
            subCaption={subCaption[0]}
            steps={steps || 1}
            data={data}
            currentStep={currentStep}
            validatedFields={validatedFields}
            setData={setData}
            onSubmit={onSubmit}
            setValidatedFields={setValidatedFields}
          />
        )}

        {currentStep === 2 && (
          <StepTwo
            headingTitle={headingTitle[1]}
            subCaption={subCaption[1]}
            steps={steps}
            currentStep={currentStep}
            setData={setData}
            data={data}
            onSubmit={onSubmit}
            validatedFields={validatedFields}
            setValidatedFields={setValidatedFields}
            paymentMethod={paymentMethod}
          />
        )}
      </FormContainer>
      {message && message !== '' && <ErrorBox>{message}</ErrorBox>}

      <StepButtons currentStep={currentStep} steps={steps} loading={loading} back={back} />
      {currentStep === 2 && (
        <TermsCondition>
          <p>We value your privacy. We will not see or rent your email address or phone number to third parties.</p>
          <RowSpace />
          <p>
            All Users are protected by our Service Guarantee. Your information will be safe as we employ the finest
            security measures to protect our members. We value your privacy and will not sell or rent your private
            information to third parties.
          </p>
        </TermsCondition>
      )}
    </SignUpContainer>
  )
}

export default SignUpForm
