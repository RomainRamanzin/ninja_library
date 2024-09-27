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

async function getJutsuOfTheMonth() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    try {
        const jutsuOfTheMonth = await Borrow.aggregate([
            {
                $match: {
                    createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
                }
            },
            {
                $group: {
                    _id: '$jutsuScrollId',
                    borrowCount: { $sum: 1 }
                }
            },
            {
                $sort: { borrowCount: -1 }
            },
            {
                $limit: 1
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
                    creator: '$jutsuDetails.creator',
                    popularity: '$borrowCount'
                }
            }
        ]);

        return jutsuOfTheMonth.length > 0 ? jutsuOfTheMonth[0] : null;
    } catch (error) {
        console.error('Erreur lors de la récupération du jutsu du mois:', error);
        throw error;
    }
}

module.exports = {
    getJutsuRecommendations,
    getJutsuOfTheMonth
};
