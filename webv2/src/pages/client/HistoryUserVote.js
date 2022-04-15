import { Card, Container, Row, Table } from '@themesberg/react-bootstrap';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { getHistoryVoteUserThunk } from '../../redux/voteUserSlice';

export default () => {
    // let voteUser = useSelector(state => state.voteUser.data);
    // let dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getHistoryVoteUserThunk()) // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);


    return (
        <>
            <Header />

            <section className="contact-section padding_top">
                <div className="container">
                    {/* <div className="d-none d-sm-block mb-5 pb-4">
                        <div id="map" style={{ height: '480px' }} />
                    </div> */}
                    <div className="row">
                        <div className="col-12">
                            <h2 className="contact-title">Get in Touch</h2>
                        </div>
                        <div className="col-lg-8">
                            <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" noValidate="novalidate">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <textarea className="form-control w-100" name="message" id="message" cols={30} rows={9} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder="Enter Message" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control" name="name" id="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" placeholder="Enter your name" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <input className="form-control" name="email" id="email" type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" placeholder="Enter email address" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input className="form-control" name="subject" id="subject" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Enter Subject" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <a href="#" className="btn_3 button-contactForm">Send Message</a>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-home" /></span>
                                <div className="media-body">
                                    <h3>Buttonwood, California.</h3>
                                    <p>Rosemead, CA 91770</p>
                                </div>
                            </div>
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-tablet" /></span>
                                <div className="media-body">
                                    <h3>00 (440) 9865 562</h3>
                                    <p>Mon to Fri 9am to 6pm</p>
                                </div>
                            </div>
                            <div className="media contact-info">
                                <span className="contact-info__icon"><i className="ti-email" /></span>
                                <div className="media-body">
                                    <h3>support@colorlib.com</h3>
                                    <p>Send us your query anytime!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

// function TableItem({ index, voteUser }) {
//     return (
//         <tr>
//             <td>
//                 <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
//             </td>
//             <td>{voteUser.productCountDown.title}</td>
//             <td>{voteUser.productCountDown.product.title}</td>
//             <td>{voteUser.productCountDown.product.author}</td>
//             <td>{moment(voteUser.createdAt).format("HH:mm DD-MM-YYYY")}</td>
//         </tr>
//     );
// }   
