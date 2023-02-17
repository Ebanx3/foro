import CategoryModel from "../models/categories";
import type { NextApiRequest, NextApiResponse } from 'next'

const getAllCategories = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const categories = await CategoryModel.find({});
        return res.status(200).json({
            success: true,
            categories
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Was impossible to get the categories'
        })
    }
}

const createCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name, imgUrl } = req.body;
        if (!name || !imgUrl) return res.status(400).json({ success: false, message: 'body must have a name and imgUrl field to create a new category' })
        const newCategory = await CategoryModel.create({ name, imgUrl });
        return res.status(200).json({
            sucess: true,
            message: `Categoy created`,
            data: newCategory
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Was impossible create the category'
        })
    }
}

const addSubCategory = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { categoryId } = req.query;
        const { subCategoryName } = req.body;

        if (!categoryId) return res.status(400).json({ success: false, message: 'query must have a categoryId field to update a category' })
        if (!subCategoryName || typeof subCategoryName != 'string') return res.status(400).json({ success: false, message: 'body must have a subCategoryName field to update a category' })

        const category = await CategoryModel.findById(categoryId)

        if (!category) return res.status(400).json({ success: false, message: 'Does not exists a category with those id' })

        const subCats = [...category.subCategory, subCategoryName];

        await CategoryModel.findByIdAndUpdate(categoryId, { subCategory: subCats })

        res.status(200).json({
            success: true,
            message: 'Category updated'
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Was impossible to add a subcategory'
        })
    }
}

export { getAllCategories, createCategory, addSubCategory }