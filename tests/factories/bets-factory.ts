import { faker } from '@faker-js/faker';
import {prisma} from "../../src/database/database"

export function createBet(gameId: number, participantId: number, amountBet: number){
    return {
        gameId,
        participantId,
        amountBet,
        homeTeamScore: faker.number.int({min: 0, max: 10}),
        awayTeamScore: faker.number.int({min: 0, max: 10})
    }
}

export async function addBet(gameId: number, participantId: number, amountBet: number) {
    return await prisma.bet.create({
      data: {
        gameId,
        participantId,
        amountBet,
        homeTeamScore: faker.number.int({min: 0, max: 10}),
        awayTeamScore: faker.number.int({min: 0, max: 10})
      },
    });
  }