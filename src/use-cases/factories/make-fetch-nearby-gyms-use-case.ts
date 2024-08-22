import { PrismaGymsRepository } from "@/repositories/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository);

	return fetchNearbyGymsUseCase;
}
