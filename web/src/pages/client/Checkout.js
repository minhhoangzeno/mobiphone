import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { apiUrl } from "../../enviroment";
import { Routes } from "../../routes";

// const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || '') : null;
const access_token = localStorage.getItem("token");
export default function Checkout() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { addToast } = useToasts();
  const location = useLocation();
  const [fees, setFees] = useState([]);
  const [feePrice, setFeePrice] = useState(0);
  const data = location.state;
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [citySelect, setCitySelect] = useState(1);
  const [districtSelect, setDistrictSelect] = useState();
  const [show, setShow] = useState(false);
  const [code, setCode] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const user = useSelector((state) => state.auth.data);
  function makeid(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  useEffect(() => {
    searchLocation(); // eslint-disable-next-line react-hooks/exhaustive-deps
    searchFees();
  }, []);
  useEffect(() => {
    changeFeePrice();
  }, [citySelect, fees.length]);
  const searchFees = () => {
    axios({
      method: "GET",
      url: `${apiUrl}/Fees`,
      params: {
        access_token,
      },
    })
      .then((result) => {
        setFees(result.data.data);
      })
      .catch((err) => console.log(err));
  };
  const history = useHistory();
  const changeFeePrice = () => {
    if (fees.length > 0) {
      let priceFee = 0;
      if (citySelect < 39) {
        priceFee = fees.filter((el) => el.name == "Nội Thành")[0]?.price;
      } else if (38 < citySelect < 53) {
        priceFee = fees.filter((el) => el.name == "Miền Trung")[0]?.price;
      } else {
        priceFee = fees.filter((el) => el.name == "Miền Nam")[0]?.price;
      }

      setFeePrice(priceFee);
    }
  };
  let searchLocation = async () => {
    if (user) {
      let responsive = await axios.get(
        "https://provinces.open-api.vn/api/?depth=2"
      );
      if (responsive.status === 200) {
        let cityDistricts = responsive.data.filter(
          (item) => item.code == user.city
        )[0];
        setCity(responsive.data);
        setCitySelect(user.city);
        setDistrict(cityDistricts?.districts);
        setDistrictSelect(user.district);
      }
    }
  };
  let handleSelectCity = (e) => {
    setCitySelect(e.target.value);
    let cityDistricts = city.filter((item) => item.code == e.target.value)?.[0];
    setDistrict(cityDistricts.districts);
    setDistrictSelect(cityDistricts.districts?.[0]?.code);
  };
  let handleSelectDistrict = (e) => {
    setDistrictSelect(e.target.value);
  };
  const currencyFormat = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  const checkout = async (form) => {
    axios({
      method: "PATCH",
      url: `${apiUrl}/Payments/${data?.orderId}`,
      params: {
        access_token,
      },
      data: {
        status: "Đã tạo đơn",
        price: data?.price,
        code: makeid(4),
        city: citySelect,
        fee: Number(data?.price) + Number(feePrice),
        district: districtSelect,
        ...form,
      },
    })
      .then((result) => {
        history.push({
          pathname: Routes.PaymentSuccess.path,
          state: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
        addToast(`Failed!`, { appearance: "error", autoDismiss: true });
      });
  };
  return (
    <>
      <Header />
      <div className="checkout_area mb-100 mt-7">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-7">
              <div className="checkout_details_area clearfix">
                <h5>Thông tin</h5>
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label>Họ và tên *</label>
                      <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className={
                              errors.firstName
                                ? "errorInput form-control"
                                : "form-control"
                            }
                            type="text"
                            name="firstName"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{ required: true }}
                        defaultValue={`${user?.firstName} ${user?.lastName}`}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label>Email *</label>
                      <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className={
                              errors.lastName
                                ? "errorInput form-control"
                                : "form-control"
                            }
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{ required: true }}
                        defaultValue={user?.email}
                      />
                    </div>

                    <div className="col-12 mb-4">
                      <label>Số điện thoại *</label>
                      <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className={
                              errors.lastName
                                ? "errorInput form-control"
                                : "form-control"
                            }
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                        rules={{ required: true }}
                        defaultValue={user?.phoneNumber}
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <label>Địa chỉ *</label>
                      <Controller
                        control={control}
                        name="address"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <input
                            className={
                              errors.lastName
                                ? "errorInput form-control"
                                : "form-control"
                            }
                            type="text"
                            name="address"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                          />
                        )}
                        rules={{ required: true }}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label>Tỉnh/Thành phố *</label>
                      <select
                        onChange={(e) => handleSelectCity(e)}
                        value={citySelect}
                        className="form-control"
                      >
                        {city.map((item, index) => {
                          return (
                            <option key={index} value={item.code}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-6 mb-4">
                      <label>Quận/Huyện *</label>
                      <select
                        onChange={(e) => handleSelectDistrict(e)}
                        value={districtSelect}
                        className="form-control"
                      >
                        {district?.map((item, index) => {
                          return (
                            <option key={index} value={item.code}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-12 mb-4">
                      <label>Lời nhắn</label>
                      <Controller
                        control={control}
                        name="note"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <textarea
                            className="form-control"
                            name="address"
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            placeholder="Notes about your order, e.g. special notes for delivery."
                          />
                        )}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="checkout-content">
                <h5 className="title--">Đơn hàng của bạn</h5>
                <div className="products">
                  <div className="products-data">
                    <h5>Sản phẩm:</h5>
                    {data?.orderProducts?.map((orderProduct, index) => {
                      return (
                        <div
                          key={index}
                          className="single-products d-flex justify-content-between align-items-center mt-3"
                        >
                          <div>
                            {orderProduct.mobiphone.name} x{" "}
                            {orderProduct.amount}
                          </div>
                          <div className="font-bold">
                            {currencyFormat(
                              Number(
                                orderProduct.amount *
                                  orderProduct.mobiphone.price
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="order-total d-flex justify-content-between align-items-center mt-4">
                  <div>Tạm tính</div>
                  <div className="font-bold">
                    {currencyFormat(Number(data?.price))}
                  </div>
                </div>
                <div className="order-total d-flex justify-content-between align-items-center mt-2">
                  <div>Phí ship</div>
                  <div className="font-bold">
                    {currencyFormat(Number(feePrice))}
                  </div>
                </div>
                <div className="order-total d-flex justify-content-between align-items-center mt-2">
                  <div>Tổng</div>
                  <div className="font-bold">
                    {currencyFormat(Number(data?.price) + Number(feePrice))}
                  </div>
                </div>
                <div className="checkout-btn mt-4 mb-4">
                  <div
                    onClick={handleSubmit(checkout)}
                    className="text-center alazea-btn w-100 btn_3"
                  >
                    Xác nhận
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal className="wrap-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Tạo đơn hàng <b>{code}</b> thành công!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              history.push(Routes.DashboardOverview.path);
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
