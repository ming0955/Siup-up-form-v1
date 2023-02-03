import React, { useState } from 'react'
import { RowSpace, SignUpContainer, TermsCondition } from './styles'
import { Steps } from './Steps'
import { StepOne } from './StepOne'
import { IFormProps } from './types'
import { StepTwo } from './StepTwo'
import { StepButtons } from './StepButtons'
import { SF_FormColor } from './constants.enum'

interface Props {
  firstColor?: string
  secondColor?: string
  headingTitle: string[]
  subCaption: string[]
  steps?: number
  onSubmit: (data: IFormProps) => void
}

const SignUpForm = ({ firstColor, secondColor, headingTitle, subCaption, steps, onSubmit }: Props) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<IFormProps>({
    firstName: '',
    lastName: '',
    zipCode: '',
    city: '',
    phoneNumber: '',
    email: '',
    cardNumber: '',
  })

  const [validedFields, setValidedFields] = useState({
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
    <SignUpContainer>
      {steps && steps > 1 && (
        <Steps
          currentStep={currentStep}
          firstColor={firstColor || SF_FormColor.PRIMARY}
          secondColor={secondColor || SF_FormColor.SECONDARY}
          steps={steps}
        />
      )}

      {currentStep === 1 && (
        <StepOne
          headingTitle={headingTitle[0]}
          subCaption={subCaption[0]}
          steps={steps || 1}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          data={data}
          setData={setData}
          onSubmit={onSubmit}
          validedFields={validedFields}
          setValidedFields={setValidedFields}
        />
      )}

      {currentStep === 2 && (
        <StepTwo
          headingTitle={headingTitle[1]}
          subCaption={subCaption[1]}
          steps={steps}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          setData={setData}
          data={data}
          onSubmit={onSubmit}
          validedFields={validedFields}
          setValidedFields={setValidedFields}
        />
      )}

      <StepButtons setCurrentStep={setCurrentStep} currentStep={currentStep} steps={steps} />
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