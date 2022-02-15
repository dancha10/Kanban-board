import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { User, UserModelDocument } from 'src/Models/user.model'

@Injectable()
export class UserHelperService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserModelDocument>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email })
  }

  async findById(id: string): Promise<User> {
    return this.UserModel.findById({ _id: id })
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email)
    const isMatch = await bcrypt.compare(password, user.password)
    if (user && isMatch) {
      const { password, ...other } = user
      return other
    }
    return null
  }

  async createUser(email: string, password: string, nickname: string) {
    const UID = nanoid(8)
    return this.UserModel.create({ UID, email, password, nickname })
  }
}
