import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { SERVER } from '../../apis/API'
import { getNewProductThunk } from '../../redux/productSlice'


export default function ProductList() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const search = async () => {
        let resp = await dispatch(getNewProductThunk());
        if (resp) {
            setProducts(resp)
        }
    }
    useEffect(() => {
        search() // eslint-disable-next-line
    }, []);
    const currencyFormat = (num) => {
        return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' VNĐ'
    }
    return (
        <section className="product_list section_padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="section_tittle text-center">
                            <h2>Mới nhất</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="product_list_slider owl-carousel">
                            <div className="single_product_list_slider">
                                <div className="wrap-product row align-items-center justify-content-between">
                                    {products.length > 0 && products.map((item, index) => {
                                        return (
                                            <div className="col-lg-3 col-sm-6" key={index} >
                                                <Link to={'/product/detail'}>
                                                    <div className="single_product_item bg-white">
                                                        <div className='p-4' >{item?.photoURL && <img src={`${SERVER.URL_IMAGE}${item?.photoURL}`} style={{ width: 200, height: 150, objectFit: 'cover' }} alt="" />}</div>
                                                        <div className="single_product_text">
                                                            <h4>{item?.title}</h4>
                                                            <h3>{currencyFormat(item?.price)}</h3>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
