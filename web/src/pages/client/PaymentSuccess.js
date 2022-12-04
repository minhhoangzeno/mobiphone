import moment from "moment";
import React from "react";
import { useLocation } from "react-router-dom";
import icon from "../../assets/img/success-1.png";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
export default function PaymentSuccess() {
  const location = useLocation();
  const data = location.state;
  const currencyFormat = (num) => {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  return (
    <>
      <Header />
      <div style={{ background: "#f7f7f7" }} className="p-5">
        <h3 className="text-center">Cảm ơn bạn đã đặt hàng</h3>
        <div
          className="flex justify-content-center"
          style={{ display: "flex" }}
        >
          <img src={icon} alt="" width={150} />
        </div>
        <h3 className="text-center">Thông tin đơn hàng</h3>
        <div
          className="flex justify-content-center mt-3"
          style={{ display: "flex" }}
        >
          <ul className="w-50">
            <li
              className="flex justify-content-between mt-4"
              style={{ display: "flex" }}
            >
              <label htmlFor="">Mã đơn hàng:</label>
              <div>{data?.code}</div>
            </li>

            <li
              className="flex justify-content-between mt-4"
              style={{ display: "flex" }}
            >
              <label htmlFor="">Tạm tính thanh toán:</label>
              <div>{currencyFormat(Number(data?.price))}</div>
            </li>
            <li
              className="flex justify-content-between mt-4"
              style={{ display: "flex" }}
            >
              <label htmlFor="">Phí ship:</label>
              <div>{currencyFormat(Number(data?.fee))}</div>
            </li>
            <li
              className="flex justify-content-between mt-4"
              style={{ display: "flex" }}
            >
              <label htmlFor="">Thanh toán:</label>
              <div>
                {currencyFormat(Number(data?.price) + Number(data?.fee))}
              </div>
            </li>
            <li
              className="flex justify-content-between mt-4"
              style={{ display: "flex" }}
            >
              <label htmlFor="">Thời gian</label>
              <div>{moment(data?.createdAt).format("HH:mm DD/MM/YYYY")}</div>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
