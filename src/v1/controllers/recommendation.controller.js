const recommendationService = require('../services/recommandationService');

async function getJutsuRecommendations(req, res) {
    try {
        const { ninjaId } = req.params;
        const limit = parseInt(req.query.limit) || 5;

        const recommendations = await recommendationService.getJutsuRecommendations(ninjaId, limit);

        res.status(200).json({
            success: true,
            data: recommendations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des recommandations',
            error: error.message
        });
    }
}

module.exports = {
    getJutsuRecommendations
};
