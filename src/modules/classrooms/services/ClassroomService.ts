import { inject, injectable } from "tsyringe";

import { ICreateClassroomDTO } from "../dtos/ICreateClassroomDTO";
import { IClassroomsRepository } from "../repositories/IClassroomsRepository";
import { Classroom } from "../entities/Classroom";
import { IRequestJoinClassroom } from "../interfaces/IRequestJoinClassroom";
import { AppError } from "../../../shared/errors/AppError";
import { IUsersRepository } from "../../accounts/repositories/IUsersRepository";
import { IClassroomServicesStrategy } from "../interfaces/IClassroomServicesStrategy";
import {ClassroomValidateFaculdade} from '../services/ClassroomValidateFaculdade'


@injectable()
class ClassroomService{
  constructor(
    @inject("ClassroomsRepository")
    private classrooomsRepository: IClassroomsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ClassroomValidateFaculdade")
    private createClassroomServicesStrategy: IClassroomServicesStrategy
  ) {}
  
  async create({ name, description, professor_id }: ICreateClassroomDTO): Promise<Classroom> {
    return this.createClassroomServicesStrategy.create({ name, description, professor_id });
  }

  async join({ classroom_id, user_id }: IRequestJoinClassroom): Promise<Classroom> {
    const classroom = await this.classrooomsRepository.findById(classroom_id);

    if (!classroom) {
      throw new AppError("Classroom not found!", 404);
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    classroom.members.push(user);

    await this.classrooomsRepository.create(classroom);

    return classroom;
  }

  async details(id: string): Promise<Classroom> {
    const classroom = await this.classrooomsRepository.findById(id);

    if (!classroom) {
      throw new AppError("Classroom not found!", 404);
    }

    return classroom;
  }
}

export { ClassroomService };