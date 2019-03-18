
export interface JwtPayload {
    subjectId: string;
    issuedAtMs: number;
    expirationDateMs: number;
}
