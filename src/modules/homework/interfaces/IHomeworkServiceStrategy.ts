import { ICreateHomeworkDTO } from '../dtos/ICreateHomeworkDTO';
import { Homework } from '../entities/Homework';
import { IRequestAssignHomework } from './IRequestAssignHomework';
import { IRequestGiveFeedbackHomework } from './IRequestGiveFeedbackHomework';

export interface IHomeworkServiceStrategy {
  create(data: ICreateHomeworkDTO): Promise<Homework>;
  assign(data: IRequestAssignHomework): Promise<Homework>;
  giveFeedback(data: IRequestGiveFeedbackHomework): Promise<Homework>;
}