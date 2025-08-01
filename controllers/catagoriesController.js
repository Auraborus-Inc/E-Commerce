const database = require('../databseConnectivity');

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).send('Please fill all the fields');
    }

    try {
        await database('categories').insert({
            name: name,
            description: description
        });
        return res.status(201).send('Category created successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await database('categories').select('*');
        return res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

exports.getCategoryByName = async (req, res) => {
    const { name } = req.params;
    try {
        const category = await database('categories')
            .where({ name: name })
            .first();

        if (category === 0) {
            return res.status(404).send('Category not found');
        }
        return res.status(200).json(category);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

exports.updateCategoryByName = async (req, res) => {
    const { name } = req.params;
    const { description, isActive } = req.body;

    if (description === undefined && isActive === undefined) {
        return res.status(400).send('Please provide at least one field to update (description or isActive).');
    }

    try {
        const updateFields = {};
        if (description !== undefined) updateFields.description = description;
        if (isActive !== undefined) updateFields.isActive = isActive;

        const updatedCategory = await database('categories')
            .where({ name: name })
            .update(updateFields);

        if (updatedCategory === 0) {
            return res.status(404).send('Category not found');
        }
        return res.status(200).send('Category updated successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

exports.deleteCategoryByName = async (req, res) => {
    const { name } = req.params;

    try {
        const deletedCategory = await database('categories')
            .where({ name: name })
            .del();

        if (deletedCategory === 0) {
            return res.status(404).send('Category not found');
        }
        return res.status(200).send('Category deleted successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}
