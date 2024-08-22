import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = schema.parse(request.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();
		const { user } = await authenticateUseCase.execute({ email, password });

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id,
				},
			},
		);

		reply.status(200).send({ token });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			reply.status(400).send({ message: error.message });
		}

		throw error;
	}
}
