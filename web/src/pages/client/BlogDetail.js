import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { SERVER } from "../../apis/API";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { apiUrl } from "../../enviroment";
import { getBlogOtherThunk } from "../../redux/blogSlice";
import { Routes } from "../../routes";
export default function BlogDetail() {
  const location = useLocation();
  const blog = location.state;
  return (
    <div>
      <Header />
      <section className="blog_area single-post-area padding_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 posts-list">
              <div className="single-post">
                <div className="feature-img">
                  <img
                    className="img-fluid"
                    src={`${SERVER.URL_IMAGE}${blog?.photoURL}`}
                    alt=""
                  />
                </div>
                <div className="blog_details">
                  <h2 dangerouslySetInnerHTML={{ __html: blog?.title }}></h2>
                  <ul className="blog-info-link mt-3 mb-4">
                    <li>
                      <i className="far fa-user" /> {blog?.createdBy?.fullName}
                    </li>
                  </ul>
                  <p
                    className="excert"
                    dangerouslySetInnerHTML={{ __html: blog?.metaDescription }}
                  ></p>
                  <p dangerouslySetInnerHTML={{ __html: blog?.content }}></p>
                </div>
              </div>
            </div>
            <BlogOther blogId={blog?.id} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function BlogOther({ blogId }) {
  const [blogs, setBlogs] = useState();
  const history = useHistory();
  const search = async () => {
    axios({
      method: "GET",
      url: `${apiUrl}/Blogs`,
      params: {
        filter: {
          where: {
            id: { neq: blogId },
          },
          limit: 4,
        },
      },
    })
      .then((result) => setBlogs(result.data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    search(); // eslint-disable-next-line
  }, [blogId]);
  return (
    <div className="col-lg-4 mt-4">
      <div className="blog_right_sidebar">
        <aside
          className="single_sidebar_widget popular_post_widget"
          style={{ padding: 0 }}
        >
          <h3 className="widget_title">Bài viết khác</h3>
          {blogs &&
            blogs?.map((item, index) => {
              return (
                <div
                  className="media post_item post__boxshadow"
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push({
                      pathname: Routes.BlogDetail.path,
                      state: item,
                    });
                  }}
                >
                  <img
                    src={`${item?.photoURL}`}
                    alt="post"
                  />
                  <div className="media-body mt-2" style={{ padding: 15 }}>
                    <h3>{item?.title}</h3>
                    <p>{moment(item?.createdAt).format("HH:mm DD/MM/YYYY")}</p>
                  </div>
                </div>
              );
            })}
        </aside>
      </div>
    </div>
  );
}
