"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("../helpers/knex");
const native_sql_1 = require("../helpers/native-sql");
module.exports = function (Order) {
    Order.addToCart = async function (ctx) {
        const OrderProduct = Order.app.models.OrderProduct;
        const product = JSON.parse(ctx.req.query.product);
        const userId = product.userId;
        const order = await Order.findOne({ where: { accountId: userId, status: 'Đang tạo đơn' } });
        if (order) {
            const orderProduct = await OrderProduct.find({ where: { orderId: order.id, productId: product.productId } });
            if (orderProduct.length > 0) {
                return 'Sản phẩm này đã có trong giỏ hàng';
            }
            else {
                const orderProductCreate = await OrderProduct.create({
                    productId: product.productId,
                    amount: 1,
                    price: product.price,
                    orderId: order.id
                });
                orderProductCreate.save();
                return 'Sản phẩm sẽ được thêm vào giỏ hàng';
            }
        }
        else {
            const orderCreate = await Order.create({
                accountId: userId,
                status: 'Đang tạo đơn'
            });
            orderCreate.save();
            const orderProductCreate = await OrderProduct.create({
                productId: product.productId,
                amount: 1,
                price: product.price,
                orderId: orderCreate.id
            });
            orderProductCreate.save();
            return 'Sản phẩm sẽ được thêm vào giỏ hàng';
        }
    };
    Order.afterRemote("find", async (ctx) => {
        try {
            const pg = (0, knex_1.knex)('order').count().toString();
            const data = await (0, native_sql_1.executeNativeSql)(Order.app.dataSources.postgres.connector, pg, []);
            if (data && data.length > 0) {
                ctx.result = {
                    data: ctx.result,
                    total: Number(data[0].count)
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    Order.statisticByAmount = async function (ctx) {
        const year = ctx.req.query.year;
        let dayOfFeburary = 0;
        if (year % 4 == 0) {
            dayOfFeburary = 29;
        }
        else {
            dayOfFeburary = 28;
        }
        let resp = [];
        let monthJanurary = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 0, 1) } },
                    { createdAt: { lt: new Date(year, 0, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthFeburary = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 1, 1) } },
                    { createdAt: { lt: new Date(year, 1, dayOfFeburary) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthMatch = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 2, 1) } },
                    { createdAt: { lt: new Date(year, 2, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthApril = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 3, 1) } },
                    { createdAt: { lt: new Date(year, 3, 30) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthMay = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 4, 1) } },
                    { createdAt: { lt: new Date(year, 4, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthJune = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 5, 1) } },
                    { createdAt: { lt: new Date(year, 5, 30) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthJuly = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 6, 1) } },
                    { createdAt: { lt: new Date(year, 6, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthAugust = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 7, 1) } },
                    { createdAt: { lt: new Date(year, 7, 31) } },
                    {
                        status: "Thành công"
                    }
                ],
            }
        });
        let monthSeptember = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 8, 1) } },
                    { createdAt: { lt: new Date(year, 8, 30) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthOctober = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 9, 1) } },
                    { createdAt: { lt: new Date(year, 9, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthNovember = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 10, 1) } },
                    { createdAt: { lt: new Date(year, 10, 30) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        let monthDecember = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 11, 1) } },
                    { createdAt: { lt: new Date(year, 11, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        });
        resp = [
            {
                label: 'Tháng 1',
                amount: monthJanurary.length
            },
            {
                label: 'Tháng 2',
                amount: monthFeburary.length
            },
            {
                label: 'Tháng 3',
                amount: monthMatch.length
            },
            {
                label: 'Tháng 4',
                amount: monthApril.length
            },
            {
                label: 'Tháng 5',
                amount: monthMay.length
            },
            {
                label: 'Tháng 6',
                amount: monthJune.length
            },
            {
                label: 'Tháng 7',
                amount: monthJuly.length
            },
            {
                label: 'Tháng 8',
                amount: monthAugust.length
            },
            {
                label: 'Tháng 9',
                amount: monthSeptember.length
            },
            {
                label: 'Tháng 10',
                amount: monthOctober.length
            },
            {
                label: 'Tháng 11',
                amount: monthNovember.length
            },
            {
                label: 'Tháng 12',
                amount: monthDecember.length
            },
        ];
        return resp;
    };
    Order.statisticByRevenue = async function (ctx) {
        const year = ctx.req.query.year;
        let dayOfFeburary = 0;
        if (year % 4 == 0) {
            dayOfFeburary = 29;
        }
        else {
            dayOfFeburary = 28;
        }
        let resp = [];
        let monthJanurary = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 0, 1) } },
                    { createdAt: { lt: new Date(year, 0, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        let monthFeburary = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 1, 1) } },
                    { createdAt: { lt: new Date(year, 1, dayOfFeburary) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthMatch = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 2, 1) } },
                    { createdAt: { lt: new Date(year, 2, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthApril = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 3, 1) } },
                    { createdAt: { lt: new Date(year, 3, 30) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthMay = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 4, 1) } },
                    { createdAt: { lt: new Date(year, 4, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthJune = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 5, 1) } },
                    { createdAt: { lt: new Date(year, 5, 30) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthJuly = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 6, 1) } },
                    { createdAt: { lt: new Date(year, 6, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthAugust = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 7, 1) } },
                    { createdAt: { lt: new Date(year, 7, 31) } },
                    {
                        status: "Thành công"
                    }
                ],
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthSeptember = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 8, 1) } },
                    { createdAt: { lt: new Date(year, 8, 30) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthOctober = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 9, 1) } },
                    { createdAt: { lt: new Date(year, 9, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthNovember = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 10, 1) } },
                    { createdAt: { lt: new Date(year, 10, 30) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        let monthDecember = await Order.find({
            where: {
                and: [
                    { createdAt: { gt: new Date(year, 11, 1) } },
                    { createdAt: { lt: new Date(year, 11, 31) } },
                    {
                        status: "Thành công"
                    }
                ]
            }
        }).then(result => {
            let total = 0;
            result.forEach((item) => total += item.price.valueOf());
            return total;
        });
        ;
        resp = [
            {
                label: 'Tháng 1',
                revenue: monthJanurary
            },
            {
                label: 'Tháng 2',
                revenue: monthFeburary
            },
            {
                label: 'Tháng 3',
                revenue: monthMatch
            },
            {
                label: 'Tháng 4',
                revenue: monthApril
            },
            {
                label: 'Tháng 5',
                revenue: monthMay
            },
            {
                label: 'Tháng 6',
                revenue: monthJune
            },
            {
                label: 'Tháng 7',
                revenue: monthJuly
            },
            {
                label: 'Tháng 8',
                revenue: monthAugust
            },
            {
                label: 'Tháng 9',
                revenue: monthSeptember
            },
            {
                label: 'Tháng 10',
                revenue: monthOctober
            },
            {
                label: 'Tháng 11',
                revenue: monthNovember
            },
            {
                label: 'Tháng 12',
                revenue: monthDecember
            },
        ];
        return resp;
    };
};
//# sourceMappingURL=order.js.map