import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UsersModule } from "../users/users.module"
import { JwtModule } from "@nestjs/jwt"
import { LocalStrategy } from "./strategies/local.strategy"
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy"
import { JwtAccessGuard } from "./guard/jwt-access.guard"

@Module({
	imports: [UsersModule, JwtModule.register({})],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		JwtRefreshStrategy,
		JwtAccessGuard
	]
})
export class AuthModule {
}
