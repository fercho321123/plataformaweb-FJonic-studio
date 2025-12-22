import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') || 'secretKey', // usa tu env
    });
  }

  // payload es lo que firmaste en AuthService.login (sub, email, rol)
  async validate(payload: any) {
    // Aquí devolvemos lo que queramos que esté disponible en request.user
    return {
      id: payload.sub,
      email: payload.email,
      rol: payload.rol,
      nombre: payload.nombre,
    };
  }
}

