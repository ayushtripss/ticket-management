import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserSchema } from '../schema/users.schema';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { SessionSchema } from 'src/auth/schema/session.schema';
import { OtpSchema } from '../schema/otp.schema';
import { Tickets } from 'src/tickets/tickets.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserSchema | null> {
    try {
      const user = await this.usersService.getOne(id);
      return user;
    } catch (error) {
      throw new Error(`Error in finding user${error}`);
    }
  }

  @Post('register')
  async createUser(@Body() user: CreateUserDto): Promise<UserSchema | null> {
    try {
      const newUser = await this.usersService.create(user);
      return newUser;
    } catch (error) {
      throw new Error(`Error in creating user ${error}`);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UserSchema | null> {
    try {
      const updatedUser = await this.usersService.update(user, id);
      return updatedUser;
    } catch (error) {
      throw new Error(`error in updating user ${error}`);
    }
  }

  @Delete('id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean | null> {
    try {
      const deleted = await this.usersService.delete(id);
      return deleted;
    } catch (error) {
      throw new Error(`Error in deleting user${error}`);
    }
  }

  @Get('all/:id')
  async getAllTickets(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Tickets[] | null> {
    try {
      const allTickets = await this.usersService.findAllTickets(id);
      return allTickets;
    } catch {
      throw new Error('Error in finding tickets');
    }
  }

  @Post('login')
  async loginUser(@Body() user: LoginUserDto): Promise<OtpSchema | null> {
    try {
      const info = await this.usersService.login(user);
      return info;
    } catch (error) {
      throw new Error(`Error in logging in user ${error}`);
    }
  }

  @Post('login/:id')
  async loginThroughOtp(
    @Body() logininfo: OtpSchema,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SessionSchema | null> {
    try {
      const session = await this.usersService.loginThroughOtp(
        id,
        logininfo.otp,
      );
      return session;
    } catch (error) {
      throw new Error(`Error in logging`);
    }
  }

  @Put('logout/:id')
  async logoutUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean | null> {
    try {
      const logout = await this.usersService.logout(id);
      if (logout) return logout;
    } catch (error) {
      throw new Error(`Error in logging out user`);
    }
  }
}
