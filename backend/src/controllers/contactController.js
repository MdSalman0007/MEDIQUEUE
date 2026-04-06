import Contact from "../models/contact.js";

// Save contact message to database
export const sendContactMessage = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Please fill all fields." });
    }

    try {
        const contact = await Contact.create({ name, email, message });

        res.status(201).json({
            message: "Message sent successfully! We will get back to you soon.",
            contact
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get all contact messages (admin only)
export const getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};