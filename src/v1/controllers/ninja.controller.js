const Ninja = require('../../models/ninja.model');

// Créer un ninja
exports.createNinja = async (req, res) => {
    try {
        const ninja = new Ninja(req.body);
        await ninja.save();
        res.status(201).json(ninja);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du ninja', error });
    }
};

// Obtenir tous les ninjas avec pagination, filtrage et tri
exports.getAllNinjas = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        // Filtrage
        let filter = {};
        if (req.query.name) filter.name = new RegExp(req.query.name, 'i');
        if (req.query.rank) filter.rank = req.query.rank;
        if (req.query.clan) filter.clan = new RegExp(req.query.clan, 'i');
        if (req.query.specialite) filter.specialite = new RegExp(req.query.specialite, 'i');
        if (req.query.jutsu) filter.jutsus_maitrises = new RegExp(req.query.jutsu, 'i');

        // Tri
        const sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        } else {
            // Tri par défaut
            sort.name = 1;
        }

        // Exécution de la requête
        const totalDocs = await Ninja.countDocuments(filter);
        const ninjas = await Ninja.find(filter)
            .sort(sort)
            .skip(startIndex)
            .limit(limit);

        // Préparation de la réponse
        const totalPages = Math.ceil(totalDocs / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            data: ninjas,
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalDocs,
            hasNextPage: hasNextPage,
            hasPrevPage: hasPrevPage,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: hasPrevPage ? page - 1 : null,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des ninjas', error });
    }
};

// Obtenir un ninja par son ID
exports.getNinjaById = async (req, res) => {
    try {
        const ninja = await Ninja.findById(req.params.id);
        if (!ninja) {
            return res.status(404).json({ message: 'Ninja non trouvé' });
        }
        res.status(200).json(ninja);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du ninja', error });
    }
};

// Mettre à jour un ninja
exports.updateNinja = async (req, res) => {
    try {
        const ninja = await Ninja.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ninja) {
            return res.status(404).json({ message: 'Ninja non trouvé' });
        }
        res.status(200).json(ninja);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du ninja', error });
    }
};

// Supprimer un ninja
exports.deleteNinja = async (req, res) => {
    try {
        const ninja = await Ninja.findByIdAndDelete(req.params.id);
        if (!ninja) {
            return res.status(404).json({ message: 'Ninja non trouvé' });
        }
        res.status(200).json({ message: 'Ninja supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du ninja', error });
    }
};