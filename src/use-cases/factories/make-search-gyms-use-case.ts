import { SearchGymUseCase } from "../search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	const searchGymsUseCase = new SearchGymUseCase(gymsRepository);

	return searchGymsUseCase;
}
