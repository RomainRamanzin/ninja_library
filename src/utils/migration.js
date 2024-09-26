const mongoose = require('mongoose');
const connectDB = require('../config/db.config');
const JutsuScroll = require('../models/jutsuScroll.model');
const Ninja = require('../models/ninja.model');
const Borrow = require('../models/borrow.model');

const seedData = async () => {
    try {
        await connectDB();

        console.log(`Connecté à la base de données : ${mongoose.connection.db.databaseName}`);
        console.log(`Utilisation de la collection : ${JutsuScroll.collection.name}`);

        // Nettoyer les collections
        await JutsuScroll.deleteMany({});
        await Ninja.deleteMany({});
        await Borrow.deleteMany({});


        // Création d'un ninja
        const ninja = await Ninja.create({
            name: 'Naruto Uzumaki',
            rank: 'Chunin',
            jutsus_maitrises: ['Rasengan', 'Wind Release', 'Chakra Control'],
            clan: 'Uzumaki',
            specialite: 'Ninjutsu',
        });

        console.log('Ninja créé avec succès.');

        // Création de quelques rouleaux de jutsu
        const jutsuScrolls = await JutsuScroll.create([
            {
                name: 'Rasengan Avancé',
                creator: 'Jiraiya',
                rank: 'A',
                quantity: 3,
                description: 'Version améliorée du Rasengan',
                category: 'Ninjutsu',
                associatedTechniques: ['Rasengan', 'Chakra Control'],
            },
            {
                name: 'Technique du Multi-clonage',
                creator: 'Tobirama Senju',
                rank: 'B',
                quantity: 5,
                description: 'Crée de multiples clones solides',
                category: 'Ninjutsu',
                associatedTechniques: ['Clone', 'Chakra Control'],
            },
        ]);

        console.log('Rouleaux de jutsu créés avec succès.');

        console.log(ninja._id);

        // Création des emprunts
        const borrows = await Borrow.create([
            {
                ninjaId: ninja._id,
                jutsuScrollId: jutsuScrolls[0]._id,
                returnDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours à partir de maintenant
                status: 'borrowed',
                notes: 'Emprunt pour améliorer le Rasengan',
            },
            {
                ninjaId: ninja._id,
                jutsuScrollId: jutsuScrolls[1]._id,
                returnDueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 jours à partir de maintenant
                status: 'borrowed',
                notes: 'Apprentissage de la technique de clonage avancée',
            },
        ]);

        console.log('Emprunts créés avec succès.');

        // Optionnel : Vider la collection existante
        // await JutsuScroll.deleteMany({});

        // Insérer les nouvelles données
        // await JutsuScroll.insertMany(scrolls);
        // console.log('Données de test insérées avec succès.');

    } catch (error) {
        console.error('Erreur lors de la migration : ', error);
    } finally {
        await mongoose.connection.close();
        console.log('Connexion à la base de données fermée.');
    }
};

seedData();