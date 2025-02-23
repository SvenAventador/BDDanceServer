import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import {
	Injectable,
	UnauthorizedException
} from "@nestjs/common"
import { Request } from "express"
import { UsersService } from "../../users/users.service"
import { JwtPayload } from "../../utils/types/jwt-payload"

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
	constructor(private readonly configService: ConfigService,
				private readonly userService: UsersService) {
		super({
			jwtFromRequest: (req: Request) => {
				return req.cookies["refresh_token"]
			},
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow("JWT_REFRESH_SECRET")
		})
	}

	async validate(payload: JwtPayload) {
		const user = await this.userService.getOne({ id: payload.userId })

		if (!user)
			throw new UnauthorizedException()

		return user
	}
}
