import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { Token, TokenModelDocument } from '../Models/token.model'
import { CreateUserDto } from './DTO/CreateUser.dto'
import { UserHelperService } from './UserHelper/user-helper.service'
import {
  IFullSetOfTokens,
  ILoginDto,
  IPayload,
} from '../Utils/Types/promise.type'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token.name) private TokenModel: Model<TokenModelDocument>,
    private readonly userService: UserHelperService,
    private readonly jwt: JwtService,
  ) {}

  async signup(userDto: CreateUserDto): Promise<IFullSetOfTokens> {
    const { email, password, password_confirm, nickname } = userDto
    const candidate = await this.userService.findByEmail(email)
    if (candidate) throw new BadRequestException('Such user already exists')
    if (password !== password_confirm)
      throw new BadRequestException('Password mismatch')

    const hashPassword: string = await bcrypt.hash(password, 10)
    const newUser = await this.userService.createUser(
      email,
      hashPassword,
      nickname,
    )
    const payloadForToken = { UID: newUser.UID, _id: newUser._id }
    const refreshToken = this.generateRefreshToken(payloadForToken)
    await this.saveRefreshToken(refreshToken, newUser._id)
    return {
      accessToken: this.generateAccessToken(payloadForToken),
      refreshToken,
    }
  }

  async login(userDto: ILoginDto): Promise<IFullSetOfTokens> {
    const refreshToken = this.generateRefreshToken(userDto)
    await this.saveRefreshToken(refreshToken, userDto._id)
    return {
      accessToken: this.generateAccessToken(userDto),
      refreshToken,
    }
  }

  createLoginDto(payloadDto: any): ILoginDto {
    return { UID: payloadDto._doc.UID, _id: payloadDto._doc._id }
  }

  private generateAccessToken(payload: ILoginDto): string {
    return this.jwt.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    })
  }

  private generateRefreshToken(payload: ILoginDto): string {
    return this.jwt.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    })
  }

  verifyRefreshToken(refreshToken: string): IPayload {
    try {
      return this.jwt.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      })
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnprocessableEntityException('Refresh token expired')
      } else {
        throw new UnprocessableEntityException('Refresh token malformed')
      }
    }
  }

  verifyAccessToken(accessToken: string) {
    try {
      return this.jwt.verify(accessToken, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      })
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnprocessableEntityException('Access token expired')
      } else {
        throw new UnprocessableEntityException('Access token malformed')
      }
    }
  }

  async saveRefreshToken(token: string, ID: string): Promise<Token> {
    const tokenData = await this.TokenModel.findOne({ user: ID })
    if (tokenData) {
      tokenData.refreshToken = token
      return await tokenData.save()
    }
    return await this.TokenModel.create({ user: ID, refreshToken: token })
  }

  async updateRefreshToken(refreshToken: string): Promise<IFullSetOfTokens> {
    const decode: IPayload = this.verifyRefreshToken(refreshToken)
    const tokenData = await this.TokenModel.findOne({ refreshToken })
    if (!decode || !tokenData)
      throw new UnauthorizedException({ message: 'User is not authorized' })
    const newRefreshToken = this.generateRefreshToken({
      UID: decode.UID,
      _id: decode._id,
    })
    const newAccessToken = this.generateAccessToken({
      UID: decode.UID,
      _id: decode._id,
    })
    await this.saveRefreshToken(newRefreshToken, decode._id)
    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  async deleteToken(token: string) {
    return this.TokenModel.deleteOne({ refreshToken: token })
  }

  async loginByOAuth(data: any) {
    if (!data.user) throw new BadRequestException()
    console.log(data.user)
    try {
      const { email, nickname, avatarURL, id } = data.user
      const user = await this.userService.findByEmail(email)
      if (user) return this.login({ UID: user.UID, _id: user._id })

      const hashPassword: string = await bcrypt.hash(id, 10)
      const dataUser = await this.userService.createUser(
        email,
        hashPassword,
        nickname,
        avatarURL,
      )
      return this.login({ UID: dataUser.UID, _id: dataUser._id })
    } catch (e) {
      console.log('Google error')
      throw new Error(e)
    }
  }

  async getUserByOAuth(cookies: string) {
    const decode: IPayload = await this.verifyRefreshToken(cookies)
    return this.login({ UID: decode.UID, _id: decode._id })
  }
}
