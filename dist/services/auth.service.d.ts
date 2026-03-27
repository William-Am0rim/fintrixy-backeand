export interface UserResponse {
    id: string;
    name: string;
    email: string;
    image?: string | null;
}
export interface AuthResponse {
    user: UserResponse;
    token: string;
}
export declare class AuthService {
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<AuthResponse>;
    login(data: {
        email: string;
        password: string;
    }): Promise<AuthResponse>;
    getProfile(userId: string): Promise<UserResponse>;
    updateProfile(userId: string, data: {
        name?: string;
        image?: string | null;
    }): Promise<UserResponse>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    private generateToken;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map