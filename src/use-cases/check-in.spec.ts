import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("CheckIn Use Case", () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository();
		sut = new CheckInUseCase(checkInsRepository);
	});

	it("should be able to check in", async () => {
		const checkIn = await checkInsRepository.create({
			gym_id: "gym-01",
			user_id: "user-01",
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});
});
