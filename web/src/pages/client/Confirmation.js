import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

export default function Confirmation() {
    const location = useLocation();
    const orderId = location.state;
    const [order, setOrder] = useState();
    const dispatch = useDispatch();
    const search = async () => {
        // let resp = await dispatch(getOrderByIdThunk(orderId));
        // if (resp) {
        //     setOrder(resp)
        // }
    }

    useEffect(() => {
        search() // eslint-disable-next-line 
    }, [orderId]);
    console.log(orderId)
    const [locationData, setLocationData] = useState();
    let searchLocation = async () => {
        let responsive = await axios.get('https://provinces.open-api.vn/api/?depth=2');
        if (responsive.status === 200) {
            setLocationData(responsive.data)
        }
    }
    useEffect(() => {
        searchLocation() // eslint-disable-next-line 
    }, []) // eslint-disable-next-line 
    let city = locationData?.filter(item => item.code == order?.user?.city)[0] // eslint-disable-next-line 
    let districtSend = city?.districts?.filter(item => item.code == order?.user?.district)[0]?.name;
    const currencyFormat = (num) => {
        return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
    }
    return (
        <section className="confirmation_part padding_top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="confirmation_tittle">
                            <span>Cảm ơn. Đơn hàng của bạn đã được ghi nhận.</span>
                            <span>Chúng tôi đã gửi thông báo đến email của bạn.</span>
                            <br />
                            <Link to={'/'}>   Quay về trang chủ</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-lx-4">
                        <div className="single_confirmation_details">
                            <h4>Đơn hàng</h4>
                            <ul>
                                <li>
                                    <p>Mã đơn hàng</p><span>: {order?.code}</span>
                                </li>
                                <li>
                                    <p>Ngày tháng</p><span>: {moment(order?.createdAt).format("HH:mm DD/MM/YYYY")}</span>
                                </li>
                                <li>
                                    <p>Phương thức thanh toán</p><span>: Trả tiền mặt</span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-lx-4">
                        <div className="single_confirmation_details">
                            <h4>Thông tin</h4>
                            <ul>
                                <li>
                                    <p>Họ tên</p><span>: {order?.user?.fullName}</span>
                                </li>
                                <li>
                                    <p>Số điện thoại</p><span>: {order?.user?.phoneNumber}</span>
                                </li>
                                <li>
                                    <p>Email</p><span>: {order?.user?.email}</span>
                                </li>
                                <li>
                                    <p>Tỉnh/ Thành phố</p><span>: {city?.name}</span>
                                </li>
                                <li>
                                    <p>Huyện</p><span>: {districtSend}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="order_details_iner">
                            <h3>Order Details</h3>
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col" colSpan={2}>Sản phẩm</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.orderProducts?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th colSpan={2}><span>{item?.product?.title}</span></th>
                                                <th>x {item?.amount}</th>
                                                <th> <span>{currencyFormat(item?.price)}</span></th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th scope="col" colSpan={3}>Tổng tiền</th>
                                        <th scope="col">{currencyFormat(order?.totalPrice)}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
