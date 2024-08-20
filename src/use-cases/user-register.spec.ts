import { expect, it, describe } from "vitest";
import { UserRegisterUseCase } from "./user-register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("User Register Use Case", () => {
	it("should be able to register", async () => {
		const usersRepository = new InMemoryUsersRepository();
		const userRegisterUseCase = new UserRegisterUseCase(usersRepository);

		const { user } = await userRegisterUseCase.execute({
			name: "John Doe",
			email: "john.doe@email.com",
			password: "123456",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should hash user password upon registration", async () => {
		const usersRepository = new InMemoryUsersRepository();
		const userRegisterUseCase = new UserRegisterUseCase(usersRepository);

		const user = await userRegisterUseCase.execute({
			name: "John Doe",
			email: "john.doe@email.com",
			password: "123456",
		});

		const isPasswordCorrectHashed = await compare(
			"123456",
			user.user.password_hash,
		);

		expect(isPasswordCorrectHashed).toBe(true);
	});

	it("should not to be able to register with same email twice", async () => {
		const usersRepository = new InMemoryUsersRepository();
		const userRegisterUseCase = new UserRegisterUseCase(usersRepository);

		const email = "john.doe@email.com";

		await userRegisterUseCase.execute({
			name: "John Doe",
			email,
			password: "123456",
		});

		await expect(() =>
			userRegisterUseCase.execute({
				name: "Jane Doe",
				email,
				password: "123456",
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
