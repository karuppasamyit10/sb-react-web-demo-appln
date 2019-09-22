import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppWrapper } from "../public/AppWrapper";
import { PATH } from "../../utils/Constants";
import { Link } from 'react-router-dom';

class fuelConversion extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        prop: PropTypes
    };

    componentDidMount() {
        document.title = "Auto Harasow | Fuel Conversion"
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
                                <li class="breadcrumb-item"><Link to={PATH.WHAT_WE_DO}>What we do</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Fuel Conversion</li>
                            </ol>
                        </nav>
                    </div>
                </section>
                <section class="container_shipping">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="sidelinks">
                                    <div class="slhead text-center medium head3">Additional Services</div>
                                    <ul class="sllinks medium">
                                        <li><Link to={PATH.PARTS_EXPRESS}>Parts Express <span><i class="fas fa-chevron-right"></i></span></Link></li>
                                        <li ><Link to={PATH.SHIPPING}>Container Shipping <span><i class="fas fa-chevron-right"></i></span></Link></li>
                                        <li class="active"><Link to={PATH.FUEL_CONVERSION}>Fuel Conversion (LPG to Gasoline)<span><i class="fas fa-chevron-right"></i></span></Link></li>
                                        <li><Link to={PATH.CAR_ACCESSORIES}>Car Accessories<span><i class="fas fa-chevron-right"></i></span></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-9">


                                <div class="head1 medium">
                                    Fuel Conversion (LPG to Gasoline)
        </div>
                                <div class="row mt-5">
                                    <div class="col-md-3 text-right">
                                        <img src={require('../../assets/img/about/what-we-do/icon_fuel.png')} class="img-fluid" alt="" />
                                        <img src={require('../../assets/img/about/what-we-do/icon_fuel.png')} class="img-fluid" alt="" />
                                    </div>
                                    <div class="col-md-9">
                                        <div class="head2 medium">Fuel Conversion(LPG to Gasoline)</div>
                                        <p class="para1">
                                            You might have noticed that many sedans in South Korea are using LPG (Liquid Petroleum Gas). YF Sonata and K5 LPi are very popular in South Korea, since LPG is much cheaper than gasoline in Korea. Therefore the Korean Manufacturers, Hyundai and Kia have developed LPG engines during a long time and now they have boosted their highest quality of new type of engine, called LPi (Liquid Propane Injection). LPi engines inject LPG directly to engine as a GDI (Gasoline Direct Injection) engine. So it has better fuel efficiency and power than LPG engines which vaporizes gas into the engine. Definitely LPi does not have ignition problem which was one of the main complaints of LPG engines.
            </p>
                                        <p class="para1">
                                            LPi engines have been installed into Hyundai NF Sonata, YF Sonata, Avante, Kia Lotze and K5 since 2004. These cars were very common in Korea, they were mainly used to be Taxi cars, Rental cars and Handicapped vehicles. Since LPi and GDi engines are similar among each other, many overseas customers prefer to convert fuel system from LPG to Gasoline and enjoy the price benefits of cars. Fuel Conversion (LPG to Gasoline) is one of the most common works for exporting cars. You can get fuel conversion (LPG to Gasoline) at reasonable price when you use harasow's Safe Payment & Shipping Service B.I.S.
            </p>
                                    </div>
                                </div>
                                <div class="dotspacer"></div>
                                <div class="row mt-4 align-items-center">
                                    <div class="col-lg-5">
                                        <img src={require('../../assets/img/about/what-we-do/img_fuel.jpg')} class="img-fluid w-100" alt="" />
                                        page                                    </div>
                                    <div class="col-lg-7">
                                        <div class="head2 medium mb-4">Fuel Conversion
                  (LPG to Gasoline)</div>
                                        <p class="para1">
                                            Replacements for related fuel parts: Fuel tank, Fuel hoses and Fuel Pump, etc.
              </p>
                                        <p class="para1">
                                            Change of ECU settings from LPi to Gasoline
              </p>
                                        <p class="para1">
                                            Exclusive use of Genuine Hyundai or Kia Parts
              </p>
                                        <p class="para1">
                                            Applicable models: Hyundai YF Sonata (2009-2015), NF Sonata (2004-2009), Avante (2010-2015), KIA K5 (2010-2015), K7 (2010-2015), Lotze (2005-2010)
              </p>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-md-12">
                                        <img src={require('../../assets/img/about/what-we-do/img_fuel02.jpg')} class="img-fluid w-100" alt="" />
                                    </div>
                                </div>
                                <div class="dotspacer"></div>
                                <div class="row mt-4">
                                    <div class="col-12">
                                        <div class="head2 medium">Conversion Charge (LPG to Gasoline)</div>
                                        <table class="table table-bordered mt-4" summary="bis charge per items">
                                            <colgroup>
                                                <col width="33.3%" />
                                                <col width="33.3%" />
                                                <col width="*" />
                                            </colgroup>
                                            <thead class="thead-light">
                                                <tr>
                                                    <th scope="col">Make</th>
                                                    <th scope="col">Model</th>
                                                    <th scope="col">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="col" rowspan="4">Hyundai</th>
                                                    <td>LF Sonata, Grandeur </td>
                                                    <td>USD 950</td>
                                                </tr>
                                                <tr>
                                                    <td>YF Sonata </td>
                                                    <td>USD 750</td>
                                                </tr>
                                                <tr>
                                                    <td>NF Sonata </td>
                                                    <td>USD 650</td>
                                                </tr>
                                                <tr>
                                                    <td>Avante</td>
                                                    <td>USD 650</td>
                                                </tr>
                                                <tr>
                                                    <th scope="col" rowspan="4">Kia</th>
                                                    <td>K7</td>
                                                    <td>USD 950</td>
                                                </tr>
                                                <tr>
                                                    <td>K5 2nd Gen,<br /> The New K5 2nd Gen<br /> (2016~)</td>
                                                    <td>USD 950</td>
                                                </tr>
                                                <tr>
                                                    <td>K5, The New K5<br />(2010~2015)</td>
                                                    <td>USD 750</td>
                                                </tr>
                                                <tr>
                                                    <td>Lotze</td>
                                                    <td>USD 650</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="dotspacer"></div>
                                <div class="row mt-4">
                                    <div class="col-12">
                                        <div class="head2 medium">How to Use</div>
                                        <div class="greybox mt-4">
                                            <p class="para1">
                                                Choose your items & give us Item No. & your full contact information and then asking "Container Shipping".
                </p>
                                            <p class="para1">
                                                Email : help@harasow.com
                </p>
                                        </div>
                                    </div>
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

export default AppWrapper(fuelConversion, null, null);
