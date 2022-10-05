import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schemas';
import nodemailer = require("nodemailer");

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>) { }

  async findAll() {
    return this.contactModel.find();
  }

  async create(contactDto) {
    let contact = new this.contactModel({ email: contactDto.email });
    if (contactDto.title) {
      contact.title = contactDto.title
    }
    if (contactDto.content) {
      contact.content = contactDto.content
    }
    if (contactDto.name) {
      contact.name = contactDto.name
    }
    this.sendEmailContact(contact.email);
    return contact.save();
  }
  async sendEmailContact(email: string) {
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: 'zenominhhoang@gmail.com',
        pass: 'hoangtnm@bfast',
      }
    })
    transport.sendMail({
      from: 'zenominhhoang@gmail.com',
      to: email,
      subject: "Đăng ký nhận tin",
      html: `<h1>Liên hệ</h1>
            <h4>Xin chào</h4>
            <p>Cảm ơn bạn đã để lại thông tin liên hệ tới chúng tôi. Khi có sản phẩm mới ra mắt hay có đợt giảm giá
            ưu đãi mới chúng tôi xin thông tin đến bạn.
            </p>
            </div>`,
    }).catch(err => console.log(err));
  }
  async delete(contactId) {
    let contact = await this.contactModel.findById(contactId);
    return contact.remove();
  }
}
