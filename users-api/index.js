const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const readUsersFile = () => {
    try {
        const data = fs.readFileSync("users.json", "utf8");
        return JSON.parse(data);
    } catch (err) {
        return { users: [], admin: { username: "admin", password: "admin" } };
    }
};

// GET all users
app.get("/users", (req, res) => {
    const data = readUsersFile();
    res.json(data.users);
});

// GET admin credentials
app.get("/admin", (req, res) => {
    const data = readUsersFile();
    res.json(data.admin);
});

// Optional: Add new user
app.post("/users", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }

    const data = readUsersFile();
    data.users.push({ username, password });
    fs.writeFileSync("users.json", JSON.stringify(data, null, 2));

    res.status(201).json({ message: "User added", user: { username } });
});

app.listen(PORT, () => {
    console.log(`Users API running at http://localhost:${PORT}`);
});
