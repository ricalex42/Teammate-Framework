import { ICreateHomeworkDTO } from "../dtos/ICreateHomeworkDTO";
import { Homework } from "../entities/Homework";
import { IHomeworkServiceStrategy } from "../interfaces/IHomeworkServiceStrategy";
import { inject, injectable } from "tsyringe";
import { AppError } from '../../../shared/errors/AppError';
import { IHomeworkRepository } from "../repositories/IHomeworkRepository";
import { IClassroomTeamsRepository } from "../../classrooms/repositories/IClassroomTeamsRepository";
import {IRequestAssignHomework} from "../interfaces/IRequestAssignHomework";
import {IRequestGiveFeedbackHomework} from "../interfaces/IRequestGiveFeedbackHomework";

@injectable()
class HomeworkValidateFaculdade{
    constructor(
        @inject('HomeworkRepository')
        private homeworkRepository: IHomeworkRepository,
        @inject('ClassroomTeamsRepository')
        private classroomTeamsRepository: IClassroomTeamsRepository,
    ){}

    async create({name, details, creator_id}: ICreateHomeworkDTO): Promise<Homework>{
        const homework: Homework = await this.homeworkRepository.create({
            name,
            details,
            creator_id
        });

        return homework;
    }

    async assign({name, team_id}: IRequestAssignHomework): Promise<Homework>{
        const homeworkTemplate = await this.homeworkRepository.findByName(name);
        
        if (!homeworkTemplate){
            throw new AppError('Homework not found!', 404);
        }
        const team = await this.classroomTeamsRepository.findById(team_id);

        if (!team){
            throw new AppError('Team not found!', 404);
        }

        const createdHomework: ICreateHomeworkDTO = {
            name: homeworkTemplate.name,
            details: homeworkTemplate.details,
            creator_id: homeworkTemplate.creator_id 
        };

        const assignedHomework = await this.create(createdHomework);
        assignedHomework.team_id = team_id;
        return assignedHomework;
    }

    async giveFeedback({name, team_id, feedback}: IRequestGiveFeedbackHomework): Promise<Homework>{
        const homeWork = await this.homeworkRepository.findByName(name);
        
        if (!homeWork){
            throw new AppError('Homework not found!', 404);
        }
        const team = await this.classroomTeamsRepository.findById(team_id);

        if (!team){
            throw new AppError('Team not found!', 404);
        }

        homeWork.feedback = feedback
        return homeWork;
    }
}

export{HomeworkValidateFaculdade};