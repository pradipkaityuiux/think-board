import Note from "../models/notes.model.js";

export const getNotes = async(req, res) => {
    try {
        const notes = await Note.find();
        res.json({
            message: "Notes fetched successfully",
            notes,
        }).status(200);
    } catch (error) {
        res.json({
            message: "Error fetching notes",
            error: error.message,
        }).status(500);
    }
}

export const getNote = async(req, res) => {
    try {
        const {id} = req.params;
        const note = await Note.findById(id);
        res.json({
            message: "success",
            note,
        }).status(201);
    } catch (error) {
        res.json({
            message: "Error fetching notes",
            error: error.message,
        }).status(500);
    }
}

export const createNote = async(req, res) => {
    try {
        const {title, content} = req.body;
        const note = await Note.create({title, content});
        
        res.json({
            message: "Note created successfully",
            note,
        }).status(201);
    } catch (error) {
        res.json({
            message: "Error creating note",
            error: error.message,
        }).status(500);
    }
}

export const updateNote = async(req, res) => {
   try {
    const {id} = req.params;
    const {title, content} = req.body;
    const note = await Note.findByIdAndUpdate(id, {title, content}, {new: true}); // new: true means return the updated note and not the old one

     res.json({
        message: "Note updated successfully",
        note,
     }).status(200);
   } catch (error) {
    res.json({
        message: "Error updating note",
        error: error.message,
    }).status(500);
   }
}

export const deleteNote = async(req, res) => {
    try {
        const {id} = req.params;
        const note = await Note.findByIdAndDelete(id)
        res.json({
            message: "Note deleted successfully",
        }).status(200);
    } catch (error) {
        
    }
}