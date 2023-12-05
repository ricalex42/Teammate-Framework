import {Request, Response} from "express";
import {container} from "tsyringe";
import { HomeworkValidateFaculdade } from "../services/HomeworkValidateFaculdade";
import {HomeworkService} from "../services/HomeworkService";

class HomeworkController{
    async create(request: Request, response: Response): Promise<Response>{
        const {name} = request.body;
        const {details} = request.body;
        const {id: homework_id} = request.params;
        const {id: creator_id} = request.user;

        const homeworkService = container.resolve(HomeworkValidateFaculdade);

        const homework = await homeworkService.create({
            name,
            details,
            creator_id,
        });

        return response.status(201).json(homework)
    }

    async assign(request: Request, response: Response): Promise<Response>{
        const {name} = request.body;
        const {id: team_id} = request.body;

        const homeworkService = container.resolve(HomeworkValidateFaculdade);

        const homework = await homeworkService.assign({
            name,
            team_id,
        });

        return response.json(homework)
    }

    async giveFeedback(request: Request, response: Response): Promise<Response>{
        const {name} = request.body;
        const {id: team_id} = request.body;
        const {feedback} = request.body;

        const homeworkService = container.resolve(HomeworkValidateFaculdade);

        const homework = await homeworkService.giveFeedback({
            name,
            team_id,
            feedback,
        });

        return response.json(homework)
    }
}