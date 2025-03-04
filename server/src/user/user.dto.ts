export type CreateUserDto = {
    email: string; // 필수
    password: string; // 필수
    username?: string; // 선택적
};

export type UpdateUserDto = {
    username?: string; // 선택적
    password?: string; // 선택적
};

// 유효성 검증 함수
export function validateCreateUserDto(dto: CreateUserDto): void {
    if (!dto.email) {
        throw new Error("Email is required");
    }
    if (!dto.password) {
        throw new Error("Password is required");
    }
}