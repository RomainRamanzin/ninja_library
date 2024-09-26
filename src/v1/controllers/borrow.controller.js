const Borrow = require('../../models/borrow.model');

// Créer un emprunt
exports.createBorrow = async (req, res) => {
    try {
        const borrow = new Borrow(req.body);
        await borrow.save();
        res.status(201).json(borrow);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'emprunt', error });
    }
};

// Obtenir tous les emprunts avec pagination, filtrage et tri
exports.getAllBorrows = async (req, res) => {
    try {
        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        // Filtrage
        let filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.ninjaId) filter.ninjaId = req.query.ninjaId;
        if (req.query.jutsuScrollId) filter.jutsuScrollId = req.query.jutsuScrollId;
        if (req.query.borrowDateFrom) filter.borrowDate = { $gte: new Date(req.query.borrowDateFrom) };
        if (req.query.borrowDateTo) filter.borrowDate = { ...filter.borrowDate, $lte: new Date(req.query.borrowDateTo) };

        // Tri
        const sort = {};
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        } else {
            // Tri par défaut
            sort.borrowDate = -1;
        }

        // Exécution de la requête
        const totalDocs = await Borrow.countDocuments(filter);
        const borrows = await Borrow.find(filter)
            .sort(sort)
            .skip(startIndex)
            .limit(limit)
            .populate('ninjaId', 'name rank')
            .populate('jutsuScrollId', 'name rank');

        // Préparation de la réponse
        const totalPages = Math.ceil(totalDocs / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            data: borrows,
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalDocs,
            hasNextPage: hasNextPage,
            hasPrevPage: hasPrevPage,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: hasPrevPage ? page - 1 : null,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des emprunts', error });
    }
};

// Obtenir un emprunt par son ID
exports.getBorrowById = async (req, res) => {
    try {
        const borrow = await Borrow.findById(req.params.id).populate('ninjaId').populate('jutsuScrollId');
        if (!borrow) {
            return res.status(404).json({ message: 'Emprunt non trouvé' });
        }
        res.status(200).json(borrow);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'emprunt', error });
    }
};

// Mettre à jour un emprunt
exports.updateBorrow = async (req, res) => {
    try {
        const borrow = await Borrow.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!borrow) {
            return res.status(404).json({ message: 'Emprunt non trouvé' });
        }
        res.status(200).json(borrow);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'emprunt', error });
    }
};

// Supprimer un emprunt
exports.deleteBorrow = async (req, res) => {
    try {
        const borrow = await Borrow.findByIdAndDelete(req.params.id);
        if (!borrow) {
            return res.status(404).json({ message: 'Emprunt non trouvé' });
        }
        res.status(200).json({ message: 'Emprunt supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'emprunt', error });
    }
};