import { Repository } from "typeorm";

import { Homework } from "../../entities/Homework";
import { ICreateHomeworkDTO } from "../../dtos/ICreateHomeworkDTO";
import { IHomeworkRepository } from "../IHomeworkRepository";
import { AppDataSource } from "../../../../database/data-source";

class HomeworkRepository implements IHomeworkRepository {
  private repository: Repository<Homework>;

  constructor() {
    this.repository = AppDataSource.getRepository(Homework);
  }
  
  async create({ name, details, creator_id }: ICreateHomeworkDTO): Promise<Homework> {
    const homework= this.repository.create({
      name,
      details,
      creator_id,
    });

    await this.repository.save(homework);

    return homework
  }

  async findByName(name: string): Promise<Homework | null> {
    const homework = this.repository.findOneBy({ name });
    return homework;
  }
}

export { HomeworkRepository };