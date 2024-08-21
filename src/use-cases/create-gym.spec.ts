import { expect, it, describe, beforeEach } from "vitest";
import { UserRegisterUseCase } from "./user-register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";
import { Decimal } from "@prisma/client/runtime/library";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("User Register Use Case", () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new CreateGymUseCase(gymsRepository);
	});

	it("should be able to register", async () => {
		const { gym } = await sut.execute({
			title: "Academia 01",
			description: "Academia de musculação",
			phone: "",
			latitude: 0,
			longitude: 0,
		});

		expect(gym.id).toEqual(expect.any(String));
	});
});
