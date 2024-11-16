import { Exclude } from "class-transformer";

export class SessionSchema {
    token: string;
    userId: number;
    @Exclude()
    id: number;
} 