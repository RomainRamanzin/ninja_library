const { connectDB, disconnectDB } = require('../config/db.config');
const Ninja = require('../models/ninja.model');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Ninja Model', () => {
    it('should create a new ninja', async () => {
        const ninjaData = {
            name: 'Naruto',
            rank: 'Genin',
            jutsus_maitrises: ['Rasengan'],
            clan: 'Uzumaki',
            specialite: 'Ninjutsu',
        };

        const ninja = await Ninja.create(ninjaData);
        expect(ninja.name).toBe(ninjaData.name);
        expect(ninja.rank).toBe(ninjaData.rank);
        expect(ninja.jutsus_maitrises).toContain(ninjaData.jutsus_maitrises[0]);
    });

    it('should not create a ninja without a name', async () => {
        const ninjaData = {
            rank: 'Genin',
            jutsus_maitrises: ['Rasengan'],
            clan: 'Uzumaki',
            specialite: 'Ninjutsu',
        };

        await expect(Ninja.create(ninjaData)).rejects.toThrow();
    });
});
