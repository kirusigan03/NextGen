 const express = require('express');
const { model } = require('mongoose');
const Order = require('./orders.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//create checkout session
router.post("/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    try {
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.image]
                },
                unit_amount: Math.round(product.price * 100)
            },
            quantity: product.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/cancel`
        })
        res.json({
                 id: session.id,
                 url: session.url
                });

    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).send({ message: "Failed to create checkout session" });
    }
});

//confrim payment
router.post("/confirm-payment", async (req, res) => {
    const {session_id} = req.body;
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items", "payment_intent"]
        });

        const paymentIntentId = session.payment_intent.id;
        let order = await Order.findOne({orderId: paymentIntentId});

        if(!order){
            const lineItems = session.line_items.data.map((item) => ({
                productId: item.price.product,
                quantity: item.quantity
            }));
            const amount = session.amount_total / 100;
            order = new Order({
                orderId: paymentIntentId,
                amount,
                products: lineItems,
                email: session.customer_details.email,
                status: session.payment_intent.status == "succeeded" ? 'pending' : 'failed'
            })
        } else {
            order.status = session.payment_intent.status === "succeeded" ? 'pending' : 'failed';
        }
        await order.save();
        res.json({order})

    } catch (error) {
        console.error("Error confirming payment:", error);
        res.status(500).send({ error: "Failed to confirm payment" });
    }
});

//get order by id
router.get("/order/:id", async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return res.status(404).send({message: "Order not found"});
        }
        res.status(200).send(order);
    } catch (error) {
        console.error("Error fetching order by ID", error);
        res.status(500).send({message: "Failed to fetch order by ID"});
    }
});

//get order by email address
router.get('/:email',async(req, res) => {
    const email = req.params.email;
    if(!email) {
        return res.status(400).send({ message: "Email is required"});
    }

    try {
        const orders = await Order.find({email: email});

        if(orders.length === 0 || !orders) {
            return res.status(400).send({ orders: 0, message: "No orders found for this email"});
        }

        res.status(200).send({ orders});
    } catch (error) {
        console.error("Error fetching orders by email", error);
        res.status(500).send({message: "Failed to fetch orders by email"});
    }
})



//get all orders
router.get("/", async(req, res) => {
    try {
        const orders = await  Order.find().sort({createdAt: -1});
        if(orders.length === 0) {
            return res.status(404).send({message: "No orders found", orders: []});
        }
        res.status(200).send(orders);
    } catch (error) {
        console.error("Error fetching all orders", error);
        res.status(500).send({message: "Failed to fetch all orders"});
    }
});

//update order status
router.patch('/update-order-status/:id', async(req,res) => {
   const {id} = req.params;
   const {status} = req.body;
   if(!status) { 
    return res.status(400).send({message: "Status is required"});
   }

   try {
    const updatedOrder = await Order.findByIdAndUpdate(id, {
        status,
        updatedAt: new Date(),
    },{
        new: true, runValidators: true
    })

    if(!updatedOrder) {
        return res.status(404).send({message: "Order not found"});
    }
    res.status(200).send({message: "Order status updated successfully", order: updatedOrder});
   } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).send({message: "Failed to update order status"});
   }
});

//delete order
router.delete('/delete-order/:id', async(req, res) => {
    const {id} = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if(!deletedOrder) {
            return res.status(404).send({message: "Order not found"});
        }
        res.status(200).json({
            message: "Order deleted successfully",
             order: deletedOrder});
    } catch (error) {
        console.error("Error deleting order", error);
        res.status(500).send({message: "Failed to delete order"});
    }
})

module.exports = router;