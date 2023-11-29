
import { ICreateClassroomDTO } from "../dtos/ICreateClassroomDTO";
import { Classroom } from "../entities/Classroom";
import { ClassroomServicesValidate } from "../interfaces/IClassroomServicesValidate";
import { inject, injectable } from "tsyringe";
import { IClassroomsRepository } from "../repositories/IClassroomsRepository";

@injectable()
class ClassroomValidateFaculdade implements ClassroomServicesValidate {
    constructor(
        @inject("ClassroomsRepository")
        private classrooomsRepository: IClassroomsRepository
    ){}
    async create({ name, description, professor_id }: ICreateClassroomDTO): Promise<Classroom> {
        const classroom = await this.classrooomsRepository.create({
          name, 
          description,
          professor_id,
        });
    
        return classroom;
      }
}

export { ClassroomValidateFaculdade };
