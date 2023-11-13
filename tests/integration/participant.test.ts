import httpStatus from 'http-status';
import supertest from 'supertest';
import app, { init } from '../../src/app';
import { cleanDb } from '../helpers/helpers';
import { createParticipant, addParticipant } from '../factories/participants-factory';

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});


describe("POST /participants", () => {
    it("should return 400 when body is with invalid format",async ()=>{
        const response = await server.post("/participants").send({})
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    })

    it("should return 400 when balance is not suficient",async ()=>{
        const response = await server.post("/participants").send(createParticipant(false))
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    })

    it("should return 201 when body is valid",async ()=>{
        await addParticipant()
        const response = await server.post("/participants").send(createParticipant(true))
        
        expect(response.status).toBe(httpStatus.CREATED)
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            name: expect.any(String),
            balance: expect.any(Number),
        }))
    })
});


describe("GET /participants", () => {

    it("should return 404 when array is empty", async ()=>{
        const response = await server.get("/participants").send([])
        expect(response.status).toBe(httpStatus.NOT_FOUND);
    })

    it("should return 200 with all participants",async ()=>{
        await addParticipant()
        const response = await server.get("/participants")
        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                balance: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
        ]))
    })
});
