import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { UserRegisterUseCase } from "../user-register";

export function makeUserRegisterUseCase() {
	const prismaUserRepository = new PrismaUsersRepository();
	const userRegisterUseCase = new UserRegisterUseCase(prismaUserRepository);

	return userRegisterUseCase;
}
