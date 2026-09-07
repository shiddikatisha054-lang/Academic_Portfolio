const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Tisha Portfolio Backend is running!"
    });
});

app.post("/api/contact", (req, res) => {

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    const newMessage = {
        id: Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString()
    };

    let messages = [];

    try {
        if (fs.existsSync("messages.json")) {
            const data = fs.readFileSync("messages.json", "utf8");
            messages = JSON.parse(data);
        }
    } catch (error) {
        messages = [];
    }

    messages.push(newMessage);

    fs.writeFileSync(
        "messages.json",
        JSON.stringify(messages, null, 2)
    );

    console.log("\n==============================");
    console.log("NEW CONTACT MESSAGE");
    console.log("==============================");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("==============================\n");

    res.json({
        success: true,
        message: "Your message has been received successfully!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});