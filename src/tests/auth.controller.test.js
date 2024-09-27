const request = require('supertest');
const app = require('../../app');
const User = require('../models/user.model');

describe('Auth Controller', () => {
    // Test d'inscription
    describe('POST /api/v1/auth/register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    username: 'testuser',
                    password: 'testpassword',
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Utilisateur créé avec succès');

            // Vérifiez que l'utilisateur a été créé dans la base de données
            const user = await User.findOne({ username: 'testuser' });
            expect(user).toBeTruthy();
        });

        it('should return 500 if username is missing', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    password: 'testpassword',
                });

            expect(response.status).toBe(500);
            expect(response.body.message).toBeDefined();
        });
    });

    // Test de connexion
    describe('POST /api/v1/auth/login', () => {
        it('should login an existing user', async () => {
            // Assurez-vous que l'utilisateur existe avant de tester la connexion
            await request(app)
                .post('/api/v1/auth/register')
                .send({
                    username: 'testuser2',
                    password: 'testpassword',
                });

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    username: 'testuser2',
                    password: 'testpassword',
                });

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        });

        it('should return 401 if username is incorrect', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    username: 'wronguser',
                    password: 'testpassword',
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Nom d\'utilisateur ou mot de passe incorrect');
        });

        it('should return 401 if password is incorrect', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    username: 'testuser2',
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Nom d\'utilisateur ou mot de passe incorrect');
        });
    });
});
