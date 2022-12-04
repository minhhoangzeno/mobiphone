import { DetailPayment } from "../../codegen/api/fetch/api";
import { PersistedModelStatic } from "../helpers/loopback";

module.exports = function (DetailPayment: PersistedModelStatic<DetailPayment>) {
  (DetailPayment as any).getOrder = async function (ctx: any) {
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
