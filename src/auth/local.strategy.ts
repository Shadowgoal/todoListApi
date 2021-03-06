import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const expectedUser = await this.authService.validateUser(username, password);
    if (!expectedUser) {
      throw new UnauthorizedException('Login or password is incorrect');
    }
    return expectedUser;
  }
}