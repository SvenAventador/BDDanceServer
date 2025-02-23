import {
	Body,
	Controller,
	ParseIntPipe,
	Post,
	Res,
	UseGuards
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { RegistrationDto } from "./dtos/registration.dto"
import { Response } from "express"
import { AuthGuard } from "@nestjs/passport"
import { CurrentUser } from "../utils/decorators/current-user.decorator"

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post("registration")
	async registration(@Body() dto: RegistrationDto, @Res({ passthrough: true }) res: Response) {
		return await this.authService.registration(dto, res)
	}

	@UseGuards(AuthGuard("local"))
	@Post("login")
	async login(@CurrentUser("id", ParseIntPipe) userId: number,
				@Res({ passthrough: true }) res: Response) {
		return await this.authService.generateTokens(userId, res)
	}

	@UseGuards(AuthGuard("jwt-refresh"))
	@Post("refresh")
	async refresh(@CurrentUser("id", ParseIntPipe) userId: number,
				  @Res({ passthrough: true }) res: Response) {
		return await this.authService.generateTokens(userId, res)
	}

	@Post("logout")
	async logout(@Res({ passthrough: true }) res: Response) {
		res.cookie("refresh_token", "")
	}
}
