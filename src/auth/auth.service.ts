import { Injectable } from "@nestjs/common"
import { RegistrationDto } from "./dtos/registration.dto"
import { UsersService } from "../users/users.service"
import {
	hash,
	verify
} from "argon2"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { Response } from "express"

@Injectable()
export class AuthService {
	constructor(private readonly userService: UsersService,
				private readonly jwtService: JwtService,
				private readonly configService: ConfigService) {
	}

	async registration({ email, password }: RegistrationDto, res: Response) {
		const user = await this.userService.createOne({
			email,
			hashedPassword: await hash(password)
		})

		return await this.generateTokens(user.id, res)
	}

	async validateUser(email: string, password: string) {
		const userByEmail = await this.userService.getOne({ email })

		if (!userByEmail)
			return null

		const isValidPassword = await verify(userByEmail.password, password)
		if (!isValidPassword)
			return null

		return userByEmail
	}

	// Private methods
	async generateTokens(userId: number, res: Response) {
		const ACCESS_TOKEN = await this.jwtService.signAsync({
			userId
		}, {
			secret: this.configService.getOrThrow("JWT_ACCESS_SECRET"),
			expiresIn: this.configService.getOrThrow("JWT_ACCESS_EXPIRES")
		})

		const REFRESH_TOKEN = await this.jwtService.signAsync({
			userId
		}, {
			secret: this.configService.getOrThrow("JWT_REFRESH_SECRET"),
			expiresIn: this.configService.getOrThrow("JWT_REFRESH_EXPIRES")
		})

		res.cookie("refresh_token", REFRESH_TOKEN, {
			httpOnly: true,
			secure: true
		})
		return ACCESS_TOKEN
	}
}
