import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../../Models/user.model'
import { UserHelperService } from './user-helper.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserHelperService],
  exports: [UserHelperService],
})
export class UserHelperModule {}
