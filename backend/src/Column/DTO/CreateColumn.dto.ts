import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateColumnDto {
  @ApiProperty({ example: 'TODO' })
  @MaxLength(25, { message: 'Max length $constraint1' })
  @IsNotEmpty()
  readonly title: string

  @ApiProperty({ example: 'M_dRCEDF' })
  @IsNotEmpty()
  @IsString()
  readonly BID: string
}
