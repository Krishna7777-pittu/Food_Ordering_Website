
// import orderModel from "../models/orderModel.js";
// import userModel from '../models/userModel.js';
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const placeOrder = async (req, res) => {
//     const frontend_url = "http://localhost:5173/"; 
//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//             date: new Date() 
//         });
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//         const line_items = req.body.items.map((item) => ({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: item.name
//                 },
//                 unit_amount: item.price * 100 
//             },
//             quantity: item.quantity
//         }));
//         line_items.push({
//             price_data: {
//                 currency: "inr",
//                 product_data: {
//                     name: "Delivery Charges"
//                 },
//                 unit_amount: 20 * 100 
//             },
//             quantity: 1
//         });

//         const session = await stripe.checkout.sessions.create({
//             line_items: line_items,
//             mode: "payment",
//             success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Corrected orderId here
//             cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}` // Corrected orderId here
//         });
        
//         res.json({ success: true, session_url: session.url });
//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ message: "Error placing order" });
//     }
// }

// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;
//     try {
//         if (success == "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Paid" });
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({ success: false, message: "Not Paid" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };



// export { placeOrder,verifyOrder };


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place an order
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173/";
    try {
        // Create a new order document
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            date: new Date(),
        });
        await newOrder.save(); // Save the new order to the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); // Clear the user's cart

        // Create line items for the Stripe session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        // Add delivery charges as a line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 20 * 100,
            },
            quantity: 1,
        });

        // Create a Stripe session for payment
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });
        // Send the session URL back to the frontend
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Error placing order" });
    }
};

// Verify an order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        // If payment is successful, update the order payment status and set status to "Food Processing"
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Food Processing" });
            res.json({ success: true, message: "Paid" });
        } else {
            // If payment fails, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Error verifying order" });
    }
};

// Fetch orders for a specific user
const userOrders = async (req, res) => {
    try {
        // Find orders belonging to the specified userId
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders }); // Send the orders data to the frontend
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Error fetching user orders" });
    }
};

const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})

    }

}

// api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    }
    catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}



export { placeOrder, verifyOrder, userOrders,listOrders,updateStatus };
