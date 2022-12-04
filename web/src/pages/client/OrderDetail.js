import {
  Button,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { apiUrl } from "../../enviroment";

const access_token = localStorage.getItem("token");
export default () => {
  let location = useLocation();
  let orderId = location.state;
  const [order, setOrder] = useState();
  const [orderProducts, setOrderProducts] = useState([]);
  const [locationData, setLocationData] = useState();
  let history = useHistory();
  useEffect(() => {
    searchLocation();
  }, []);
  let searchLocation = async () => {
    let responsive = await axios.get(
      "https://provinces.open-api.vn/api/?depth=2"
    );
    if (responsive.status === 200) {
      setLocationData(responsive.data);
    }
  };
  useEffect(() => {
    search();
    searchOrder();
  }, [orderId]);
  const search = () => {
    axios({
      method: "GET",
      url: `${apiUrl}/DetailPayments`,
      params: {
        access_token,
        filter: {
          where: {
            paymentId: orderId,
          },
          include: "mobiphone",
        },
      },
    })
      .then((result) => {
        setOrderProducts(result.data);
      })
      .catch((err) => console.log(err));
  };

  const searchOrder = () => {
    axios({
      method: "GET",
      url: `${apiUrl}/Payments/${orderId}`,
      params: {
        access_token,
        filter: {
          include: ["mobiphone", "account"],
        },
      },
    })
      .then((result) => {
        setOrder(result.data);
      })
      .catch((err) => console.log(err));
  };
  let city = locationData?.filter((item) => item.code == order?.city)[0];
  let district = city?.districts?.filter(
    (item) => item.code == order?.district
  )[0]?.name;
  const currencyFormat = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <h3 className="mb-3 mt-7">Chi tiết đơn hàng</h3>
          <Form>
            <div className="order__detail feedback">
              <label>Thông tin người dùng</label>
              <table>
                <thead>
                  <th>Họ tên</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Tỉnh/Thành phố</th>
                  <th>Địa chỉ gửi</th>
                </thead>
                <tbody>
                  <td>
                    {order?.name}
                  </td>
                  <td>{order?.phone}</td>
                  <td>{order?.email}</td>
                  <td>
                    {city?.name} - {district}
                  </td>
                  <td>{order?.address}</td>
                </tbody>
              </table>
              <div style={{ height: 50 }}></div>
              <label>Thông tin sản phẩm</label>
              <table>
                <thead>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </thead>
                <tbody>
                  {orderProducts?.map((orderProduct, index) => {
                    return (
                      <tr key={index}>
                        <td>{orderProduct?.mobiphone?.name}</td>
                        <td>
                          <Image
                            src={orderProduct?.mobiphone?.photoURL}
                            alt="photoURL"
                            className="user-avatar xl-avatar"
                          />
                        </td>
                        <td>{currencyFormat(orderProduct?.mobiphone?.price)}</td>
                        <td>{orderProduct?.amount}</td>
                        <td>
                          {currencyFormat(
                            Number(
                              orderProduct?.mobiphone?.price *
                                orderProduct?.amount
                            )
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ height: 50 }}></div>
            <label>Trạng thái</label>
            <InputGroup>
              <Form.Control
                autoFocus
                required
                type="text"
                value={order?.status}
                disabled
              />
            </InputGroup>
            <div style={{ height: 50 }}></div>
            <label>Tổng Tiền (Đã bao gồm cả phí ship)</label>
            <InputGroup>
              <Form.Control
                autoFocus
                required
                type="text"
                value={currencyFormat(Number(order?.price) + Number(order?.fee))}
                disabled
              />
            </InputGroup>
            <div style={{ height: 50 }}></div>
            <label>Ghi chú</label>
            <InputGroup>
              <Form.Control
                autoFocus
                required
                type="text"
                value={order?.note}
                disabled
              />
            </InputGroup>

            <Button
              variant="secondary"
              type="button"
              className="m-3"
              onClick={() => history.goBack()}
            >
              Quay lại
            </Button>
          </Form>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
