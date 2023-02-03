import React from 'react'
import { StepContainer, SteperLine } from './styles'
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
        <SteperLine key={i} active={currentStep >= i} stepNum={i} firstColor={firstColor} secondColor={secondColor} />
      ))}
    </StepContainer>
  )
}
