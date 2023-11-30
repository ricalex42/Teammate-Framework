import { inject, injectable } from 'tsyringe';
import { IClassroomTeamsRepository } from '../repositories/IClassroomTeamsRepository';
import { IUsersRepository } from '../../accounts/repositories/IUsersRepository';
import { IRequestJoinClassroomTeam } from '../interfaces/IRequestJoinClassroomTeam';
import { AppError } from '../../../shared/errors/AppError';
import { ClassroomTeamServiceStrategy } from '../interfaces/IClassRoomTeamServicesStrategy';
import { ClassroomTeam } from '../entities/ClassroomTeam';
import { ICreateClassroomTeamDTO } from '../dtos/ICreateClassroomTeamDTO';

@injectable()
class ClassroomTeamService {
  private classroomTeamValidator: ClassroomTeamServiceStrategy;

  constructor(
    @inject('ClassroomTeamsRepository')
    private classroomTeamsRepository: IClassroomTeamsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ClassroomTeamServiceStrategy')
    classroomTeamValidator: ClassroomTeamServiceStrategy
  ) {
    this.classroomTeamValidator = classroomTeamValidator;
  }

  async create({ classroom_id, name, creator_id }: ICreateClassroomTeamDTO): Promise<ClassroomTeam> {
    return this.classroomTeamValidator.create({ classroom_id, name, creator_id });
  }

  async join({ user_id, team_id }: IRequestJoinClassroomTeam): Promise<ClassroomTeam> {
    return this.classroomTeamValidator.join({ user_id, team_id });
  }

  async details(id: string): Promise<ClassroomTeam> {
    const classroomTeam = await this.classroomTeamsRepository.findById(id);

    if (!classroomTeam) {
      throw new AppError('Classroom Team not found!', 404);
    }

    return classroomTeam;
  }
}

export { ClassroomTeamService };
