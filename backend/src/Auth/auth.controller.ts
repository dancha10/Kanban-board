import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { LocalAuthGuard } from './Guard/local-auth.guard'
import { AuthService } from './auth.service'
import { CreateUserDto } from './DTO/CreateUser.dto'
import { IAccessToken, IFullSetOfTokens } from '../Utils/Types/promise.type'
import { cookieSettings } from '../Utils/cookie.settings'
import { GoogleAuthGuard } from './Guard/google-auth.guard'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Registration user' })
  @UsePipes(ValidationPipe)
  @Post('/signup')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IAccessToken> {
    const token: IFullSetOfTokens = await this.authService.signup(userDto)
    response.cookie('refreshToken', token.refreshToken, cookieSettings)
    return { accessToken: token.accessToken }
  }

  @ApiOperation({ summary: 'Login' })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IAccessToken> {
    const payload = this.authService.createLoginDto(request.user)
    const token = await this.authService.login(payload)
    response.cookie('refreshToken', token.refreshToken, cookieSettings)
    return { accessToken: token.accessToken }
  }

  @ApiOperation({ summary: 'Logout' })
  @HttpCode(HttpStatus.OK)
  @Get('/logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { refreshToken } = request.cookies
    await this.authService.deleteToken(refreshToken)
    response.clearCookie('refreshToken')
  }

  @ApiOperation({ summary: 'Refresh jwt token' })
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<IAccessToken> {
    const { refreshToken } = request.cookies
    const token: IFullSetOfTokens = await this.authService.updateRefreshToken(
      refreshToken,
    )
    response.cookie('refreshToken', token.refreshToken, cookieSettings)
    return { accessToken: token.accessToken }
  }

  // OAuth 2.0
  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  @HttpCode(HttpStatus.OK)
  async googleAuth() {
    return { message: 'login by google loading...' }
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/redirect')
  @HttpCode(HttpStatus.OK)
  async googleRedirect(
    @Req()
    request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.loginByOAuth(request)
    response.cookie('refreshToken', tokens.refreshToken, cookieSettings)
    return response.redirect('http://localhost:3000/oauth-success')
  }

  @Get('/google/success')
  async googleSuccess(@Req() request: Request) {
    const { refreshToken } = request.cookies
    return this.authService.getUserByOAuth(refreshToken)
  }
}
