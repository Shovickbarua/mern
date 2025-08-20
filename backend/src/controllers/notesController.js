import Note from "../models/Note.js";

export async function getAllNotes (req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote (req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote (req, res) {
  try {
    const { id } = req.params.id;
    const { title, content } = req.body;
    await Note.findByIdAndUpdate(id, { title, content });

    res.status(200).json({ message: `Note with ID ${id} updated successfully` });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export  async function deleteNote (req, res) {
  try {
    const { id } = req.params;
    // Assuming Note.findByIdAndDelete is used to delete the note
    await Note.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}