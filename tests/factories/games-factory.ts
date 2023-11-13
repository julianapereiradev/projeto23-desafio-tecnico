import { faker } from '@faker-js/faker';
import {prisma} from "../../src/database/database"

export function createGame(){
    return {
        homeTeamName: faker.person.firstName(),
        awayTeamName: faker.person.lastName()
    }
}

export async function addGame(){
    return await prisma.game.create({
        data: createGame()
    })
}

export async function addFinishedGame(){
    return await prisma.game.create({
        data: {...createGame(), isFinished: true}
    })
}