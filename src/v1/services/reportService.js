const mongoose = require('mongoose');
const Borrow = require('../../models/borrow.model');
const Ninja = require('../../models/ninja.model');
const JutsuScroll = require('../../models/jutsuScroll.model');

async function getJutsuPopularityByNinjaRank() {
    try {
        const popularityReport = await Borrow.aggregate([
            // Étape 1 : Joindre les collections Ninja et JutsuScroll
            {
                $lookup: {
                    from: 'ninjas',
                    localField: 'ninjaId',
                    foreignField: '_id',
                    as: 'ninja'
                }
            },
            {
                $lookup: {
                    from: 'jutsuscrolls',
                    localField: 'jutsuScrollId',
                    foreignField: '_id',
                    as: 'jutsuScroll'
                }
            },
            // Étape 2 : Dérouler les tableaux résultants des lookups
            {
                $unwind: '$ninja'
            },
            {
                $unwind: '$jutsuScroll'
            },
            // Étape 3 : Grouper par rang ninja et jutsu
            {
                $group: {
                    _id: {
                        ninjaRank: '$ninja.rank',
                        jutsuName: '$jutsuScroll.name',
                        jutsuRank: '$jutsuScroll.rank',
                        jutsuCategory: '$jutsuScroll.category'
                    },
                    count: { $sum: 1 }
                }
            },
            // Étape 4 : Grouper à nouveau pour obtenir le top 3 des jutsu par rang ninja
            {
                $group: {
                    _id: '$_id.ninjaRank',
                    topJutsus: {
                        $push: {
                            jutsuName: '$_id.jutsuName',
                            jutsuRank: '$_id.jutsuRank',
                            jutsuCategory: '$_id.jutsuCategory',
                            count: '$count'
                        }
                    }
                }
            },
            // Étape 5 : Trier les jutsu par popularité et ne garder que le top 3
            {
                $project: {
                    _id: 0,
                    ninjaRank: '$_id',
                    topJutsus: {
                        $slice: [
                            {
                                $sortArray: {
                                    input: '$topJutsus',
                                    sortBy: { count: -1 }
                                }
                            },
                            3
                        ]
                    }
                }
            },
            // Étape 6 : Trier les résultats par rang ninja
            {
                $sort: { ninjaRank: 1 }
            }
        ]);

        return popularityReport;
    } catch (error) {
        console.error('Erreur lors de la génération du rapport de popularité:', error);
        throw error;
    }
}

module.exports = {
    getJutsuPopularityByNinjaRank
};
