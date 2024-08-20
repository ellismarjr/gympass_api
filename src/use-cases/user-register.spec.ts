import { expect, it, describe, beforeEach } from "vitest";
import { UserRegisterUseCase } from "./user-register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: UserRegisterUseCase;

describe("User Register Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository();
		sut = new UserRegisterUseCase(usersRepository);
	});

	it("should be able to register", async () => {
		const { user } = await sut.execute({
			name: "John Doe",
			email: "john.doe@email.com",
			password: "123456",
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it("should hash user password upon registration", async () => {
		const user = await sut.execute({
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
		const email = "john.doe@email.com";

		await sut.execute({
			name: "John Doe",
			email,
			password: "123456",
		});

		await expect(() =>
			sut.execute({
				name: "Jane Doe",
				email,
				password: "123456",
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
