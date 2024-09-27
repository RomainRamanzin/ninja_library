const Borrow = require('../../models/borrow.model');
const JutsuScroll = require('../../models/jutsuScroll.model');
const mongoose = require('mongoose');

async function getJutsuRecommendations(ninjaId, limit = 5) {
    try {
        // Étape 1 : Trouver les jutsu empruntés par le ninja
        const borrowedJutsus = await Borrow.find({ ninjaId: ninjaId })
            .distinct('jutsuScrollId');

        // Étape 2 : Trouver les ninjas qui ont emprunté des jutsu similaires
        const similarNinjas = await Borrow.find({
            jutsuScrollId: { $in: borrowedJutsus },
            ninjaId: { $ne: ninjaId }
        }).distinct('ninjaId');

        // Étape 3 : Trouver les jutsu empruntés par ces ninjas similaires
        const recommendedJutsus = await Borrow.aggregate([
            {
                $match: {
                    ninjaId: { $in: similarNinjas },
                    jutsuScrollId: { $nin: borrowedJutsus }
                }
            },
            {
                $group: {
                    _id: '$jutsuScrollId',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: 'jutsuscrolls',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'jutsuDetails'
                }
            },
            {
                $unwind: '$jutsuDetails'
            },
            {
                $project: {
                    _id: 1,
                    name: '$jutsuDetails.name',
                    rank: '$jutsuDetails.rank',
                    category: '$jutsuDetails.category',
                    popularity: '$count'
                }
            }
        ]);

        return recommendedJutsus;
    } catch (error) {
        console.error('Erreur lors de la génération des recommandations:', error);
        throw error;
    }
}

module.exports = {
    getJutsuRecommendations
};
