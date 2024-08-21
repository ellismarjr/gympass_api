import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new GetUserMetricsUseCase(checkInsRepository);

		await gymsRepository.create({
			id: "gym-01",
			title: "Academia 01",
			description: "",
			phone: "",
			latitude: new Decimal(0),
			longitude: new Decimal(0),
		});
	});

	it("should be able to check in count from metrics", async () => {
		await checkInsRepository.create({
			user_id: "user-01",
			gym_id: "gym-01",
		});

		await checkInsRepository.create({
			user_id: "user-01",
			gym_id: "gym-02",
		});

		const { checkInsCount } = await sut.execute({
			userId: "user-01",
		});
		expect(checkInsCount).toEqual(2);
	});
});
