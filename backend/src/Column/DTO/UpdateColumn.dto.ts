import { IsNotEmpty, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateColumnDto {
  @ApiProperty({ example: 'DONE' })
  @MaxLength(25, { message: 'Max title length $constraint1' })
  @IsNotEmpty()
  readonly title: string
}
