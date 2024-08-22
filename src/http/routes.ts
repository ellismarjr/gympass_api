import type { FastifyInstance } from "fastify";
import { userRegister } from "./controllers/users/users-register";
import { authenticate } from "./controllers/auth/authenticate";
import { profile } from "./controllers/profile/profile";
import { verifyJwt } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", userRegister);
	app.post("/sessions", authenticate);

	// Private routes
	app.get("/me", { onRequest: [verifyJwt] }, profile);
}
