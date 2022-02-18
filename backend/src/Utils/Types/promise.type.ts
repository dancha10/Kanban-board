export interface IPayload {
  UID: string
  _id: string
  iat: number
  exp: number
}

export interface ILoginDto {
  UID: string
  _id: string
}

export interface IResponseMessage {
  message: string
}

export interface IResponseSuccess {
  success: boolean
}

export interface IAccessToken {
  accessToken: string
}

export interface IFullSetOfTokens {
  accessToken: string
  refreshToken: string
}
