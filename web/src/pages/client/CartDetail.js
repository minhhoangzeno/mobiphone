import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { apiUrl } from "../../enviroment";
import { Routes } from "../../routes";

const access_token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
export default function Cart() {
  const [orderProducts, setOrderProducts] = useState([]);
  const [price, setPrice] = useState();
  const history = useHistory();
  const user = useSelector((state) => state.auth.data);
  console.log(user);
  useEffect(() => {
    search();
  }, [user]);
  const search = () => {
    if (user) {
      axios({
        method: "GET",
        url: `${apiUrl}/OrderProducts/get-order-cart`,
        params: {
          access_token,
          user: user?.id,
        },
      })
        .then((result) => {
          if (result.data.length > 0) {
            setOrderProducts(result.data);
            let total = 0;
            result.data.forEach(
              (orderProduct) =>
                (total += orderProduct.amount * orderProduct.price)
            );
            setPrice(total);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const currencyFormat = (num) => {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  const checkout = () => {
    history.push({
      pathname: Routes.Checkout.path,
      state: {
        price,
        orderProducts,
        orderId: orderProducts[0].orderId,
      },
    });
  };
  return (
    <>
      <Header />
      <div className="cart-area section-padding-0-100 clearfix mt-7">
        <div className="container">
          {orderProducts?.length > 0 ? (
            <>
              <div className="row">
                <div className="col-12">
                  <div className="cart-table clearfix">
                    {orderProducts?.length > 0 ? (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderProducts?.map((orderProduct, index) => {
                            return (
                              <OrderProduct
                                price={price}
                                setPrice={setPrice}
                                key={index}
                                orderProduct={orderProduct}
                                search={search}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div>Giỏ hàng trống!</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-6"></div>
                {/* <!-- Cart Totals --> */}
                <div className="col-12 col-lg-6">
                  <div className="cart-totals-area mt-70">
                    <h5 className="title--">Giỏ hàng</h5>
                    <div className="total d-flex justify-content-between">
                      <h5>Tổng</h5>
                      <h5>{currencyFormat(price)}</h5>
                    </div>
                    <div className="checkout-btn mb-4 mt-4">
                      <div
                        onClick={checkout}
                        style={{cursor:'pointer'}}
                        className="alazea-btn w-100 text-center btn_3"
                      >
                        Thanh toán
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="my-8">Giỏ hàng trống!</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

const OrderProduct = ({ orderProduct, search, price, setPrice }) => {
  const [amount, setAmount] = useState(orderProduct.amount);

  const currencyFormat = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };
  let { addToast } = useToasts();
  const deleteOrderProduct = async () => {
    axios({
      method: "DELETE",
      url: `${apiUrl}/OrderProducts/${orderProduct.id}`,
      params: {
        access_token,
      },
    }).then(() => {
      addToast("Xóa sản phẩm khỏi giỏ hàng thành công!", {
        appearance: "success",
        autoDismiss: true,
      });
      search();
    });
  };
  const updateOrderProduct = async (num) => {
    axios({
      method: "PATCH",
      url: `${apiUrl}/OrderProducts/${orderProduct.id}`,
      params: {
        access_token,
      },
      data: { amount: num },
    }).then(() => {
      search();
    });
  };
  const addPrice = () => {
    updateOrderProduct(orderProduct.amount + 1);
    let total = price;
    total += orderProduct.price;
    setPrice(total);
  };
  const subPrice = () => {
    if (orderProduct.amount == 1) {
      deleteOrderProduct();
      let total = price;
      total -= orderProduct.price;
      setPrice(total);
    } else {
      let total = price;
      total -= orderProduct.price;
      setPrice(total);
      updateOrderProduct(orderProduct.amount - 1);
    }
  };
  return (
    <tr>
      <td className="cart_product_img">
        <img
          src={orderProduct?.product?.photoURL}
          alt="Product"
          style={{ width: 150, height: "auto", objectFit: "contain" }}
        />
        <h5 style={{ marginTop: 15 }} className="font-bold">
          {orderProduct?.product?.title}
        </h5>
      </td>
      <td className="qty">
        <div className="quantity">
          <button
            style={{ background: "transparent", boxShadow: "none", border: 1 }}
            onClick={subPrice}
          >
            -
          </button>
          <div>{orderProduct.amount}</div>
          <button
            style={{ background: "transparent", boxShadow: "none", border: 1 }}
            onClick={addPrice}
          >
            +
          </button>
        </div>
      </td>
      <td className="price">
        <span>{currencyFormat(orderProduct?.product?.price)}</span>
      </td>
      <td className="total_price">
        <span>
          {currencyFormat(
            Number(orderProduct.product.price * Number(orderProduct.amount))
          )}
        </span>
      </td>
      <td className="action">
        <div style={{ cursor: "pointer" }} onClick={deleteOrderProduct}>
          <i className="icon_close"></i>
        </div>
      </td>
    </tr>
  );
};
