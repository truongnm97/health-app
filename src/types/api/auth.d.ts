type TSignInParams = {
  email: string
  password: string
}

type TSignInResponse = {
  access_token: string
}

type TSignUpParams = {
  email: string
  password: string
}

type TSignUpResponse = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: string
  updatedAt: string
}

type TUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: string
  updatedAt: string
}
