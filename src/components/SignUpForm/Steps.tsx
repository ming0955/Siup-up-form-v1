import React from 'react'
import { StepContainer, SteperLine, StepNum, StepWrapper } from './styles'
interface IStepProps {
  currentStep: number
  firstColor: string
  secondColor: string
  steps?: number
}

export const Steps = ({ currentStep, firstColor, secondColor }: IStepProps) => {
  const arr = [1, 2]
  return (
    <StepContainer>
      {arr.map((i) => (
        <StepWrapper key={i}>
          <SteperLine active={currentStep >= i} stepNum={i} firstColor={firstColor} secondColor={secondColor} />
          <StepNum active={currentStep >= i} stepNum={i}>{`Step ${i}`}</StepNum>
        </StepWrapper>
      ))}
    </StepContainer>
  )
}
