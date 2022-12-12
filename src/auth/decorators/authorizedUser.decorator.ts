import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser } from 'src/users/entities/user.entity';

@Injectable()
export class AuthorizedUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;
    const isAdmin: boolean = user.isAdmin;
    const bodyOrParams = request.body || request.params;
    const checkUserId: boolean = user.id === bodyOrParams.id;

    switch (isAdmin) {
      case true:
        return true;
      case false:
        switch (checkUserId) {
          case true:
            return true;
          case false:
            throw new UnauthorizedException('Usuário não autorizado.');
        }
    }
  }
}
