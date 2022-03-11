import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { AuthService } from '../Auth/auth.service'
import { User, UserModelDocument } from '../Models/user.model'
import { Model } from 'mongoose'

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserModelDocument>,
    private authService: AuthService,
  ) {}

  async getUserInfo(token: string) {
    const userInfo = this.authService.verifyRefreshToken(token)
    const user = await this.UserModel.findById({ _id: userInfo._id })
    const { UID, nickname, avatarURL, email } = user
    return { UID, nickname, email, avatarURL }
  }
}
