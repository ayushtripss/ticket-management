import { Injectable } from "@nestjs/common";
import { Redis } from "ioredis";
import { redisConfig } from "./redisconfig";

@Injectable()
export class RedisService {
    private instance: Redis;

    async getRedisInstance() {
        this.instance = new Redis(redisConfig)
    }

    async set(id: number, otp: number): Promise<boolean> {
        try {
            await this.instance.set(id.toString(), otp, 'EX', 20);
            return true;
        } catch (error) {
            throw new Error('Error in setting otp')
        }
    }

    async get(id: number, otp: number): Promise<string> {
        try {
            const otpfromstorage = await this.instance.get(id.toString());
            return otpfromstorage;
        } catch {
            throw new Error('Error in checking otp')
        }
    }

    async increase(id: number) {
        try {
            await this.instance.incr(`attempsts_for_${id.toString()}`);
            const attempts = await this.instance.get(`attempsts_for_${id.toString()}`)
            if (Number(attempts) >= 5) {
                await this.instance.set(`is_user_blocked${id.toString()}`, 1, 'EX', 60);
            }
        } catch {
            throw new Error(`Error in increasing attempts`);
        }
    }

    async checkBlocked(id: number): Promise<Number> {
        try {
            const isBlocked = await this.instance.get(`is_user_blocked${id.toString()}`);
            return Number(isBlocked);
        } catch {
            throw new Error(`Error in getting attempts`);
        }
    }
}