import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean({ message: 'Este valor deve ser true ou false' })
  @ApiProperty({ example: 'false' })
  @IsOptional()
  isAdmin?: boolean;
}
