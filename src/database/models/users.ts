import { Schema, model, models, CallbackWithoutResultAndOptionalError } from "mongoose";
import { hash, compare } from "bcrypt"

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    urlAvatar: { type: String },
    messages: { type: [Schema.Types.ObjectId], ref: 'message' },
    likes: { type: Number, default: 0 },
    tutorials: { type: Number, default: 0 },
    answersHelp: { type: Number, default: 0 },
    rol: { type: String, default: 'user' }
},
    {
        timestamps: true,
        versionKey: false
    })

UserSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
    this.password = await hash(this.password, 10);
    next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
    const comp = await compare(password, this.password);
    return comp;
}

export default models.User || model('User', UserSchema);