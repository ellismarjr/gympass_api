import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
	private users: User[] = [];

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			created_at: new Date(),
		};

		this.users.push(user);
		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email);

		return user || null;
	}

	async findById(userId: string): Promise<User | null> {
		const user = this.users.find((user) => user.id === userId);

		return user || null;
	}
}
