import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from 'react-router-dom';

class specialService extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        prop: PropTypes
    };

    componentDidMount() {
        document.title = "Auto Harasow | Special Services"
    }


    render() {
        return (
            <React.Fragment>
                <section class="breadcrumb_wrap">
                    <div class="container">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to={PATH.DASHBOARD}>Home</Link></li>
                                <li class="breadcrumb-item"><Link to={PATH.ABOUT_US}>About Us</Link></li>
                                <li class="breadcrumb-item"><Link to={PATH.HOW_WE_WORK}>How we work</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Harasow special service</li>
                            </ol>
                        </nav>
                    </div>
                </section>
                <section class="container_shipping">
                    <div class="container">
                        <div class="row">

                            <div class="col-md-12">


                                <div class="head1 medium">
                                    Harasow Special Service
        </div>
                                <div class="row mt-4">
                                    <div class="col-12">
                                        <div class="head2 mb-3 bold text-center">Harasow's 5 Guarantees for your safe trade</div>
                                        <p class="para1">
                                            We understand that you're concerned about buying a car abroad. There are many things to consider, such as the safety of your money, the condition of the car, the accuracy of shipping, and even the full supply of the parts of your vehicle. So, as a way to relieve you of your worries, Autowini has 5 Guarantees that guarantee a safe trade!
           </p>
                                        <div class="row mt-4 justify-content-center">
                                            <div class="col-md-4 text-center">
                                                <img src={require('../../assets/img/about/how-we-work/icon_guarantees01.png')} class="img-fluid" alt="" />
                                                <p class="head3 bold">Price Guarantee</p>
                                                <p class="para1">
                                                    We guarantee the best prices because we source from local sellers directly.
              </p>
                                            </div>
                                            <div class="col-md-4 text-center">
                                                <img src={require('../../assets/img/about/how-we-work/icon_guarantees02.png')} class="img-fluid" alt="" />
                                                <p class="head3 bold">Shipping Guarantee</p>
                                                <p class="para1">
                                                    We deliver our items on time with an all-in-one order tracking system.
                </p>
                                            </div>
                                            <div class="col-md-4 text-center">
                                                <img src={require('../../assets/img/about/how-we-work/icon_guarantees03.png')} class="img-fluid" alt="" />
                                                <p class="head3 bold">Condition Guarantee</p>
                                                <p class="para1">
                                                    Even though you buy online, you can clearly see what you are buying through detailed photos, videos, and a Condition Report on the vehicle.
                  </p>
                                            </div>
                                            <div class="col-md-4 text-center">
                                                <img src={require('../../assets/img/about/how-we-work/icon_guarantees04.png')} class="img-fluid" alt="" />
                                                <p class="head3 bold">Refund Guarantee</p>
                                                <p class="para1">
                                                    We offer a 100% money back guarantee in case you don't receive your item.
                    </p>
                                            </div>
                                            <div class="col-md-4 text-center">
                                                <img src={require('../../assets/img/about/how-we-work/icon_guarantees05.png')} class="img-fluid" alt="" />
                                                <p class="head3 bold">Parts Supply Guarantee</p>
                                                <p class="para1">
                                                    If you can't find specific parts in your country,
                          we can provide and deliver them from here.
                      </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="gurantees bggrey py-5 mt-4">
                        <div class="container">
                            <div class="head1 bold green text-center">Harasow's 5 Guarantees</div>
                            <div class="row mt-4">
                                <div class="col-md-12 text-center">
                                    <img src={require('../../assets/img/about/how-we-work/icon_guarantees04.png')} class="img-fluid" alt="" />
                                    <p class="head3 bold">Price Guarantee</p>
                                    <p class="para1">
                                        We guarantee the best prices because we source from local sellers directly.
          </p>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_1-1.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Direct Supply</p>
                                        <p class="para1">
                                            We supply vehicles directly from our domestic used car market & domestic used car auctions.
                              Dealers and brokers can not beat our prices.
          </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_1-2.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Originality of Source</p>
                                        <p class="para1">
                                            Hyundai & KIA vehicles are manufactured in South Korea, and we sell these cars directly
                                            from Korea.
          </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_1-2.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Haggle-free Prices</p>
                                        <p class="para1">
                                            To provide our customers with the best of benefits, we offer 1 price, including the shipping rate, that is so good there is no need to bargain for a lower price!
          </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gurantees  py-5 mt-4">
                        <div class="container">
                            <div class="row mt-4">
                                <div class="col-md-12 text-center">
                                    <img src={require('../../assets/img/about/how-we-work/icon_guarantees02.png')} class="img-fluid" alt="" />
                                    <p class="head3 bold">Shipping Guarantee</p>
                                    <p class="para1">
                                        We deliver our items on time with an all-in-one order tracking system.
              </p>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_2-1.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Professional Shipping Team</p>
                                        <p class="para1">
                                            In close cooperation with major shipping lines, we accurately book shipping schedules, submit documents, and declare exports.
              </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_2-2.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Best Shipping Option</p>
                                        <p class="para1">
                                            Your items are placed in either the Ro-Ro service or the container service, both of which are very good shipping options, depending on the item you bought.
              </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_2-3en.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Order Tracking System</p>
                                        <p class="para1">
                                            By visiting the ""My Wini > Track my Order"" page, you can see your order status and also track your documents.
              </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gurantees bggrey py-5 mt-4">
                        <div class="container">

                            <div class="row mt-4">
                                <div class="col-md-12 text-center">
                                    <img src={require('../../assets/img/about/how-we-work/icon_guarantees03.png')} class="img-fluid" alt="" />
                                    <p class="head3 bold">Condition Guarantee</p>
                                    <p class="para1">
                                        Even though you buy online, you can clearly see what you are buying through detailed photos, videos, and a Condition Report on the vehicle.
                  </p>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_3-1.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Vehicle Condition Report
                      (VCR)</p>
                                        <p class="para1">
                                            Each vehicle has a Vehicle condition Report(VCR) that ensures the current condition and working status of the vehicle.
                  </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_3-2.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Photos & Video</p>
                                        <p class="para1">
                                            Detailed photos and a video are provided to help you see most parts of the vehicle such as the condition of the underbody, the exterior, the interior, and the vehicle's functions.
                  </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_3-3.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Engine Start Check</p>
                                        <p class="para1">
                                            The vehicle's engine start and the working status of the Transmission are checked before it is boarded.
                  </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gurantees  py-5 mt-4">
                        <div class="container">

                            <div class="row mt-4">
                                <div class="col-md-12 text-center">
                                    <img src={require('../../assets/img/about/how-we-work/icon_guarantees04.png')} class="img-fluid" alt="" />
                                    <p class="head3 bold">Refund Guarantee</p>
                                    <p class="para1">
                                        We offer a 100% money back guarantee in case you don't receive your item.
                      </p>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_4-1.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Money Security</p>
                                        <p class="para1">
                                            We hold your money until the item is safe in our warehouse.
                      </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_4-2.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Departure Guarantee</p>
                                        <p class="para1">
                                            We guarantee that your item will depart in at most 2 months after we receive your money.
                      </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_4-3.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">100% Full Refund</p>
                                        <p class="para1">
                                            We guarantee a 100% refund in case the item is not shipped or does not arrive at your port.
                      </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gurantees bggrey py-5 mt-4">
                        <div class="container">

                            <div class="row mt-4">
                                <div class="col-md-12 text-center">
                                    <img src={require('../../assets/img/about/how-we-work/icon_guarantees05.png')} class="img-fluid" alt="" />
                                    <p class="head3 bold">Parts Supply Guarantee</p>
                                    <p class="para1">
                                        If you can't find specific parts in your country,
                                        we can provide and deliver them from here.
                          </p>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_5-1.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Variety of Inventory</p>
                                        <p class="para1">
                                            We provide a wide selection of parts options for your budget
                                            : Genuine / OEM / Rebuilt / Used
                          </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_5-2.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Delivery by Air & Sea</p>
                                        <p class="para1">
                                            Parts will be shipped by air or sea according to its size and the type of order.
                          </p>
                                    </div>
                                    <div class="col-md-4">
                                        <img src={require('../../assets/img/about/how-we-work/img_guarantees_5-3.jpg')} class="img-fluid" alt="" />
                                        <p class="head3 medium mt-2">Fair Price</p>
                                        <p class="para1">
                                            By partnering with local market suppliers, we are able to offer good prices.
                          </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="dotspacer"></div>
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="head2 medium">Need Help?</div>
                                <div class="greybox mt-4">
                                    <p class="para1">
                                        If you have any further questions, contact us at any time! We are here to support you.
          </p>
                                    <p class="para1">
                                        Email : bis@harasow.com
          </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="spacer1"></div>
            </React.Fragment>
        );
    }
}

export default AppWrapper(specialService, null, null);
