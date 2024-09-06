import 'dotenv/config';
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextID = 1;

// Add new tea
app.post("/addtea", (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextID++, name, price };
    teaData.push(newTea);
    res.status(200).send(newTea);
});

// Get all tea
app.get("/alltea", (req, res) => {
    res.status(200).send(teaData);
});

// Get tea by ID
app.get("/tea/:id", (req, res) => {
    const tea = teaData.find((t) => t.id === parseInt(req.params.id));
    if (!tea) {
        res.send("Tea not found");
    } else {
        res.send(tea);
    }
});

// Update tea by ID
app.put("/tea/:id", (req, res) => {
    const tea = teaData.find((t) => t.id === parseInt(req.params.id));
    if (!tea) {
        res.send("404");
    } else {
        const { name, price } = req.body;
        tea.name = name;
        tea.price = price;
        res.send(tea);
    }
});

// Remove tea by ID
app.delete("/tea/:id", (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.send("404 not found");
    }
    teaData.splice(index, 1);
    return res.status(204).send("Data removed");
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});


