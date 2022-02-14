import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { AuthService } from '../../Auth/auth.service'
import { IPayload } from '../../Types/PromiseTypes'

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const client = context.switchToWs().getClient()
      const cookie: Array<string> = client.handshake.headers.cookie.split(';')
      const token: string = cookie.find((token) => token.startsWith('ey'))
      const user: IPayload = this.authService.verifyAccessToken(token)
      if (!user || !token) throw new WsException('User is not authorized')
      context.switchToHttp().getRequest().user = user
      return !!user
    } catch (e) {
      throw new WsException(e.message)
    }
  }
}
