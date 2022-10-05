import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiUrl } from "../../enviroment";
import { Routes } from "../../routes";

export default function BestSeller() {
  const [blogs, setBlogs] = useState([]);
  const history = useHistory();
  const search = async () => {
    axios({
      method: "GET",
      url: `${apiUrl}/Blogs`,
      params: {
        filter: {
          limit: 4,
          where: {
            order: 'desc',
          },
        },
      },
    }).then((result) => {
      setBlogs(result.data.data);
    });
  };
  useEffect(() => {
    search(); // eslint-disable-next-line
  }, []);
  return (
    <section className="product_list best_seller section_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="section_tittle text-center">
              <h2>Bài viết</h2>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-12">
            <div className="best_product_slider row owl-carousel">
              {blogs.length > 0 &&
                blogs.map((item, index) => {
                  return (
                    <div
                      className="single_product_item col-lg-3 col-sm-6 "
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        history.push({
                          pathname: Routes.BlogDetail.path,
                          state: item,
                        });
                      }}
                    >
                      <div className="bg-white p-4">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item?.photoURL && (
                            <img
                              src={`${item?.photoURL}`}
                              style={{
                                width: 150,
                                height: 150,
                                objectFit: "cover",
                              }}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="single_product_text p-2">
                          <h4>{item?.title}</h4>
                          <h3>
                            {moment(item?.createdAt).format("DD - MM - YYYY")}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
