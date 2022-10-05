import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { SERVER } from "../../apis/API";
import BestSeller from "../../components/home/BestSeller";
// import { SERVER } from '../../apis/API';
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AmountProduct from "../../components/product/AmountProduct";
import { apiUrl } from "../../enviroment";
import {
  getAmountProductCategoryThunk,
  getProductThunkAdminSkip,
} from "../../redux/productSlice";
import { Routes } from "../../routes";
import "../../scss/pagination.scss";
export default function Product() {
  let history = useHistory();
  const [categoryId, setCategoryId] = useState();
  const [product, setProduct] = useState();

  const [activePage, setActivePage] = useState(1);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const search = async () => {
    axios({
      method: "GET",
      url: `${apiUrl}/CategoryProducts`,
    })
      .then((result) => {
        setCategories(result.data.data);
        setCategoryId(result.data.data[0]?.id);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    search(); // eslint-disable-next-line
  }, []);
  const searchProduct = async () => {
    if (categoryId) {
      axios({
        method: "GET",
        url: `${apiUrl}/Products`,
        params: {
          filter: {
            where: {
              categoryProductId: categoryId,
            },
            skip: 6 * (activePage - 1),
          },
        },
      })
        .then((result) => setProduct(result.data))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    searchProduct(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, activePage]);

  const currencyFormat = (num) => {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  };

  return (
    <>
      <div>
        <Header />
        <section className="cat_product_area section_padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <AmountProduct
                  categories={categories}
                  setCategoryId={setCategoryId}
                />
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="product_top_bar d-flex justify-content-between align-items-center">
                      <div className="single_product_menu d-flex">
                        <h5 className="">Sắp xếp theo : </h5>
                        <select
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          {categories.map((item, index) => {
                            return (
                              <option key={index} value={item?.id}>
                                {item?.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center latest_product_inner">
                  {product &&
                    product?.data?.map((item, index) => {
                      return (
                        <div
                          className="col-lg-4 col-sm-6"
                          key={index}
                          onClick={() => {
                            history.push({
                              pathname: Routes.ProductDetail.path,
                              state: item,
                            });
                          }}
                        >
                          <div className="single_product_item bg-white">
                            <div className="p-4">
                              {item?.photoURL && (
                                <img
                                  src={`${item?.photoURL}`}
                                  style={{
                                    width: 150,
                                    height: 100,
                                    objectFit: "cover",
                                  }}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="single_product_text">
                              <h4>{item?.title}</h4>
                              <h3>{currencyFormat(item?.price)}</h3>
                              <div className="add_cart">
                                Xem
                                <i className="ti-heart" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  <div className="col-lg-12">
                    <div className="wrapper-paginate">
                      {product && (
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={6}
                          totalItemsCount={product?.total}
                          pageRangeDisplayed={3}
                          onChange={(value) => setActivePage(value)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BestSeller />
        <Footer />
      </div>
    </>
  );
}
