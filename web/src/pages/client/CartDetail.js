import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/layout/Header'
import Product1 from '../../images/product/single-product/cart-1.jpg'

export default function CartDetail() {
    const [count, setCount] = useState(1)

    return (
        <div>
            <Header />
            <section className="cart_area padding_top cart-section">
                <div className="container">
                    <div className="cart_inner">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className='table-cart'>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='table-cart'>
                                        <td>
                                            <div className="media">
                                                <div className="d-flex wrap-image-cart">
                                                    <img src={Product1} alt="" />
                                                </div>
                                                <div className="media-body">
                                                    <p>Minimalistic shop for multipurpose use</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>$360.00</h5>
                                        </td>
                                        <td>
                                            <div className="product_count">
                                                <button className="input-number-decrement" onClick={() => setCount(count - 1)}>
                                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                                                    </svg>
                                                </button>
                                                <p>{count}</p>
                                                <button className="input-number-increment" onClick={() => setCount(count + 1)}>
                                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>$720.00</h5>
                                        </td>
                                    </tr>
                                    <tr className='table-cart'>
                                        <td>
                                            <div className="media">
                                                <div className="d-flex wrap-image-cart">
                                                    <img src={Product1} alt="" />
                                                </div>
                                                <div className="media-body">
                                                    <p>Minimalistic shop for multipurpose use</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>$360.00</h5>
                                        </td>
                                        <td>
                                            <div className="product_count">
                                                <button className="input-number-decrement" onClick={() => setCount(count - 1)}>
                                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                                                    </svg>
                                                </button>
                                                <p>{count}</p>
                                                <button className="input-number-increment" onClick={() => setCount(count + 1)}>
                                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>$720.00</h5>
                                        </td>
                                    </tr>
                                    <tr className='table-cart'>
                                        <td>
                                            <div className="media">
                                                <div className="d-flex wrap-image-cart">
                                                    <img src={Product1} alt="" />
                                                </div>
                                                <div className="media-body">
                                                    <p>Minimalistic shop for multipurpose use</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>$360.00</h5>
                                        </td>
                                        <td>
                                            <div className="product_count">
                                                <button className="input-number-decrement" onClick={() => setCount(count - 1)}>
                                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                                                    </svg>
                                                </button>
                                                <p>{count}</p>
                                                <button className="input-number-increment" onClick={() => setCount(count + 1)}>
                                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <h5>$720.00</h5>
                                        </td>
                                    </tr>
                                    <tr className="bottom_button">
                                        <td>
                                            <a className="btn_1" href="#">Update Cart</a>
                                        </td>
                                        <td />
                                        <td />
                                        <td>
                                            <div className="cupon_text float-right">
                                                <a className="btn_1" href="#">Close Coupon</a>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td />
                                        <td />
                                        <td>
                                            <h5>Subtotal</h5>
                                        </td>
                                        <td>
                                            <h5>$2160.00</h5>
                                        </td>
                                    </tr>
                                    <tr className="shipping_area">
                                        <td />
                                        <td />
                                        <td>
                                            <h5>Shipping</h5>
                                        </td>
                                        <td>
                                            <div className="shipping_box">
                                                <ul className="list">
                                                    <li>
                                                        <a href="#">Flat Rate: $5.00</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Free Shipping</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Flat Rate: $10.00</a>
                                                    </li>
                                                    <li className="active">
                                                        <a href="#">Local Delivery: $2.00</a>
                                                    </li>
                                                </ul>
                                                <h6>
                                                    Calculate Shipping
                                                    <i className="fa fa-caret-down" aria-hidden="true" />
                                                </h6>
                                                <select className="shipping_select">
                                                    <option value={1}>Bangladesh</option>
                                                    <option value={2}>India</option>
                                                    <option value={4}>Pakistan</option>
                                                </select>
                                                <select className="shipping_select section_bg">
                                                    <option value={1}>Select a State</option>
                                                    <option value={2}>Select a State</option>
                                                    <option value={4}>Select a State</option>
                                                </select>
                                                <input type="text" placeholder="Postcode/Zipcode" />
                                                <a className="btn_1 update_detail" href="#">Update Details</a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="checkout_btn_inner float-right">
                                <Link className="btn_1" to={'/product'}>
                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                                    </svg>
                                    Continue Shopping
                                </Link>
                                <Link className="btn_1 checkout_btn_1" to={'/checkout'}>
                                    Proceed to checkout
                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}