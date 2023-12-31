import { Repository } from "typeorm";

import { User } from "../../entities/User";
import { AppDataSource } from "../../../../database/data-source";
import { IUsersRepository } from "../IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    id,
    fullname,
    password,
    email,
    gender,
    role,
    registration,
  }: ICreateUserDTO): Promise<void> {

    const user = this.repository.create({
      id,
      fullname,
      password,
      email,
      gender,
      role,
      registration,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findByRegistration(registration: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ registration });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }
  
}

export { UsersRepository };