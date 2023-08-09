"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const mongoose = require('mongoose');
require('dotenv').config();
const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.DB_URL);
        console.log("Connected to Mongo Successfully!");
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectToMongo = connectToMongo;
//# sourceMappingURL=mongoose.js.map