import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserHelperService } from '../UserHelper/user-helper.service'
import { ILoginDto, IPayload } from '../../Utils/Types/promise.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserHelperService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    })
  }

  async validate(payload: IPayload): Promise<ILoginDto> {
    const user = await this.userService.findById(payload._id)
    if (!user)
      throw new UnauthorizedException({ message: 'User is not authorized' })
    return { UID: payload.UID, _id: payload._id }
  }
}
