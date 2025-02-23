import {
	BadRequestException,
	ConflictException,
	Injectable
} from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { PrismaService } from "../../prisma/prisma.service"
import { GetUsersDto } from "./dtos/get-user.dto"

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {
	}

	async createOne({ email, hashedPassword }: CreateUserDto) {
		const userByEmail = await this.prismaService.user.findUnique({ where: { email } })
		if (userByEmail)
			throw new ConflictException("Пользователь с данной почтой уже существует!")

		return this.prismaService.user.create({
			data: {
				email,
				password: hashedPassword
			}
		})
	}

	async getOne({ id, email }: GetUsersDto) {
		if (!id && !email)
			throw new BadRequestException()

		return this.prismaService.user.findFirst({
			where: {
				id,
				email
			}
		})
	}
}
