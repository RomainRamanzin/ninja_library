const request = require('supertest');
const app = require('../../app');

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
    });

    it('should return 500 if name is missing', async () => {
        const response = await request(app)
            .post('/api/v1/ninjas')
            .send({
                rank: 'Genin',
                jutsus_maitrises: ['Chidori'],
                clan: 'Uchiha',
                specialite: 'Ninjutsu',
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Erreur lors de la création du ninja');
        expect(response.body.error).toBeDefined();
    });
});
