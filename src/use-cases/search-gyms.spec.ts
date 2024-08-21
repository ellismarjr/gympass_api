import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { SearchGymUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Fetch User CheckIns History Use Case", () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new SearchGymUseCase(gymsRepository);

		await gymsRepository.create({
			id: "gym-01",
			title: "Academia 01",
			description: "",
			phone: "",
			latitude: new Decimal(0),
			longitude: new Decimal(0),
		});
	});

	it("should be able to check in history", async () => {
		await gymsRepository.create({
			id: "gym-1",
			title: "Academy 1",
			description: "",
			phone: "",
			latitude: new Decimal(0),
			longitude: new Decimal(0),
		});

		await gymsRepository.create({
			title: "Academy 2",
			description: "",
			phone: "",
			latitude: new Decimal(0),
			longitude: new Decimal(0),
		});

		const { gyms } = await sut.execute({
			query: "Academy 1",
			page: 1,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({
				title: "Academy 1",
			}),
		]);
	});

	it("should be able to fetch paginated gym search", async () => {
		for (let i = 1; i <= 22; i++) {
			await gymsRepository.create({
				title: `Academy ${i}`,
				description: "",
				phone: "",
				latitude: new Decimal(0),
				longitude: new Decimal(0),
			});
		}

		const { gyms } = await sut.execute({
			query: "Academy",
			page: 2,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({
				title: "Academy 21",
			}),
			expect.objectContaining({
				title: "Academy 22",
			}),
		]);
	});
});
