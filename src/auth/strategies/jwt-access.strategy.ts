import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { UsersService } from "../../users/users.service"
import { Request } from "express"
import { JwtPayload } from "../../utils/types/jwt-payload"

@Injectable()
export class JWTAccessToken extends PassportStrategy(Strategy, "jwt-access") {
	constructor(private readonly configService: ConfigService,
				private readonly userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow("JWT_ACCESS_SECRET")
		})
	}

	async validate(payload: JwtPayload) {
		const user = await this.userService.getOne({ id: payload.userId })

		if (!user)
			throw new UnauthorizedException()

		return user
	}
}
