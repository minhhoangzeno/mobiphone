// import moment from 'moment';
import React, { useEffect, useState } from 'react';
// import Pagination from "react-js-pagination";
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { SERVER } from '../../apis/API';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
// import { getBlogThunk } from '../../redux/blogSlice';
// import { Routes } from '../../routes';
import '../../scss/pagination.scss';
import Blog1 from '../../images/blog/single_blog_1.png'
import Post1 from '../../images/post/post_1.png'
import Post2 from '../../images/post/post_5.png'
import { Link } from 'react-router-dom';


export default () => {
  // const [blogs, setBlogs] = useState();
  // let dispatch = useDispatch();
  // const [activePage, setActivePage] = useState(1);

  // const search = async () => {
  //   let resp = await dispatch(getBlogThunk(6 * (activePage - 1)));
  //   if (resp) {
  //     console.log(resp)
  //     setBlogs(resp)
  //   }
  // }
  // let history = useHistory();
  // useEffect(() => {
  //   search() // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activePage])
  return (
    <>
      <Header />

      <section className="blog_area padding_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="blog_left_sidebar">
                <article className="blog_item">
                  <Link to={'/blog/detail'}>
                    <div className="blog_item_img">
                      <img className="card-img rounded-0" src={Blog1} alt="" />
                      <a href="#" className="blog_item_date">
                        <h3>15</h3>
                        <p>Jan</p>
                      </a>
                    </div>
                    <div className="blog_details">
                      <a className="d-inline-block" href="single-blog.html">
                        <h2>Google inks pact for new 35-storey office</h2>
                      </a>
                      <p>That dominion stars lights dominion divide years for fourth have don't stars is that
                        he earth it first without heaven in place seed it second morning saying.</p>
                      <ul className="blog-info-link">
                        <li><a href="#"><i className="far fa-user" /> Travel, Lifestyle</a></li>
                        <li><a href="#"><i className="far fa-comments" /> 03 Comments</a></li>
                      </ul>
                    </div>
                  </Link>
                </article>
                <article className="blog_item">
                  <Link to={'/blog/detail'}>
                    <div className="blog_item_img">
                      <img className="card-img rounded-0" src={Blog1} alt="" />
                      <a href="#" className="blog_item_date">
                        <h3>15</h3>
                        <p>Jan</p>
                      </a>
                    </div>
                    <div className="blog_details">
                      <a className="d-inline-block" href="single-blog.html">
                        <h2>Google inks pact for new 35-storey office</h2>
                      </a>
                      <p>That dominion stars lights dominion divide years for fourth have don't stars is that
                        he earth it first without heaven in place seed it second morning saying.</p>
                      <ul className="blog-info-link">
                        <li><a href="#"><i className="far fa-user" /> Travel, Lifestyle</a></li>
                        <li><a href="#"><i className="far fa-comments" /> 03 Comments</a></li>
                      </ul>
                    </div>
                  </Link>
                </article>
                <article className="blog_item">
                  <Link to={'/blog/detail'}>
                    <div className="blog_item_img">
                      <img className="card-img rounded-0" src={Blog1} alt="" />
                      <a href="#" className="blog_item_date">
                        <h3>15</h3>
                        <p>Jan</p>
                      </a>
                    </div>
                    <div className="blog_details">
                      <a className="d-inline-block" href="single-blog.html">
                        <h2>Google inks pact for new 35-storey office</h2>
                      </a>
                      <p>That dominion stars lights dominion divide years for fourth have don't stars is that
                        he earth it first without heaven in place seed it second morning saying.</p>
                      <ul className="blog-info-link">
                        <li><a href="#"><i className="far fa-user" /> Travel, Lifestyle</a></li>
                        <li><a href="#"><i className="far fa-comments" /> 03 Comments</a></li>
                      </ul>
                    </div>
                  </Link>
                </article>
                <article className="blog_item">
                  <div className="blog_item_img">
                    <img className="card-img rounded-0" src={Blog1} alt="" />
                    <a href="#" className="blog_item_date">
                      <h3>15</h3>
                      <p>Jan</p>
                    </a>
                  </div>
                  <div className="blog_details">
                    <a className="d-inline-block" href="single-blog.html">
                      <h2>Google inks pact for new 35-storey office</h2>
                    </a>
                    <p>That dominion stars lights dominion divide years for fourth have don't stars is that
                      he earth it first without heaven in place seed it second morning saying.</p>
                    <ul className="blog-info-link">
                      <li><a href="#"><i className="far fa-user" /> Travel, Lifestyle</a></li>
                      <li><a href="#"><i className="far fa-comments" /> 03 Comments</a></li>
                    </ul>
                  </div>
                </article>
                <article className="blog_item">
                  <div className="blog_item_img">
                    <img className="card-img rounded-0" src={Blog1} alt="" />
                    <a href="#" className="blog_item_date">
                      <h3>15</h3>
                      <p>Jan</p>
                    </a>
                  </div>
                  <div className="blog_details">
                    <a className="d-inline-block" href="single-blog.html">
                      <h2>Google inks pact for new 35-storey office</h2>
                    </a>
                    <p>That dominion stars lights dominion divide years for fourth have don't stars is that
                      he earth it first without heaven in place seed it second morning saying.</p>
                    <ul className="blog-info-link">
                      <li><a href="#"><i className="far fa-user" /> Travel, Lifestyle</a></li>
                      <li><a href="#"><i className="far fa-comments" /> 03 Comments</a></li>
                    </ul>
                  </div>
                </article>
                <nav className="blog-pagination justify-content-center d-flex">
                  <ul className="pagination">
                    <li className="page-item">
                      <a href="#" className="page-link" aria-label="Previous">
                        <i className="ti-angle-left" />
                      </a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">1</a>
                    </li>
                    <li className="page-item active">
                      <a href="#" className="page-link">2</a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link" aria-label="Next">
                        <i className="ti-angle-right" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog_right_sidebar">
                <aside className="single_sidebar_widget search_widget">
                  <form action="#">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search Keyword" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Search Keyword'" />
                        <div className="input-group-append">
                          <button className="btn" type="button"><i className="ti-search" /></button>
                        </div>
                      </div>
                    </div>
                    <button className="button rounded-0 primary-bg text-white w-100 btn_1" type="submit">Search</button>
                  </form>
                </aside>
                <aside className="single_sidebar_widget post_category_widget">
                  <h4 className="widget_title">Category</h4>
                  <ul className="list cat-list">
                    <li>
                      <a href="#" className="d-flex">
                        <p>Resaurant food</p>
                        <p>(37)</p>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex">
                        <p>Travel news</p>
                        <p>(10)</p>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex">
                        <p>Modern technology</p>
                        <p>(03)</p>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex">
                        <p>Product</p>
                        <p>(11)</p>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex">
                        <p>Inspiration</p>
                        <p>21</p>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="d-flex">
                        <p>Health Care (21)</p>
                        <p>09</p>
                      </a>
                    </li>
                  </ul>
                </aside>
                <aside className="single_sidebar_widget popular_post_widget">
                  <h3 className="widget_title">Recent Post</h3>
                  <div className="media post_item">
                    <img src={Post1} alt="post" />
                    <div className="media-body">
                      <a href="single-blog.html">
                        <h3>From life was you fish...</h3>
                      </a>
                      <p>January 12, 2019</p>
                    </div>
                  </div>
                  <div className="media post_item">
                    <img src={Post1} alt="post" />
                    <div className="media-body">
                      <a href="single-blog.html">
                        <h3>The Amazing Hubble</h3>
                      </a>
                      <p>02 Hours ago</p>
                    </div>
                  </div>
                  <div className="media post_item">
                    <img src={Post1} alt="post" />
                    <div className="media-body">
                      <a href="single-blog.html">
                        <h3>Astronomy Or Astrology</h3>
                      </a>
                      <p>03 Hours ago</p>
                    </div>
                  </div>
                  <div className="media post_item">
                    <img src={Post1} alt="post" />
                    <div className="media-body">
                      <a href="single-blog.html">
                        <h3>Asteroids telescope</h3>
                      </a>
                      <p>01 Hours ago</p>
                    </div>
                  </div>
                </aside>
                <aside className="single_sidebar_widget tag_cloud_widget">
                  <h4 className="widget_title">Tag Clouds</h4>
                  <ul className="list">
                    <li>
                      <a href="#">project</a>
                    </li>
                    <li>
                      <a href="#">love</a>
                    </li>
                    <li>
                      <a href="#">technology</a>
                    </li>
                    <li>
                      <a href="#">travel</a>
                    </li>
                    <li>
                      <a href="#">restaurant</a>
                    </li>
                    <li>
                      <a href="#">life style</a>
                    </li>
                    <li>
                      <a href="#">design</a>
                    </li>
                    <li>
                      <a href="#">illustration</a>
                    </li>
                  </ul>
                </aside>
                <aside className="single_sidebar_widget instagram_feeds">
                  <h4 className="widget_title">Instagram Feeds</h4>
                  <ul className="instagram_row flex-wrap">
                    <li>
                      <a href="#">
                        <img className="img-fluid" src={Post2} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="img-fluid" src={Post2} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="img-fluid" src={Post2} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="img-fluid" src={Post2} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="img-fluid" src={Post2} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img className="img-fluid" src={Post2} alt="" />
                      </a>
                    </li>
                  </ul>
                </aside>
                <aside className="single_sidebar_widget newsletter_widget">
                  <h4 className="widget_title">Newsletter</h4>
                  <form action="#">
                    <div className="form-group">
                      <input type="email" className="form-control" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email'" placeholder="Enter email" required />
                    </div>
                    <button className="button rounded-0 primary-bg text-white w-100 btn_1" type="submit">Subscribe</button>
                  </form>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}