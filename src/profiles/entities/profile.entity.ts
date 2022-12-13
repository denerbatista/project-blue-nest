import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UpdateProfileDto } from '../dto/update-profile.dto';

export class Profile extends UpdateProfileDto {
  @ApiProperty()
  @IsString()
  id: string;
}
