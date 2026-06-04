const express = require('express');
const User = require('../users/user.model');
const router = express.Router();
const Order = require('../orders/orders.model');
const Reviews = require('../reviews/reviews.model');
const Products = require('../products/products.model');

//user stats by email
router.get('/user-stats/:email', async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }
    try {
        const user = await User.findOne({ email: email });

        if (!user) return res.status(404).send({ message: "User not found" });

        //sum of all orders
        const totalPaymentsResult = await Order.aggregate([
            { $match: { email: email } },
            {
                $group: { _id: null, totalAmount: { $sum: "$amount" } }
            }
        ])

        const totalPaymentsAmount = totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;

        //get total review
        const totalReviews = await Reviews.countDocuments({ userId: user._id });

        //total purchased products
        const purchasedProductIds = await Order.distinct("products.productId", {email: email});
        const totalPurchasedProducts = purchasedProductIds.length;

        res.status(200).send({
            totalPayments: totalPaymentsAmount.toFixed(2),
            totalReviews,
            totalPurchasedProducts
        });

    } catch (error) {
        console.error("Error fetching user stats", error);
        res.status(500).send({ message: "Error fetching user stats" });
    }
})

//admin status
router.get('/admin-stats', async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Products.countDocuments();
        const totalReviews = await Reviews.countDocuments();
        const totalUsers = await User.countDocuments();

        //calculate total earning
        const totalEarningsResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalEarnings: { $sum: "$amount" }
                }
            }
        ])
        const totalEarnings = totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;

        const monthlyEarningsResult = await Order.aggregate([
            {
                $group: {
                    _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
                    monthlyEarnings: { $sum: "$amount" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ])

        //formate monthly earnings
        const monthlyEarnings = monthlyEarningsResult.map((entry) => ({
            month: entry._id.month,
            year: entry._id.year,
            earnings: entry.monthlyEarnings.toFixed(2)
        }))

        res.status(200).send({
            totalOrders,
            totalProducts,
            totalReviews,
            totalUsers,
            totalEarnings,
            monthlyEarnings
        });
    }
    catch (error) {
        console.error("Error fetching admin stats", error);
        res.status(500).send({ message: "Error fetching admin stats" });
    }
})

module.exports = router;