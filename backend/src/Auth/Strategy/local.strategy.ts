import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { UserHelperService } from '../UserHelper/user-helper.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserHelperService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string) {
    const user = await this.userService.validateUser(email, password)
    if (!user)
      throw new UnauthorizedException({ message: 'Invalid email or password' })
    return user
  }
}
