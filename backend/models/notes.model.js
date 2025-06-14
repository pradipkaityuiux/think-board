import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true}); // CreatedAt and UpdatedAt will be automatically added

const Note = mongoose.model("Note", noteSchema);

export default Note;