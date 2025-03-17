import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { config } from 'src/config';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<any> {
    const user = await this.userService.findById(payload.id, true);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    
    return user;
  }
}
