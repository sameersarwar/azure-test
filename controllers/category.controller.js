const Category = require('../models/category')

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        res.status(200).json({
            message: 'success',
            categories: categories,
        })
    } catch (error) {
        res.status(400).json({ message: 'Could not retrieve categories' })
    }
}

exports.createCategory = async (req, res) => {
    const category = req.body
    try {
        await Category.create(category)
        res.status(200).json({ message: 'Category created' })
    } catch (error) {
        res.status(400).json({ message: 'Could not create category' })
    }
}

exports.editCategory = async (req, res) => {
    const categoryId = req.params.id
    const newCategory = req.body

    if (!categoryId)
        return res.status(404).json({ message: 'category id not provided' })

    try {
        const category = Category.findByPk(categoryId)

        if (!category) res.status(404).json({ message: 'Record not found' })

        await Category.update(
            {
                name: newCategory.name,
            },
            { where: { id: categoryId } }
        )

        res.status(200).json({ message: 'Category Edited' })
    } catch (error) {
        res.status(200).json({
            message: 'Could not edit category',
            error: error.toString(),
        })
    }
}

exports.deleteCategory = async (req, res) => {
    const id = req.params.id

    try {
        await Category.destroy({
            where: {
                id: id,
            },
        })

        res.status(200).json({ message: 'Category Deleted' })
    } catch (error) {
        res.status(200).json({
            message: 'Could not delete category',
            error: error.toString(),
        })
    }
}
