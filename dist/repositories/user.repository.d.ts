import { User } from "@prisma/client";
export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    image?: string | null;
}
export interface UpdateUserData {
    name?: string;
    image?: string | null;
}
export declare class UserRepository {
    findById(id: string): Promise<Partial<User> | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: CreateUserData): Promise<Partial<User>>;
    update(id: string, data: UpdateUserData): Promise<Partial<User>>;
    delete(id: string): Promise<User>;
}
export declare const userRepository: UserRepository;
//# sourceMappingURL=user.repository.d.ts.map