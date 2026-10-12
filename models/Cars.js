const mongoose = require("mongoose")

const carsShema = new mongoose.Schema({
    title: {
        type : String,
        required: [true, "Название обязательно!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Описание обязательно!"],
        trim: true
    },
    price: {
        type: Number,
         required: [true, "Цена обязательно!"],
        min: 0
    },
    model: {
         type: String,
        required: [true, "Описание обязательно!"],
        trim: true
    }
})

module.exports = mongoose.model('Cars' , carsShema)