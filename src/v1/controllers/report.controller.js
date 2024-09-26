const reportService = require('../services/reportService');

exports.getJutsuPopularityByNinjaRank = async (req, res) => {
    try {
        const report = await reportService.getJutsuPopularityByNinjaRank();
        res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la génération du rapport',
            error: error.message
        });
    }
};
