const mongoose = require('mongoose');
const Ninja = require('./ninja.model');

// Définition du schéma Borrow (emprunts)
const BorrowSchema = new mongoose.Schema({
    ninjaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ninja',
        required: [true, 'L\'ID du ninja est requis'],
    },
    jutsuScrollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JutsuScroll',
        required: [true, 'L\'ID du rouleau de jutsu est requis'],
    },
    borrowDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date,
    },
    returnDueDate: {
        type: Date,
        required: [true, 'La date de retour prévue est obligatoire'],
    },
    status: {
        type: String,
        enum: ['borrowed', 'returned'],
        default: 'borrowed',
        required: true,
    },
    notes: {
        type: String,
        maxlength: [500, 'Les notes ne doivent pas dépasser 500 caractères'],
    },
}, { timestamps: true });

// Index composé pour les requêtes fréquentes
BorrowSchema.index({ ninjaId: 1, jutsuScrollId: 1, status: 1 });

// Index pour les requêtes de date d'échéance
BorrowSchema.index({ returnDueDate: 1 });

// Middleware avant de sauvegarder un emprunt
BorrowSchema.pre('save', function (next) {
    // Valider que la date de retour est dans le futur par rapport à la date d'emprunt
    if (this.returnDueDate <= this.borrowDate) {
        throw new Error('La date de retour prévue doit être après la date d\'emprunt');
    }
    next();
});

// Middleware : Avant de sauvegarder un emprunt, ajouter l'emprunt à l'historique du ninja
BorrowSchema.pre('save', async function (next) {
    try {
        const ninja = await Ninja.findById(this.ninjaId);
        if (ninja) {
            ninja.borrowHistory.push(this._id); // Ajouter l'ID de l'emprunt dans l'historique du ninja
            await ninja.save();
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Middleware : Avant de supprimer un emprunt, le retirer de l'historique du ninja
BorrowSchema.pre('remove', async function (next) {
    try {
        const ninja = await Ninja.findById(this.ninjaId);
        if (ninja) {
            ninja.borrowHistory = ninja.borrowHistory.filter(
                (borrowId) => borrowId.toString() !== this._id.toString()
            ); // Retirer l'emprunt de l'historique du ninja
            await ninja.save();
        }
        next();
    } catch (error) {
        next(error);
    }
});

/* Méthode statique : Trouver tous les emprunts actifs */
BorrowSchema.statics.findActiveBorrows = function () {
    return this.find({ status: 'borrowed' });
};

/* Méthode d'instance : Marquer un emprunt comme retourné */
BorrowSchema.methods.markAsReturned = function () {
    this.status = 'returned';
    return this.save();
};

// Export du modèle
module.exports = mongoose.model('Borrow', BorrowSchema);