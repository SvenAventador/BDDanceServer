import { Module } from "@nestjs/common"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { PrismaModule } from "../prisma/prisma.module"
import { ConfigModule } from "@nestjs/config"

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		UsersModule,
		AuthModule
	]
})
export class AppModule {
}
