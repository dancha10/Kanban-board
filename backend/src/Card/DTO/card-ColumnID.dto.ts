import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CardColumnIdDto {
  @ApiProperty({ example: '6203f9d991c9f9df098d7478', format: 'Column ID' })
  @IsString()
  @IsNotEmpty()
  readonly CID: string
}
