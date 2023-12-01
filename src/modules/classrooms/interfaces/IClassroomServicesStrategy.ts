import { ICreateClassroomDTO } from "../dtos/ICreateClassroomDTO";
import { Classroom } from "../entities/Classroom";

export interface IClassroomServicesStrategy{
    create(data:ICreateClassroomDTO): Promise<Classroom>
}