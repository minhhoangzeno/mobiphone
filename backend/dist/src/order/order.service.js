"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_product_schemas_1 = require("../order-product/schemas/order-product.schemas");
const order_schemas_1 = require("./schemas/order.schemas");
let OrderService = class OrderService {
    constructor(orderModel, orderProductModel) {
        this.orderModel = orderModel;
        this.orderProductModel = orderProductModel;
    }
    async findAll() {
        return this.orderModel.find();
    }
    async search(textSearch) {
        let regex = new RegExp(textSearch, "i");
        return await this.orderModel.find({ code: regex }).populate({
            path: "orderProducts",
            select: "amount price",
            model: "OrderProduct",
            populate: {
                path: "product",
                select: "title photoURL",
                model: "Product"
            }
        });
    }
    async findById(id) {
        return await this.orderModel.findById(id).populate({
            path: "orderProducts",
            select: "amount price",
            model: "OrderProduct",
            populate: {
                path: "product",
                select: "title photoURL",
                model: "Product"
            }
        });
    }
    async findOrderByAmount(year) {
        let dayOfFeburary = 0;
        if (year % 4 == 0) {
            dayOfFeburary = 29;
        }
        else {
            dayOfFeburary = 28;
        }
        let resp = [];
        let monthJanurary = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 0, 1),
                $lt: new Date(year, 0, 31)
            },
            status: "Th??nh c??ng"
        });
        let monthFeburary = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 1, 1),
                $lt: new Date(year, 1, dayOfFeburary)
            },
            status: "Th??nh c??ng"
        });
        let monthMatch = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 2, 1),
                $lt: new Date(year, 2, 31)
            },
            status: "Th??nh c??ng"
        });
        let monthApril = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 3, 1),
                $lt: new Date(year, 3, 30)
            },
            status: "Th??nh c??ng"
        });
        let monthMay = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 4, 1),
                $lt: new Date(year, 4, 31)
            },
            status: "Th??nh c??ng"
        });
        let monthJune = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 5, 1),
                $lt: new Date(year, 5, 30)
            },
            status: "Th??nh c??ng"
        });
        let monthJuly = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 6, 1),
                $lt: new Date(year, 6, 31)
            },
            status: "Th??nh c??ng"
        });
        let monthAugust = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 7, 1),
                $lt: new Date(year, 7, 31)
            },
            status: "Th??nh c??ng"
        });
        let monthSeptember = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 8, 1),
                $lt: new Date(year, 8, 30)
            },
            status: "Th??nh c??ng"
        });
        let monthOctober = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 9, 1),
                $lt: new Date(year, 9, 31)
            },
            status: "Th??nh c??ng"
        });
        let monthNovember = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 10, 1),
                $lt: new Date(year, 10, 30)
            },
            status: "Th??nh c??ng"
        });
        let monthDecember = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 11, 1),
                $lt: new Date(year, 11, 31)
            },
            status: "Th??nh c??ng"
        });
        resp.push([
            {
                label: 'Th??ng 1',
                amount: monthJanurary.length
            },
            {
                label: 'Th??ng 2',
                amount: monthFeburary.length
            },
            {
                label: 'Th??ng 3',
                amount: monthMatch.length
            },
            {
                label: 'Th??ng 4',
                amount: monthApril.length
            },
            {
                label: 'Th??ng 5',
                amount: monthMay.length
            },
            {
                label: 'Th??ng 6',
                amount: monthJune.length
            },
            {
                label: 'Th??ng 7',
                amount: monthJuly.length
            },
            {
                label: 'Th??ng 8',
                amount: monthAugust.length
            },
            {
                label: 'Th??ng 9',
                amount: monthSeptember.length
            },
            {
                label: 'Th??ng 10',
                amount: monthOctober.length
            },
            {
                label: 'Th??ng 11',
                amount: monthNovember.length
            },
            {
                label: 'Th??ng 12',
                amount: monthDecember.length
            },
        ]);
        return resp;
    }
    async findOrderByRevenue(year) {
        let dayOfFeburary = 0;
        if (year % 4 == 0) {
            dayOfFeburary = 29;
        }
        else {
            dayOfFeburary = 28;
        }
        let resp = [];
        let monthJanurary = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 0, 1),
                $lt: new Date(year, 0, 31)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthFeburary = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 1, 1),
                $lt: new Date(year, 1, dayOfFeburary)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthMatch = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 2, 1),
                $lt: new Date(year, 2, 31)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthApril = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 3, 1),
                $lt: new Date(year, 3, 30)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthMay = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 4, 1),
                $lt: new Date(year, 4, 31)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthJune = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 5, 1),
                $lt: new Date(year, 5, 30)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthJuly = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 6, 1),
                $lt: new Date(year, 6, 31)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthAugust = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 7, 1),
                $lt: new Date(year, 7, 31)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthSeptember = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 8, 1),
                $lt: new Date(year, 8, 30)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthOctober = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 9, 1),
                $lt: new Date(year, 9, 31)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthNovember = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 10, 1),
                $lt: new Date(year, 10, 30)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        let monthDecember = await this.orderModel.find({
            createdAt: {
                $gte: new Date(year, 11, 1),
                $lt: new Date(year, 11, 31)
            },
            status: "Th??nh c??ng"
        }).exec().then(result => {
            let total = 0;
            result.forEach(item => total += item.totalPrice.valueOf());
            return total;
        });
        resp.push([
            {
                label: 'Th??ng 1',
                revenue: monthJanurary
            },
            {
                label: 'Th??ng 2',
                revenue: monthFeburary
            },
            {
                label: 'Th??ng 3',
                revenue: monthMatch
            },
            {
                label: 'Th??ng 4',
                revenue: monthApril
            },
            {
                label: 'Th??ng 5',
                revenue: monthMay
            },
            {
                label: 'Th??ng 6',
                revenue: monthJune
            },
            {
                label: 'Th??ng 7',
                revenue: monthJuly
            },
            {
                label: 'Th??ng 8',
                revenue: monthAugust
            },
            {
                label: 'Th??ng 9',
                revenue: monthSeptember
            },
            {
                label: 'Th??ng 10',
                revenue: monthOctober
            },
            {
                label: 'Th??ng 11',
                revenue: monthNovember
            },
            {
                label: 'Th??ng 12',
                revenue: monthDecember
            },
        ]);
        return resp;
    }
    async findByUser(user) {
        return this.orderModel.find({ createdBy: user }).populate({
            path: "orderProducts",
            select: "amount price",
            model: "OrderProduct",
            populate: {
                path: "product",
                select: "title photoURL",
                model: "Product"
            }
        });
    }
    async create(orderDto, orderProductDto, user) {
        let order = new this.orderModel(Object.assign({}, orderDto));
        order.createdBy = user;
        let total = 0;
        orderProductDto.forEach(item => {
            let orderProduct = new this.orderProductModel(item);
            total += item.price;
            orderProduct.order = order._id;
            orderProduct.save();
            order.orderProducts.push(orderProduct._id);
        });
        order.totalPrice = total;
        return order.save();
    }
    async editStatus(orderId, status) {
        let order = await this.orderModel.findById(orderId);
        order.status = status;
        return order.save();
    }
    async delete(orderId) {
        let order = await this.orderModel.findById(orderId);
        let orderProducts = await this.orderProductModel.find({ order: order._id });
        orderProducts.forEach(item => item.remove());
        return order.remove();
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schemas_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(order_product_schemas_1.OrderProduct.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map