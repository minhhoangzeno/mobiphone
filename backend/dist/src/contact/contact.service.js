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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contact_schemas_1 = require("./schemas/contact.schemas");
const nodemailer = require("nodemailer");
let ContactService = class ContactService {
    constructor(contactModel) {
        this.contactModel = contactModel;
    }
    async findAll() {
        return this.contactModel.find();
    }
    async create(contactDto) {
        let contact = new this.contactModel({ email: contactDto.email });
        if (contactDto.title) {
            contact.title = contactDto.title;
        }
        if (contactDto.content) {
            contact.content = contactDto.content;
        }
        if (contactDto.name) {
            contact.name = contactDto.name;
        }
        this.sendEmailContact(contact.email);
        return contact.save();
    }
    async sendEmailContact(email) {
        const transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'zenominhhoang@gmail.com',
                pass: 'Dalecarnegie521985',
            }
        });
        transport.sendMail({
            from: 'zenominhhoang@gmail.com',
            to: email,
            subject: "????ng k?? nh???n tin",
            html: `<h1>Li??n h???</h1>
            <h4>Xin ch??o</h4>
            <p>C???m ??n b???n ???? ????? l???i th??ng tin li??n h??? t???i ch??ng t??i. Khi c?? s???n ph???m m???i ra m???t hay c?? ?????t gi???m gi??
            ??u ????i m???i ch??ng t??i xin th??ng tin ?????n b???n.
            </p>
            </div>`,
        }).catch(err => console.log(err));
    }
    async delete(contactId) {
        let contact = await this.contactModel.findById(contactId);
        return contact.remove();
    }
};
ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contact_schemas_1.Contact.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContactService);
exports.ContactService = ContactService;
//# sourceMappingURL=contact.service.js.map