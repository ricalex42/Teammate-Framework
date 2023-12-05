import { inject, injectable } from 'tsyringe';
import {IHomeworkRepository} from "../repositories/IHomeworkRepository";
import {IClassroomTeamsRepository} from "../../classrooms/repositories/IClassroomTeamsRepository";
import {HomeworkValidateFaculdade} from './HomeworkValidateFaculdade';
import {Homework} from '../entities/Homework';
import {IRequestAssignHomework} from "../interfaces/IRequestAssignHomework";
import {ICreateHomeworkDTO} from "../dtos/ICreateHomeworkDTO";
import {IRequestGiveFeedbackHomework} from "../interfaces/IRequestGiveFeedbackHomework";
import { IHomeworkServiceStrategy } from '../interfaces/IHomeworkServiceStrategy';

@injectable()
class HomeworkService{
    constructor(
        @inject('HomeworkRepository')
        private homeworkRepository: IHomeworkRepository,
        @inject('ClassroomTeamsRepository')
        private classroomTeamsRepository: IClassroomTeamsRepository,
        @inject('HomeworkValidateFaculdade')
        private homeworkServiceStrategy: IHomeworkServiceStrategy
    ){ }

    async create({name, details, creator_id}: ICreateHomeworkDTO): Promise<Homework>{
        return await this.homeworkServiceStrategy.create({name, details, creator_id})
    }
    
    async assign({name, team_id}: IRequestAssignHomework): Promise<Homework>{
        return await this.homeworkServiceStrategy.assign({name, team_id});
    }

    async giveFeedback({name, team_id, feedback}: IRequestGiveFeedbackHomework): Promise<Homework>{
        return await this.homeworkServiceStrategy.giveFeedback({name, team_id, feedback})
    }


}

export {HomeworkService};