import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true },
    subCategory: [String],
    imgUrl: { type: String, required: true }
}, {
    versionKey: false
})



export default models.Category || model('Category', CategorySchema);