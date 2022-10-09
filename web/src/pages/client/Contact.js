import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { apiUrl } from "../../enviroment";

export default function Contact() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { addToast } = useToasts();
  let contact = (form) => {
    axios
      .post(`${apiUrl}/Contacts`, form)
      .then(() => {
        addToast("Success", { appearance: "success", autoDismiss: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Header />

      <section className="contact-section padding_top">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Get in Touch</h2>
            </div>
            <div className="col-lg-8">
              <form
                className="form-contact contact_form"
                action="contact_process.php"
                method="post"
                id="contactForm"
                noValidate="novalidate"
              >
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="content"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <textarea
                            className="form-control w-100"
                            name="message"
                            id="message"
                            cols={30}
                            rows={9}
                            placeholder="Enter Message"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{
                          required: true,
                        }}
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className="form-control"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{
                          required: true,
                        }}
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className="form-control"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{
                          required: true,
                        }}
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className="form-control"
                            name="subject"
                            id="subject"
                            type="text"
                            placeholder="Enter Subject"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{
                          required: true,
                        }}
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="form-group mt-3"
                  onClick={handleSubmit(contact)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="btn_3 button-contactForm">Send Message</div>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-home" />
                </span>
                <div className="media-body">
                  <h3>Buttonwood, California.</h3>
                  <p>Rosemead, CA 91770</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-tablet" />
                </span>
                <div className="media-body">
                  <h3>00 (440) 9865 562</h3>
                  <p>Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon">
                  <i className="ti-email" />
                </span>
                <div className="media-body">
                  <h3>support@colorlib.com</h3>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
