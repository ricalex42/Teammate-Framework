import { ICreateClassroomTeamDTO } from '../dtos/ICreateClassroomTeamDTO';
import { ClassroomTeam } from '../entities/ClassroomTeam';
import { IRequestJoinClassroomTeam } from './IRequestJoinClassroomTeam';

export interface ClassroomTeamServiceStrategy {
  create(data: ICreateClassroomTeamDTO): Promise<ClassroomTeam>;
  join(data: IRequestJoinClassroomTeam): Promise<ClassroomTeam>;
}