const express = require("express");
const mongoose = require("mongoose");

const Cars = require('./models/Cars'); 

const PORT = 5000;
const app = express(); 

app.use(express.json()); 

mongoose.connect("mongodb://127.0.0.1:27017/products").then(() => {
    console.log("Успешное подключение БД");
}).catch((error) => {
    console.log("Ошибка при подключении к БД: " + error);
});

// 1. GET — Получить все автомобили
app.get("/cars", async (req, res) => {
    try {
        const products = await Cars.find();
        res.json(products); 
        console.log(products);
    } catch (error) {
        console.log("Ошибка при получении продуктов: " + error);
        res.status(500).send("Ошибка при получении данных");
    }
});

// 2. POST — Добавить новый автомобиль
app.post("/addcars", async (req, res) => {
    try {
        const { title, description, price, model } = req.body;

        const newCars = await Cars.create({
            title,
            description,
            price,
            model
        });

        res.send("Продукт успешно добавлен!");
    } catch (error) {
        console.log("Ошибка при добавлении автомобиля: " + error);
        res.status(500).send("Ошибка сервера: " + error.message);
    }
});

// 3. PATCH — Обновить данные автомобиля по его ID
app.patch("/cars/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // { new: true } нужен, чтобы метод возвращал уже измененный объект
        const updatedCar = await Cars.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedCar) {
            return res.status(404).send("Автомобиль с таким ID не найден");
        }
        res.send("Данные автомобиля успешно обновлены!");
    } catch (error) {
        console.log("Ошибка при обновлении автомобиля: " + error);
        res.status(500).send("Ошибка сервера: " + error.message);
    }
});

// 4. DELETE — Удалить автомобиль по его ID
app.delete("/cars/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Cars.findByIdAndDelete(id);

        if (!deletedCar) {
            return res.status(404).send("Автомобиль с таким ID не найден");
        }
        res.send("Автомобиль успешно удален!");
    } catch (error) {
        console.log("Ошибка при удалении автомобиля: " + error);
        res.status(500).send("Ошибка сервера: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log("Сервер успешно запущен на порту: " + PORT);
});
