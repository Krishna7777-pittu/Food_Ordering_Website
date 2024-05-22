import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://pittuyasodakrishna05:WDwpqTAhJCWzMW7W@foodwebsite.2qn2caq.mongodb.net/food-del');
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};
