const database = require('../databseConnectivity');

exports.createCategory = async (req, res) => {
    const { name, description, isActive, image_url } = req.body;
    console.log("Creating category:", name, description, isActive);
    if (!name || !description || !isActive) {
        return res.status(400).send('Please fill all the fields');
    }

    try {
        await database('catagories').insert({
            name: name,
            description: description,
            is_active: isActive === 'active' ? true : false,
            image_url: image_url || null
        });
        return res.status(201).send('Category created successfully');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await database('catagories').select('*');
        return res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

exports.getCategoryByName = async (req, res) => {
    const { name } = req.params;
    try {
        const category = await database('catagories')
            .where({ name: name })
            .first();

        if (!category) {
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
    const { description, is_active, image_url } = req.body;
    console.log("Updating category:", name, description, is_active, image_url);

    if (description === undefined && is_active === undefined) {
        return res.status(400).send('Please provide at least one field to update (description or isActive).');
    }

    try {
        const updateFields = {};
        if (description !== undefined) updateFields.description = description;
        if (is_active !== undefined) updateFields.is_active = is_active;
        updateFields.image_url = image_url || null;

        const updatedCategory = await database('catagories')
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
        const deletedCategory = await database('catagories')
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
