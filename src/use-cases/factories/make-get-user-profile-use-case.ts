import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
	const prismaUserRepository = new PrismaUsersRepository();
	const getUserProfileUseCase = new GetUserProfileUseCase(prismaUserRepository);

	return getUserProfileUseCase;
}
