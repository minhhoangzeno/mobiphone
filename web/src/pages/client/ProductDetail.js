import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { SERVER } from "../../apis/API";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { apiUrl } from "../../enviroment";
import { addToCart } from "../../helper/addToCart";

export default function ProductDetail() {
  const location = useLocation();
  const productId = location.state.id;
  const [product, setProduct] = useState();
  const user = useSelector((state) => state.auth.data);

  useEffect(() => {
    if (productId) {
      axios({
        method: "GET",
        url: `${apiUrl}/Mobiphones/${productId}`,
        params: {
          filter: {
            include: "categoryProduct",
          },
        },
      })
        .then((res) => setProduct(res.data))
        .catch((err) => console.log(err));
    }
  }, [productId]);
  const currencyFormat = (num) => {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };

  let { addToast } = useToasts();
  const addCart = async (productParams) => {
    if (user) {
      let response = await addToCart({
        productId: productParams.id,
        price: productParams.price,
        userId: user.id,
      });
      addToast(response, { appearance: "info", autoDismiss: true });
    } else {
      addToast("Bạn cần đăng nhập!", { appearance: "info", autoDismiss: true });
    }
  };
  console.log("user",user)
  return (
    <div>
      <Header />
      <div className="product_image_area section_padding">
        <div className="container">
          <div className="row s_product_inner justify-content-between">
            <div className="col-lg-7 col-xl-7">
              <div className="product_slider_img">
                <div id="vertical">
                  <div>
                    {product?.photoURL && (
                      <img
                        src={`${product?.photoURL}`}
                        style={{ height: 500 }}
                        alt=""
                      />
                    )}
                    <h4 style={{ marginTop: 20 }}>Mô tả:</h4>
                    <div
                      dangerouslySetInnerHTML={{ __html: product?.characteristic }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              <div className="s_product_text">
                <h3>{product?.name}</h3>
                <h2>{currencyFormat(product?.price)}</h2>
                <ul className="list">
                  <li>
                    <a className="active" href="/#">
                      <span>Danh mục</span> : {product?.categoryProduct?.title}
                    </a>
                  </li>
                  <li>
                    <a className="active" href="/#">
                      <span>Khuyến mãi</span>
                      <div dangerouslySetInnerHTML={{__html: product?.promotion}}></div>
                    </a>
                  </li>
                </ul>
                <br />

                <div className="card_area d-flex justify-content-between align-items-center">
                  <div
                    className="btn_3"
                    style={{ cursor: "pointer" }}
                    onClick={() => addCart(product)}
                  >
                    Thêm vào giỏ hàng
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
