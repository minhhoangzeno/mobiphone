"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (DetailPayment) {
    DetailPayment.getOrder = async function (ctx) {
        const Payment = DetailPayment.app.models.Payment;
        const data = ctx.req.query;
        const userId = Number(data.user);
        const order = await Payment.findOne({
            where: { accountId: userId, status: "Đang tạo đơn" },
        });
        if (order) {
            const orderProduct = await DetailPayment.find({
                include: "mobiphone",
                where: { paymentId: order.id },
            });
            return orderProduct;
        }
        return;
    };
};
//# sourceMappingURL=detail-payment.js.map