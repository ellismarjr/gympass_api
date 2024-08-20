import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeUserRegisterUseCase } from "@/use-cases/factories/make-user-register-use-case";
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
		const userRegisterUseCase = makeUserRegisterUseCase();
		await userRegisterUseCase.execute({ name, email, password });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	reply.status(201).send();
}
