const mongoose = require('mongoose');

// Définition du schéma Ninja
const NinjaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom du ninja est obligatoire'],
        minlength: [3, 'Le nom doit avoir au moins 3 caractères'],
        maxlength: [100, 'Le nom ne doit pas dépasser 100 caractères'],
    },
    rank: {
        type: String,
        enum: ['Genin', 'Chunin', 'Jonin', 'Kage'],
        required: true,
    },
    jutsus_maitrises: {
        type: [String],
        required: true,
        validate: [jutsus => jutsus.length > 0, 'Le ninja doit maîtriser au moins un jutsu'],
    },
    clan: {
        type: String,
        required: [true, 'Le clan est obligatoire'],
    },
    specialite: {
        type: String,
        required: [true, 'La spécialité est obligatoire'],
    },
    borrowHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Borrow',
        },
    ], // Historique des emprunts
}, { timestamps: true });


/* Méthode statique : Trouver les ninjas par rang */
NinjaSchema.statics.findByRank = function (rank) {
    return this.find({ rank }); // `this` se réfère au modèle Ninja
};

/* Méthode d'instance : Ajouter un nouveau jutsu maîtrisé par le ninja */
NinjaSchema.methods.addJutsu = function (jutsu) {
    if (!this.jutsus_maitrises.includes(jutsu)) {
        this.jutsus_maitrises.push(jutsu);
    }
    return this.save(); // Sauvegarder l'instance du ninja après modification
};

// Export du modèle
module.exports = mongoose.model('Ninja', NinjaSchema);