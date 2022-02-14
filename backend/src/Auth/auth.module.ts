import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { MongooseModule } from '@nestjs/mongoose'
import { Token, TokenSchema } from '../Models/token.model'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserHelperModule } from './UserHelper/user-helper.module'
import { LocalStrategy } from './Strategy/local.strategy'
import { JwtStrategy } from './Strategy/jwt.strategy'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema,
      },
    ]),
    JwtModule.register({}),
    UserHelperModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
