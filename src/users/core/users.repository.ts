import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Users } from '../entities/users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  private models;
  constructor(@Inject('SEQUELIZE') private database: DatabaseService) {
    this.models = this.database.getModels();
  }

  async findOneById(id: number): Promise<Users | null> {
    try {
      const user = await this.models.Users.findByPk(id);
      return user;
    } catch (error) {
      throw new Error(`Error in finding user ${error}`);
    }
  }

  async createUser(user: CreateUserDto): Promise<Users | null> {
    try {
      const createdUser = await this.models.Users.create({
        username: user.username,
        email: user.email,
        hash: user.hash,
      });
      return createdUser;
    } catch (error) {
      throw new Error(`Error in creating user ${error}`);
    }
  }

  async updateUser(user: UpdateUserDto, id: number): Promise<Users | null> {
    try {
      const [rowCount, [updatedUser]] = await this.models.Users.update(
        {
          username: user.username,
        },
        {
          where: {
            id: id,
          },
          returning: true,
        },
      );
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user ${error}`);
    }
  }

  async deleteUser(id: number): Promise<boolean | null> {
    try {
      const deletedUser = await this.models.Users.destroy({
        where: {
          id: id,
        },
      });
      if (deletedUser) return true;
    } catch (error) {
      throw new Error(`Error in deleting user ${error}`);
    }
  }

  async checkUniqueEmail(email: string): Promise<boolean | null> {
    try {
      const existingEmail = await this.models.Users.findOne({
        where: {
          email: email,
        },
      });
      return existingEmail;
    } catch (error) {
      throw new Error(`Error checking email ${error}`);
    }
  }

  async findByEmail(email: string): Promise<Users | null> {
    try {
      const user = await this.models.Users.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Error finding user ${error}`);
    }
  }
}
