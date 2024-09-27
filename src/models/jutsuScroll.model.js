const mongoose = require('mongoose');

// Définition du schéma JutsuScroll
const JutsuScrollSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom du jutsu est obligatoire'],
        unique: true,
        minlength: [3, 'Le nom doit avoir au moins 3 caractères'],
        maxlength: [100, 'Le nom ne doit pas dépasser 100 caractères'],
    },
    creator: {
        type: String,
        required: [true, 'Le créateur du jutsu est obligatoire'],
    },
    rank: {
        type: String,
        enum: ['D', 'C', 'B', 'A', 'S'],
        required: [true, 'Le rang du jutsu est obligatoire'],
    },
    quantity: {
        type: Number,
        required: [true, 'La quantité disponible est obligatoire'],
        min: [1, 'Il doit y avoir au moins une copie du rouleau'],
    },
    description: {
        type: String,
        maxlength: [500, 'La description ne doit pas dépasser 500 caractères'],
    },
    category: {
        type: String,
        enum: ['Ninjutsu', 'Taijutsu', 'Genjutsu', 'Fuinjutsu', 'Kinjutsu'],
        required: [true, 'La catégorie du jutsu est obligatoire'],
    },
    associatedTechniques: {
        type: [String],
        required: [true, 'Les techniques associées sont obligatoires'],
        validate: {
            validator: function (techniques) {
                return techniques.length > 0;
            },
            message: 'Il doit y avoir au moins une technique associée',
        },
    },
}, { timestamps: true });

// Index composé pour les requêtes fréquentes de filtrage et de tri
JutsuScrollSchema.index({ rank: 1, category: 1 });

// Index textuel pour la recherche par nom et description
JutsuScrollSchema.index({ name: 'text', description: 'text' });

// Export du modèle
module.exports = mongoose.model('JutsuScroll', JutsuScrollSchema);