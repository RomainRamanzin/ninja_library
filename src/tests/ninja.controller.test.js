const request = require('supertest');
const app = require('../../app');
const { connectDB, disconnectDB } = require('../config/db.memory.config');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Ninja Controller', () => {
    it('should create a new ninja', async () => {
        const response = await request(app)
            .post('/api/v1/ninjas')
            .send({
                name: 'Sasuke',
                rank: 'Genin',
                jutsus_maitrises: ['Chidori'],
                clan: 'Uchiha',
                specialite: 'Ninjutsu',
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Ninja créé avec succès');
    });

    it('should return 400 if name is missing', async () => {
        const response = await request(app)
            .post('/api/v1/ninjas')
            .send({
                rank: 'Genin',
                jutsus_maitrises: ['Chidori'],
                clan: 'Uchiha',
                specialite: 'Ninjutsu',
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});
