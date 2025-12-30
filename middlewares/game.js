module.exports = {
    validateGame: (req, res, next) => {
        const { title } = req.body;
        if (!title && req.method === 'POST') {
            return res.status(400).json({ error: "Le titre est obligatoire" });
        }
        next();
    }
};