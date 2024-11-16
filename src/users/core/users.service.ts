import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Users } from '../entities/users.model';
import { UsersRepository } from './users.repository';
import { UserSchema } from '../schema/users.schema';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthServices } from 'src/auth/core/auth.service';
import { SessionSchema } from 'src/auth/schema/session.schema';
import { LoginUserDto } from '../dto/login-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { OtpSchema } from '../schema/otp.schema';
import { TicketsServices } from 'src/tickets/tickets.services';
import { Tickets } from 'src/tickets/tickets.model';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly authServices: AuthServices,
    private readonly ticketServices: TicketsServices,
    @Inject('REDIS') private redisService: RedisService,
  ) {}

  async getOne(id: number): Promise<UserSchema | null> {
    try {
      const user = await this.userRepository.findOneById(id);
      const userdto = this.convertUserToDto(user);
      return userdto;
    } catch (error) {
      throw new Error(`Error in founding user ${error}`);
    }
  }

  async create(user: CreateUserDto): Promise<UserSchema | null> {
    try {
      const existingEmail = await this.userRepository.checkUniqueEmail(
        user.email,
      );
      if (!existingEmail) {
        const newUser = await this.userRepository.createUser(user);
        const newUserdto = this.convertUserToDto(newUser);
        return newUserdto;
      }
    } catch (error) {
      throw new Error(`Error in creating user ${error}`);
    }
  }

  async update(user: UpdateUserDto, id: number): Promise<UserSchema | null> {
    try {
      const updatedUser = await this.userRepository.updateUser(user, id);
      const updatedUserdto = this.convertUserToDto(updatedUser);
      return updatedUserdto;
    } catch (error) {
      throw new Error(`Error in updaing user ${error}`);
    }
  }

  async delete(id: number): Promise<boolean | null> {
    try {
      const deleted = await this.userRepository.deleteUser(id);
      return deleted;
    } catch (error) {
      throw new Error(`Error in deleting user ${error}`);
    }
  }

  async findAllTickets(id: number): Promise<Tickets[] | null> {
    try {
      const allTickets = await this.ticketServices.findAllTicketsForUser(id);
      return allTickets;
    } catch (error) {
      throw new Error(`Error in finding tickets`);
    }
  }

  async login(user: LoginUserDto): Promise<OtpSchema | null> {
    try {
      const userInfo = await this.userRepository.findByEmail(user.email);
      const isBlocked = await this.redisService.checkBlocked(userInfo.id);
      if (!isBlocked) {
        const userInfoDto = this.convertUserToDto(userInfo);
        if (user.hash == userInfo.hash) {
          const otp = this.generateOtp();
          await this.redisService.set(userInfo.id, otp);
          const obj = { id: userInfoDto.id, otp };
          return obj;
        } else {
          await this.redisService.increase(userInfo.id);
        }
      } else {
        throw new Error(`Limit exceeded`);
      }
    } catch (error) {
      throw new Error(`Error in sending otp ${error}`);
    }
  }

  async loginThroughOtp(
    id: number,
    otp: number,
  ): Promise<SessionSchema | null> {
    try {
      const otpverificationsuccess = await this.redisService.get(id, otp);
      if (otpverificationsuccess === String(otp)) {
        await this.logout(id);
        const session = await this.authServices.createSession(id);
        return session;
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      throw new Error(`Error in logging through otp`);
    }
  }

  async logout(userId: number): Promise<boolean | null> {
    try {
      const deletedId = await this.authServices.deleteSession(userId);
      if (deletedId) {
        return true;
      }
    } catch (error) {
      throw new Error(`Error in logging out user`);
    }
  }

  private generateOtp(): number {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
  }
  private convertUserToDto(user: Users): UserSchema {
    const dto: UserSchema = plainToInstance(UserSchema, user.toJSON());
    return dto;
  }
}
