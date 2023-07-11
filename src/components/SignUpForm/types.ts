export interface IstepOneProps {
  firstColor?: string
  secondColor?: string
  headingTitle?: string
  subCaption?: string
  steps?: number
  paymentMethod?: string
  setCurrentStep?: (step: number) => void
  currentStep: number
  setData?: (data: IFormProps) => void
  data?: IFormProps
  onNext?: (data: IFormProps) => void
  onSubmit?: (data: IFormProps) => void
  validatedFields: IvalidedFields
  setValidatedFields: (data: IvalidedFields) => void
  targetGeo?: string[]
}

export interface IstepButtonsSytleProps {
  isSubmitting?: boolean
  buttonColor?: string
}

export interface IvalidedFields {
  firstName: boolean
  lastName: boolean
  address: boolean
  zipCode: boolean
  city: boolean
  phoneNumber: boolean
  email: boolean
  cardNumber: boolean
  expireDate?: boolean
  cvv?: boolean
}

export interface IStep {
  active?: boolean
  stepNum?: number
  firstColor?: string
  secondColor?: string
  success?: boolean
}

export interface IFieldsStyleProps {
  coverBack?: boolean | undefined
}

export interface IinputWrapperStyleProps {
  borderRemove: string | undefined
  isDirty?: boolean | undefined
  isValid?: boolean | undefined
}

export interface IinputStyleProps {
  borderRight?: boolean
  fullWidth?: boolean
}

export interface IpreIconStyleProps {
  isValid: boolean | undefined
}

export interface ErrorTextStyleProps {
  isError?: boolean | undefined
  fullWidth?: boolean
}

export interface IFormProps {
  firstName?: string
  lastName?: string
  address?: string | undefined
  zipCode?: string
  city?: string
  phoneNumber?: string
  email?: string
  paymentMethod?: string
  cardNumber?: string
  expireDate?: string
  cvv?: string
}

export interface IButtonGroupProps {
  marginTop?: boolean
}

export interface IshowCardNumberStyle {
  credit?: boolean
}
