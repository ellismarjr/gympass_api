import { type Gym, Prisma } from "@prisma/client";
import type { GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {
	public gyms: Gym[] = [];

	async findById(id: string): Promise<Gym | null> {
		const gym = this.gyms.find((gym) => gym.id === id);

		return gym || null;
	}

	async create(data: Prisma.GymCreateInput) {
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
		};

		this.gyms.push(gym);
		return gym;
	}
}
