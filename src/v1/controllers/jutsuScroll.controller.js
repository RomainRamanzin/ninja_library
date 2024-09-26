const JutsuScroll = require('../../models/jutsuScroll.model');

// Créer un jutsu scroll
exports.createJutsuScroll = async (req, res) => {
    try {
        const jutsuScroll = new JutsuScroll(req.body);
        await jutsuScroll.save();
        res.status(201).json(jutsuScroll);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du jutsu scroll', error });
    }
};

exports.getAllJutsuScrolls = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        // Filtrage
        let filter = {};
        if (req.query.name) filter.name = new RegExp(req.query.name, 'i');
        if (req.query.creator) filter.creator = new RegExp(req.query.creator, 'i');
        if (req.query.rank) filter.rank = req.query.rank;
        if (req.query.category) filter.category = req.query.category;

        // Tri
        const sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }

        // Exécution de la requête
        const totalDocs = await JutsuScroll.countDocuments(filter);
        const jutsuScrolls = await JutsuScroll.find(filter)
            .sort(sort)
            .skip(startIndex)
            .limit(limit);

        // Préparation de la réponse
        const totalPages = Math.ceil(totalDocs / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        console.log(jutsuScrolls);

        res.status(200).json({
            data: jutsuScrolls,
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalDocs,
            hasNextPage: hasNextPage,
            hasPrevPage: hasPrevPage,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: hasPrevPage ? page - 1 : null,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des jutsu scrolls', error });
    }
};

// Obtenir un jutsu scroll par son ID
exports.getJutsuScrollById = async (req, res) => {
    try {
        const jutsuScroll = await JutsuScroll.findById(req.params.id);
        if (!jutsuScroll) {
            return res.status(404).json({ message: 'Jutsu scroll non trouvé' });
        }
        res.status(200).json(jutsuScroll);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du jutsu scroll', error });
    }
};

// Mettre à jour un jutsu scroll
exports.updateJutsuScroll = async (req, res) => {
    try {
        const jutsuScroll = await JutsuScroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!jutsuScroll) {
            return res.status(404).json({ message: 'Jutsu scroll non trouvé' });
        }
        res.status(200).json(jutsuScroll);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du jutsu scroll', error });
    }
};

// Supprimer un jutsu scroll
exports.deleteJutsuScroll = async (req, res) => {
    try {
        const jutsuScroll = await JutsuScroll.findByIdAndDelete(req.params.id);
        if (!jutsuScroll) {
            return res.status(404).json({ message: 'Jutsu scroll non trouvé' });
        }
        res.status(200).json({ message: 'Jutsu scroll supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du jutsu scroll', error });
    }
};