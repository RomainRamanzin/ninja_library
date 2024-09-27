const mongoose = require('mongoose');

// Définition du schéma User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Le nom d\'utilisateur est obligatoire'],
        unique: true,
        minlength: [3, 'Le nom d\'utilisateur doit avoir au moins 3 caractères'],
        maxlength: [30, 'Le nom d\'utilisateur ne doit pas dépasser 30 caractères'],
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire'],
        minlength: [6, 'Le mot de passe doit avoir au moins 6 caractères'],
    },
}, { timestamps: true });

// Index pour le nom d'utilisateur
userSchema.index({ username: 1 });

// Méthode statique : Trouver un utilisateur par nom d'utilisateur
userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};

// Méthode d'instance : Vérifier si le mot de passe correspond
userSchema.methods.isPasswordValid = function (password) {
    return this.password === password;
};

// Export du modèle
module.exports = mongoose.model('User', userSchema);
