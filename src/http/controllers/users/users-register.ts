import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { UserRegisterUseCase } from "@/use-cases/user-register";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function userRegister(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { name, email, password } = registerBodySchema.parse(request.body);

	try {
		const prismaUserRepository = new PrismaUsersRepository();
		const userRegisterUseCase = new UserRegisterUseCase(prismaUserRepository);
		await userRegisterUseCase.execute({ name, email, password });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	reply.status(201).send();
}
