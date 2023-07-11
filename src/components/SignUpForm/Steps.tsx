import React from 'react'
import { StepContainer, StepperLine, StepNum, StepWrapper } from './styles'

interface IStepProps {
  currentStep: number
  firstColor: string
  secondColor: string
  steps: number
}

export const Steps = ({ currentStep, firstColor, secondColor, steps }: IStepProps) => {
  const arr = Array.from({ length: steps }, (_, i) => i + 1)

  return (
    <StepContainer className='sf-sign-up-form-step'>
      {arr.map((i) => (
        <StepWrapper key={i}>
          <StepperLine active={currentStep >= i} stepNum={i} firstColor={firstColor} secondColor={secondColor} />
          <StepNum
            active={currentStep >= i}
            stepNum={i}
            success={currentStep === steps && i === 1}
            firstColor={firstColor}
            secondColor={secondColor}
          >
            {`Step ${i}`}
          </StepNum>
        </StepWrapper>
      ))}
    </StepContainer>
  )
}
