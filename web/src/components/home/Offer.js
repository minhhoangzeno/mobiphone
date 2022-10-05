import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../enviroment";
import OfferImg from "../../images/home/iphone2.png";

export default function Offer() {
  const { control, handleSubmit, reset } = useForm();
  let { addToast } = useToasts();
  const sumbitContact = async (form) => {
    axios({
      method: "POST",
      url: `${apiUrl}/Contacts`,
      data: form,
    }).then(() => {
      addToast("Đăng ký nhận tin thành công!", {
        appearance: "success",
        autoDismiss: 1000,
      });
      reset();
    }).catch(err => console.log(err));
  };
  return (
    <section className="our_offer section_padding">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-6 col-md-6">
            <div className="offer_img">
              <img src={OfferImg} alt="" />
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="offer_text">
              <h3>
                Đăng ký email để nhận được thông báo ưu đãi về giá các sản phẩm
              </h3>
              <div className="date_countdown">
                <div id="timer">
                  <div id="days" className="date"></div>
                  <div id="hours" className="date"></div>
                  <div id="minutes" className="date"></div>
                  <div id="seconds" className="date"></div>
                </div>
              </div>
              <div className="input-group">
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                    />
                  )}
                  rules={{
                    required: true,
                  }}
                  defaultValue=""
                />

                <div
                  className="input-group-append"
                  onClick={handleSubmit(sumbitContact)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="input-group-text btn_2">Đăng ký</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
