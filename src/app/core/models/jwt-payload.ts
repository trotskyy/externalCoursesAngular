import { Role } from ".";

export interface JwtPayload {
    subjectId: string;
    issuedAtMs: number;
    expirationDateMs: number;
    issuer: string;
    audience: string;
    role: Role;
}
