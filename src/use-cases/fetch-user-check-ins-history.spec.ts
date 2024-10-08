import { beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch User CheckIns History Use Case", () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

		await gymsRepository.create({
			id: "gym-01",
			title: "Academia 01",
			description: "",
			phone: "",
			latitude: new Decimal(0),
			longitude: new Decimal(0),
		});

		vi.useFakeTimers();
	});

	it("should be able to check in history", async () => {
		await checkInsRepository.create({
			user_id: "user-01",
			gym_id: "gym-01",
		});

		await checkInsRepository.create({
			user_id: "user-01",
			gym_id: "gym-02",
		});

		const { checkIns } = await sut.execute({
			userId: "user-01",
			page: 1,
		});
		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({
				gym_id: "gym-01",
			}),
			expect.objectContaining({
				gym_id: "gym-02",
			}),
		]);
	});

	it("should be able to fetch paginated check-in history", async () => {
		for (let i = 1; i <= 22; i++) {
			await checkInsRepository.create({
				user_id: "user-01",
				gym_id: `gym-${i}`,
			});
		}

		const { checkIns } = await sut.execute({
			userId: "user-01",
			page: 2,
		});

		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({
				gym_id: "gym-21",
			}),
			expect.objectContaining({
				gym_id: "gym-22",
			}),
		]);
	});
});
