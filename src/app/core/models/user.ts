import { Role } from "./role";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    avatarPath?: string;
    role: Role;
}
