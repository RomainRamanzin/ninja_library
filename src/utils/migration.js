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


        // Création de plusieurs ninjas
        const ninjas = await Ninja.create([
            {
                name: 'Naruto Uzumaki',
                rank: 'Chunin',
                jutsus_maitrises: ['Rasengan', 'Wind Release', 'Chakra Control'],
                clan: 'Uzumaki',
                specialite: 'Ninjutsu',
            },
            {
                name: 'Sasuke Uchiha',
                rank: 'Jonin',
                jutsus_maitrises: ['Chidori', 'Fire Release', 'Sharingan'],
                clan: 'Uchiha',
                specialite: 'Genjutsu',
            },
            {
                name: 'Sakura Haruno',
                rank: 'Chunin',
                jutsus_maitrises: ['Chakra Enhanced Strength', 'Medical Ninjutsu', 'Genjutsu Release'],
                clan: 'Haruno',
                specialite: 'Medical Ninjutsu',
            },
            {
                name: 'Kakashi Hatake',
                rank: 'Jonin',
                jutsus_maitrises: ['Chidori', 'Sharingan', 'Lightning Release'],
                clan: 'Hatake',
                specialite: 'Ninjutsu',
            },
            {
                name: 'Hinata Hyuga',
                rank: 'Chunin',
                jutsus_maitrises: ['Byakugan', 'Gentle Fist', 'Twin Lion Fists'],
                clan: 'Hyuga',
                specialite: 'Taijutsu',
            },
            {
                name: 'Shikamaru Nara',
                rank: 'Jonin',
                jutsus_maitrises: ['Shadow Possession', 'Shadow Stitching', 'Shadow Strangle'],
                clan: 'Nara',
                specialite: 'Stratégie',
            },
            {
                name: 'Ino Yamanaka',
                rank: 'Chunin',
                jutsus_maitrises: ['Mind Transfer', 'Mind Destruction', 'Sensory Perception'],
                clan: 'Yamanaka',
                specialite: 'Espionnage',
            },
            {
                name: 'Choji Akimichi',
                rank: 'Chunin',
                jutsus_maitrises: ['Expansion Jutsu', 'Human Boulder', 'Butterfly Mode'],
                clan: 'Akimichi',
                specialite: 'Taijutsu',
            },
            {
                name: 'Rock Lee',
                rank: 'Jonin',
                jutsus_maitrises: ['Eight Gates', 'Drunken Fist', 'Strong Fist'],
                clan: 'Yamanaka',
                specialite: 'Taijutsu',
            },
            {
                name: 'Neji Hyuga',
                rank: 'Jonin',
                jutsus_maitrises: ['Byakugan', 'Eight Trigrams Palms', 'Rotation'],
                clan: 'Hyuga',
                specialite: 'Taijutsu',
            },
            {
                name: 'Tenten',
                rank: 'Chunin',
                jutsus_maitrises: ['Rising Twin Dragons', 'Weapon Summoning', 'Sealing Techniques'],
                clan: 'Yamanaka',
                specialite: 'Bukijutsu',
            },
            {
                name: 'Gaara',
                rank: 'Kage',
                jutsus_maitrises: ['Sand Control', 'Sand Shield', 'Desert Suspension'],
                clan: 'Yamanaka',
                specialite: 'Ninjutsu',
            },
            {
                name: 'Temari',
                rank: 'Jonin',
                jutsus_maitrises: ['Wind Release', 'Summoning Jutsu', 'Cyclone Scythe'],
                clan: 'Yamanaka',
                specialite: 'Ninjutsu',
            },
            {
                name: 'Kankuro',
                rank: 'Jonin',
                jutsus_maitrises: ['Puppet Technique', 'Poison Mist', 'Black Secret Technique'],
                clan: 'Yamanaka',
                specialite: 'Marionnettiste',
            },
            {
                name: 'Shino Aburame',
                rank: 'Chunin',
                jutsus_maitrises: ['Insect Clone', 'Parasitic Insects', 'Insect Jamming Technique'],
                clan: 'Aburame',
                specialite: 'Ninjutsu',
            },
        ]);

        console.log('Ninjas créés avec succès.');

        // Création de plusieurs rouleaux de jutsu
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
            {
                name: 'Chidori Perfectionné',
                creator: 'Kakashi Hatake',
                rank: 'S',
                quantity: 2,
                description: 'Version améliorée du Chidori avec une puissance dévastatrice',
                category: 'Ninjutsu',
                associatedTechniques: ['Lightning Release', 'Chakra Control'],
            },
            {
                name: 'Technique de Scellement des Cinq Éléments',
                creator: 'Hiruzen Sarutobi',
                rank: 'S',
                quantity: 1,
                description: 'Scelle les cinq éléments pour créer une barrière puissante',
                category: 'Fuinjutsu',
                associatedTechniques: ['Sealing Techniques', 'Elemental Manipulation'],
            },
            {
                name: 'Byakugan Éveillé',
                creator: 'Clan Hyuga',
                rank: 'A',
                quantity: 4,
                description: 'Améliore les capacités du Byakugan',
                category: 'Ninjutsu',
                associatedTechniques: ['Byakugan', 'Chakra Control'],
            },
            {
                name: 'Art Sage des Crapauds',
                creator: 'Grand Sage Crapaud',
                rank: 'S',
                quantity: 1,
                description: 'Enseigne les bases pour maîtriser le Mode Sage des Crapauds',
                category: 'Ninjutsu',
                associatedTechniques: ['Nature Energy', 'Summoning Jutsu'],
            },
            {
                name: 'Technique de l\'Expansion Corporelle',
                creator: 'Clan Akimichi',
                rank: 'C',
                quantity: 6,
                description: 'Permet d\'agrandir diverses parties du corps',
                category: 'Ninjutsu',
                associatedTechniques: ['Body Expansion', 'Chakra Control'],
            },
            {
                name: 'Marionnettes Humaines',
                creator: 'Sasori',
                rank: 'A',
                quantity: 2,
                description: 'Technique avancée pour transformer des humains en marionnettes',
                category: 'Ninjutsu',
                associatedTechniques: ['Puppet Technique', 'Human Puppet'],
            },
            {
                name: 'Genjutsu Suprême',
                creator: 'Kurenai Yuhi',
                rank: 'A',
                quantity: 3,
                description: 'Techniques avancées de genjutsu pour créer des illusions complexes',
                category: 'Genjutsu',
                associatedTechniques: ['Illusion Technique', 'Mind Affecting'],
            },
            {
                name: 'Technique de Résurrection Impure',
                creator: 'Tobirama Senju',
                rank: 'S',
                quantity: 1,
                description: 'Jutsu interdit permettant de ressusciter les morts',
                category: 'Kinjutsu',
                associatedTechniques: ['Summoning', 'Soul Manipulation'],
            },
        ]);

        console.log('Rouleaux de jutsu créés avec succès.');

        // Création des emprunts
        const borrows = await Borrow.create([
            {
                ninjaId: ninjas[0]._id, // Naruto
                jutsuScrollId: jutsuScrolls[0]._id, // Rasengan Avancé
                returnDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Emprunt pour améliorer le Rasengan',
            },
            {
                ninjaId: ninjas[1]._id, // Sasuke
                jutsuScrollId: jutsuScrolls[2]._id, // Chidori Perfectionné
                returnDueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Perfectionnement du Chidori',
            },
            {
                ninjaId: ninjas[2]._id, // Sakura
                jutsuScrollId: jutsuScrolls[8]._id, // Genjutsu Suprême
                returnDueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Étude des techniques de genjutsu avancées',
            },
            {
                ninjaId: ninjas[3]._id, // Kakashi
                jutsuScrollId: jutsuScrolls[3]._id, // Technique de Scellement des Cinq Éléments
                returnDueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Recherche sur les techniques de scellement avancées',
            },
            {
                ninjaId: ninjas[4]._id, // Hinata
                jutsuScrollId: jutsuScrolls[4]._id, // Byakugan Éveillé
                returnDueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Amélioration des capacités du Byakugan',
            },
            {
                ninjaId: ninjas[5]._id, // Shikamaru
                jutsuScrollId: jutsuScrolls[1]._id, // Technique du Multi-clonage
                returnDueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Étude stratégique des techniques de clonage',
            },
            {
                ninjaId: ninjas[6]._id, // Ino
                jutsuScrollId: jutsuScrolls[8]._id, // Genjutsu Suprême
                returnDueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Perfectionnement des techniques d\'espionnage mental',
            },
            {
                ninjaId: ninjas[7]._id, // Choji
                jutsuScrollId: jutsuScrolls[6]._id, // Technique de l'Expansion Corporelle
                returnDueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Amélioration des techniques du clan Akimichi',
            },
            {
                ninjaId: ninjas[8]._id, // Rock Lee
                jutsuScrollId: jutsuScrolls[5]._id, // Art Sage des Crapauds
                returnDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Tentative d\'apprentissage du Senjutsu',
            },
            {
                ninjaId: ninjas[9]._id, // Neji
                jutsuScrollId: jutsuScrolls[4]._id, // Byakugan Éveillé
                returnDueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Perfectionnement des techniques du clan Hyuga',
            },
            {
                ninjaId: ninjas[10]._id, // Tenten
                jutsuScrollId: jutsuScrolls[7]._id, // Marionnettes Humaines
                returnDueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Étude des techniques de manipulation à distance',
            },
            {
                ninjaId: ninjas[11]._id, // Gaara
                jutsuScrollId: jutsuScrolls[3]._id, // Technique de Scellement des Cinq Él��ments
                returnDueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Recherche sur les techniques de scellement pour Bijuu',
            },
            {
                ninjaId: ninjas[12]._id, // Temari
                jutsuScrollId: jutsuScrolls[1]._id, // Technique du Multi-clonage
                returnDueDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Étude des techniques de clonage pour améliorer les stratégies',
            },
            {
                ninjaId: ninjas[13]._id, // Kankuro
                jutsuScrollId: jutsuScrolls[7]._id, // Marionnettes Humaines
                returnDueDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Perfectionnement des techniques de marionnettiste',
            },
            {
                ninjaId: ninjas[14]._id, // Shino
                jutsuScrollId: jutsuScrolls[6]._id, // Technique de l'Expansion Corporelle
                returnDueDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Étude des techniques de modification corporelle pour les insectes',
            },
            {
                ninjaId: ninjas[0]._id, // Naruto (second emprunt)
                jutsuScrollId: jutsuScrolls[5]._id, // Art Sage des Crapauds
                returnDueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Perfectionnement du Mode Sage',
            },
            {
                ninjaId: ninjas[1]._id, // Sasuke (second emprunt)
                jutsuScrollId: jutsuScrolls[9]._id, // Technique de Résurrection Impure
                returnDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Recherche sur les techniques interdites',
            },
            {
                ninjaId: ninjas[2]._id, // Sakura (second emprunt)
                jutsuScrollId: jutsuScrolls[0]._id, // Rasengan Avancé
                returnDueDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Étude de la manipulation du chakra avancée',
            },
            {
                ninjaId: ninjas[3]._id, // Kakashi (second emprunt)
                jutsuScrollId: jutsuScrolls[8]._id, // Genjutsu Suprême
                returnDueDate: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Amélioration des techniques de genjutsu avec le Sharingan',
            },
            {
                ninjaId: ninjas[4]._id, // Hinata (second emprunt)
                jutsuScrollId: jutsuScrolls[2]._id, // Chidori Perfectionné
                returnDueDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
                status: 'borrowed',
                notes: 'Tentative d\'adaptation du Chidori au style Hyuga',
            },
        ]);

        console.log('Emprunts créés avec succès.');


    } catch (error) {
        console.error('Erreur lors de la migration : ', error);
    } finally {
        await mongoose.connection.close();
        console.log('Connexion à la base de données fermée.');
    }
};

seedData();