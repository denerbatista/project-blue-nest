import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser } from 'src/users/entities/user.entity';

@Injectable()
export class IsAdmin implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;
    const isAdmin: boolean = user.isAdmin;

    switch (isAdmin) {
      case true:
        return true;
      case false:
        throw new UnauthorizedException('Usuário não autorizado.');
    }
  }
}
