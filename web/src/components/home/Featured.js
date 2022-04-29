import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { SERVER } from '../../apis/API'
import { getProductIphoneThunk } from '../../redux/productSlice'
import { Routes } from '../../routes';


export default function Featured() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const search = async () => {
        let resp = await dispatch(getProductIphoneThunk());
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
        <section className="feature_part padding_top">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="section_tittle text-center">
                            <h2>Apple Iphone</h2>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-7 col-sm-6">
                        <div className="single_feature_post_text bg-white" >
                            <div >
                                <p>{products[0]?.title}</p>
                                <h3>{currencyFormat(products[0]?.price)}</h3>
                                <div className="feature_btn" style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        history.push({
                                            pathname: Routes.ProductDetail.path,
                                            state: products[0]
                                        })
                                    }}
                                >EXPLORE NOW
                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                    </svg></div>
                            </div>
                            {products[0]?.photoURL && <img src={`${SERVER.URL_IMAGE}${products[0]?.photoURL}`} style={{ width: 250 }} alt="" />}
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-6">
                        <div className="single_feature_post_text bg-white">
                            <p>{products[1]?.title}</p>
                            <h3>{currencyFormat(products[1]?.price)}</h3>
                            <div className="feature_btn" style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    history.push({
                                        pathname: Routes.ProductDetail.path,
                                        state: products[1]
                                    })
                                }}
                            >EXPLORE NOW
                                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg></div>
                            {products[1]?.photoURL && <img src={`${SERVER.URL_IMAGE}${products[1]?.photoURL}`} style={{ width: 250 }} alt="" />}
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-6">
                        <div className="single_feature_post_text bg-white">
                            <p>{products[2]?.title}</p>
                            <h3>{currencyFormat(products[2]?.price)}</h3>
                            <div className="feature_btn" style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    history.push({
                                        pathname: Routes.ProductDetail.path,
                                        state: products[2]
                                    })
                                }}
                            >EXPLORE NOW
                                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg></div>
                            {products[2]?.photoURL && <img src={`${SERVER.URL_IMAGE}${products[2]?.photoURL}`} style={{ width: 250 }} alt="" />}
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-6">
                        <div className="single_feature_post_text bg-white">
                            <p>{products[3]?.title}</p>
                            <h3>{currencyFormat(products[3]?.price)}</h3>
                            <div className="feature_btn" style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    history.push({
                                        pathname: Routes.ProductDetail.path,
                                        state: products[3]
                                    })
                                }}
                            >EXPLORE NOW
                                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                </svg></div>
                            {products[3]?.photoURL && <img src={`${SERVER.URL_IMAGE}${products[3]?.photoURL}`} style={{ width: 250 }} alt="" />}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
