import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { ProfileService } from './profile.service'
import { JwtAuthGuard } from '../Auth/Guard/jwt-auth.guard'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getUser(@Req() request: Request) {
    const { refreshToken } = request.cookies
    return this.profileService.getUserInfo(refreshToken)
  }
}
