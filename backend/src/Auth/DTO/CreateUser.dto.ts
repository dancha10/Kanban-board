import { IsEmail, MaxLength, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail()
  readonly email: string

  @ApiProperty({ example: '12345' })
  @MaxLength(25, { message: 'Max password length $constraint1 symbols' })
  @MinLength(4, { message: 'Min password length $constraint1 symbols' })
  readonly password: string

  @ApiProperty({ example: '12345' })
  @MaxLength(25, { message: 'Max password length $constraint1 symbols' })
  @MinLength(4, { message: 'Min password length $constraint1 symbols' })
  readonly password_confirm: string

  @ApiProperty({ example: 'bruh' })
  @MaxLength(20, { message: 'Max nickname length $constraint1 symbols' })
  @MinLength(2, { message: 'Min nickname length $constraint1 symbols' })
  readonly nickname: string
}
