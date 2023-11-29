import { ICreateClassroomDTO } from "../dtos/ICreateClassroomDTO";
import { Classroom } from "../entities/Classroom";

export interface ClassroomServicesValidate{
    create(data:ICreateClassroomDTO): Promise<Classroom>
}