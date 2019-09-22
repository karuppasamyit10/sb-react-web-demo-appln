import React, { Component} from 'react';
import PropTypes from "prop-types";
import { AppWrapper } from "./public/AppWrapper";
import { formatDate } from "../utils/utils";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import { connect } from "react-redux";
import store from "store";
import {Link} from 'react-router-dom';
import Background1 from "../assets/img/search/ssangyong.jpg";
import Background2 from "../assets/img/search/hyundai.jpg";
import Background3 from "../assets/img/search/kia2.jpg";


class search extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userDetails: {}
      };
    }
  
    static propTypes = {
      prop: PropTypes
    };
  
    componentDidMount() {
        document.title = "Auto Harasow | Search"
    }
  
    render() {
      return (
        <React.Fragment>
        <section class="search-header spacerTop">
        <div class="container">
            <div class="row align-items-center shrow">
            <div class="col-md-8">
                <div class="head3">
                    Search Result - <span class="green bold">"Kia"</span> : 15,498 units
                </div>
            </div>
            <div class="col-md-4">
                <div class="sh-filters">
                <div class="row">
                    <div class="col">
                    <div class="selectdd">
                        <span class="caret"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                        <select>
                        <option selected>For Sale</option>
                        <option>Loading...</option>
                        </select>
                    </div>
                    </div>
                    <div class="col">
                    <div class="selectdd">
                        <span class="caret"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                        <select>
                        <option selected>Sort by</option>
                        <option>Loading...</option>
                        </select>
                    </div>
                    </div>
                    <div class="col">
                    <div class="selectdd">
                        <span class="caret"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                        <select>
                        <option selected>50</option>
                        <option>Loading...</option>
                        </select>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

        <section class="search-results spacerTop spacerBottom">
        <div class="container">
            <div class="row">
            <div class="col-sm-6">
                <div class="srgrid">
                <div class="row no-gutters">
                    <div class="col-4">
                    <div class="h-100 srgrid-img" 
                      style={{
                        backgroundImage: `url(${Background2})`
                      }}
                     >
                        <span class="ratings">49+</span>
                    </div>                
                    </div>
                    <div class="col-8">
                    <div class="row no-gutters srgridcontent">
                        <div class="col-12">
                            <p class="para1 medium mb-0">
                                2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                            </p>
                            <p class="para2">
                                IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                            </p>
                        </div>
                        <div class="col-12 align-self-end">
                        <div class="row no-gutters align-items-end">
                            <div class="col-5">
                            <div class="para2">
                                <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                <span>Condition Report</span>
                            </div>
                            </div>
                            <div class="col-7 text-right">
                            <div class="row no-gutters">
                                <div class="col">
                                <div class="summersale">Summer Sale</div>
                                </div>
                                <div class="col">
                                    <div class="oldprice para grey">USD 1,680</div>
                                </div>
                            </div>
                            <div class="head3 bold red">
                                USD 1,590
                            </div>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="srgrid">
                    <div class="row no-gutters">
                    <div class="col-4">
                        <div class="h-100 srgrid-img" 
                         style={{
                            backgroundImage: `url(${Background2})`
                          }}>
                        <span class="ratings">49+</span>
                        </div>                
                    </div>
                    <div class="col-8">
                        <div class="row no-gutters srgridcontent">
                        <div class="col-12">
                            <p class="para1 medium mb-0">
                                2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                            </p>
                            <p class="para2">
                                IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                            </p>
                        </div>
                        <div class="col-12 align-self-end">
                            <div class="row no-gutters align-items-end">
                            <div class="col-5">
                                <div class="para2">
                                <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                <span>Condition Report</span>
                                </div>
                            </div>
                            <div class="col-7 text-right">
                                <div class="row no-gutters">
                                <div class="col">
                                    <div class="summersale">Summer Sale</div>
                                </div>
                                <div class="col">
                                    <div class="oldprice para grey">USD 1,680</div>
                                    </div>
                                </div>
                                <div class="head3 bold red">
                                USD 1,590
                                </div>
                            </div>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="col-sm-6">
                    <div class="srgrid">
                    <div class="row no-gutters">
                        <div class="col-4">
                        <div class="h-100 srgrid-img" 
                         style={{
                            backgroundImage: `url(${Background2})`
                          }}
                        >
                            <span class="ratings">49+</span>
                        </div>                
                        </div>
                        <div class="col-8">
                        <div class="row no-gutters srgridcontent">
                            <div class="col-12">
                                <p class="para1 medium mb-0">
                                    2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                </p>
                                <p class="para2">
                                    IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                </p>
                            </div>
                            <div class="col-12 align-self-end">
                            <div class="row no-gutters align-items-end">
                                <div class="col-5">
                                <div class="para2">
                                    <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                    <span>Condition Report</span>
                                </div>
                                </div>
                                <div class="col-7 text-right">
                                <div class="row no-gutters">
                                    <div class="col">
                                    <div class="summersale">Summer Sale</div>
                                    </div>
                                    <div class="col">
                                        <div class="oldprice para grey">USD 1,680</div>
                                    </div>
                                </div>
                                <div class="head3 bold red">
                                    USD 1,590
                                </div>
                                </div>
                            </div>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="srgrid">
                        <div class="row no-gutters">
                        <div class="col-4">
                            <div class="h-100 srgrid-img" 
                             style={{
                                backgroundImage: `url(${Background2})`
                              }}>
                            <span class="ratings">49+</span>
                            </div>                
                        </div>
                        <div class="col-8">
                            <div class="row no-gutters srgridcontent">
                            <div class="col-12">
                                <p class="para1 medium mb-0">
                                    2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                </p>
                                <p class="para2">
                                    IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                </p>
                            </div>
                            <div class="col-12 align-self-end">
                                <div class="row no-gutters align-items-end">
                                <div class="col-5">
                                    <div class="para2">
                                    <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                    <span>Condition Report</span>
                                    </div>
                                </div>
                                <div class="col-7 text-right">
                                    <div class="row no-gutters">
                                    <div class="col">
                                        <div class="summersale">Summer Sale</div>
                                    </div>
                                    <div class="col">
                                        <div class="oldprice para grey">USD 1,680</div>
                                        </div>
                                    </div>
                                    <div class="head3 bold red">
                                    USD 1,590
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="srgrid">
                        <div class="row no-gutters">
                            <div class="col-4">
                            <div class="h-100 srgrid-img" 
                             style={{
                                backgroundImage: `url(${Background2})`
                              }}>
                                <span class="ratings">49+</span>
                            </div>                
                            </div>
                            <div class="col-8">
                            <div class="row no-gutters srgridcontent">
                                <div class="col-12">
                                    <p class="para1 medium mb-0">
                                        2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                    </p>
                                    <p class="para2">
                                        IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                    </p>
                                </div>
                                <div class="col-12 align-self-end">
                                <div class="row no-gutters align-items-end">
                                    <div class="col-5">
                                    <div class="para2">
                                        <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                        <span>Condition Report</span>
                                    </div>
                                    </div>
                                    <div class="col-7 text-right">
                                    <div class="row no-gutters">
                                        <div class="col">
                                        <div class="summersale">Summer Sale</div>
                                        </div>
                                        <div class="col">
                                            <div class="oldprice para grey">USD 1,680</div>
                                        </div>
                                    </div>
                                    <div class="head3 bold red">
                                        USD 1,590
                                    </div>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="srgrid">
                            <div class="row no-gutters">
                            <div class="col-4">
                                <div class="h-100 srgrid-img" 
                                 style={{
                                    backgroundImage: `url(${Background2})`
                                  }}>
                                <span class="ratings">49+</span>
                                </div>                
                            </div>
                            <div class="col-8">
                                <div class="row no-gutters srgridcontent">
                                <div class="col-12">
                                    <p class="para1 medium mb-0">
                                        2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                    </p>
                                    <p class="para2">
                                        IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                    </p>
                                </div>
                                <div class="col-12 align-self-end">
                                    <div class="row no-gutters align-items-end">
                                    <div class="col-5">
                                        <div class="para2">
                                        <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                        <span>Condition Report</span>
                                        </div>
                                    </div>
                                    <div class="col-7 text-right">
                                        <div class="row no-gutters">
                                        <div class="col">
                                            <div class="summersale">Summer Sale</div>
                                        </div>
                                        <div class="col">
                                            <div class="oldprice para grey">USD 1,680</div>
                                            </div>
                                        </div>
                                        <div class="head3 bold red">
                                        USD 1,590
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="srgrid">
                            <div class="row no-gutters">
                                <div class="col-4">
                                <div class="h-100 srgrid-img" 
                                 style={{
                                    backgroundImage: `url(${Background2})`
                                  }}>
                                    <span class="ratings">49+</span>
                                </div>                
                                </div>
                                <div class="col-8">
                                <div class="row no-gutters srgridcontent">
                                    <div class="col-12">
                                        <p class="para1 medium mb-0">
                                            2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                        </p>
                                        <p class="para2">
                                            IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                        </p>
                                    </div>
                                    <div class="col-12 align-self-end">
                                    <div class="row no-gutters align-items-end">
                                        <div class="col-5">
                                        <div class="para2">
                                            <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                            <span>Condition Report</span>
                                        </div>
                                        </div>
                                        <div class="col-7 text-right">
                                        <div class="row no-gutters">
                                            <div class="col">
                                            <div class="summersale">Summer Sale</div>
                                            </div>
                                            <div class="col">
                                                <div class="oldprice para grey">USD 1,680</div>
                                            </div>
                                        </div>
                                        <div class="head3 bold red">
                                            USD 1,590
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="srgrid">
                                <div class="row no-gutters">
                                <div class="col-4">
                                    <div class="h-100 srgrid-img" 
                                     style={{
                                        backgroundImage: `url(${Background2})`
                                      }}>
                                    <span class="ratings">49+</span>
                                    </div>                
                                </div>
                                <div class="col-8">
                                    <div class="row no-gutters srgridcontent">
                                    <div class="col-12">
                                        <p class="para1 medium mb-0">
                                            2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                        </p>
                                        <p class="para2">
                                            IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                        </p>
                                    </div>
                                    <div class="col-12 align-self-end">
                                        <div class="row no-gutters align-items-end">
                                        <div class="col-5">
                                            <div class="para2">
                                            <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                            <span>Condition Report</span>
                                            </div>
                                        </div>
                                        <div class="col-7 text-right">
                                            <div class="row no-gutters">
                                            <div class="col">
                                                <div class="summersale">Summer Sale</div>
                                            </div>
                                            <div class="col">
                                                <div class="oldprice para grey">USD 1,680</div>
                                                </div>
                                            </div>
                                            <div class="head3 bold red">
                                            USD 1,590
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="srgrid">
                                <div class="row no-gutters">
                                    <div class="col-4">
                                    <div class="h-100 srgrid-img" 
                                     style={{
                                        backgroundImage: `url(${Background2})`
                                      }}>
                                        <span class="ratings">49+</span>
                                    </div>                
                                    </div>
                                    <div class="col-8">
                                    <div class="row no-gutters srgridcontent">
                                        <div class="col-12">
                                            <p class="para1 medium mb-0">
                                                2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                            </p>
                                            <p class="para2">
                                                IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                            </p>
                                        </div>
                                        <div class="col-12 align-self-end">
                                        <div class="row no-gutters align-items-end">
                                            <div class="col-5">
                                            <div class="para2">
                                                <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                                <span>Condition Report</span>
                                            </div>
                                            </div>
                                            <div class="col-7 text-right">
                                            <div class="row no-gutters">
                                                <div class="col">
                                                <div class="summersale">Summer Sale</div>
                                                </div>
                                                <div class="col">
                                                    <div class="oldprice para grey">USD 1,680</div>
                                                </div>
                                            </div>
                                            <div class="head3 bold red">
                                                USD 1,590
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="srgrid">
                                    <div class="row no-gutters">
                                    <div class="col-4">
                                        <div class="h-100 srgrid-img" 
                                         style={{
                                            backgroundImage: `url(${Background2})`
                                          }}>
                                        <span class="ratings">49+</span>
                                        </div>                
                                    </div>
                                    <div class="col-8">
                                        <div class="row no-gutters srgridcontent">
                                        <div class="col-12">
                                            <p class="para1 medium mb-0">
                                                2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                            </p>
                                            <p class="para2">
                                                IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                            </p>
                                        </div>
                                        <div class="col-12 align-self-end">
                                            <div class="row no-gutters align-items-end">
                                            <div class="col-5">
                                                <div class="para2">
                                                <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                                <span>Condition Report</span>
                                                </div>
                                            </div>
                                            <div class="col-7 text-right">
                                                <div class="row no-gutters">
                                                <div class="col">
                                                    <div class="summersale">Summer Sale</div>
                                                </div>
                                                <div class="col">
                                                    <div class="oldprice para grey">USD 1,680</div>
                                                    </div>
                                                </div>
                                                <div class="head3 bold red">
                                                USD 1,590
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="srgrid">
                                    <div class="row no-gutters">
                                        <div class="col-4">
                                        <div class="h-100 srgrid-img" 
                                         style={{
                                            backgroundImage: `url(${Background2})`
                                          }}>
                                            <span class="ratings">49+</span>
                                        </div>                
                                        </div>
                                        <div class="col-8">
                                        <div class="row no-gutters srgridcontent">
                                            <div class="col-12">
                                                <p class="para1 medium mb-0">
                                                    2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                                </p>
                                                <p class="para2">
                                                    IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                                </p>
                                            </div>
                                            <div class="col-12 align-self-end">
                                            <div class="row no-gutters align-items-end">
                                                <div class="col-5">
                                                <div class="para2">
                                                    <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                                    <span>Condition Report</span>
                                                </div>
                                                </div>
                                                <div class="col-7 text-right">
                                                <div class="row no-gutters">
                                                    <div class="col">
                                                    <div class="summersale">Summer Sale</div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="oldprice para grey">USD 1,680</div>
                                                    </div>
                                                </div>
                                                <div class="head3 bold red">
                                                    USD 1,590
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                            
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="srgrid">
                                        <div class="row no-gutters">
                                        <div class="col-4">
                                            <div class="h-100 srgrid-img" 
                                            style={{
                                                backgroundImage: `url(${Background2})`
                                              }}
                                            >
                                            <span class="ratings">49+</span>
                                            </div>                
                                        </div>
                                        <div class="col-8">
                                            <div class="row no-gutters srgridcontent">
                                            <div class="col-12">
                                                <p class="para1 medium mb-0">
                                                    2001 Hyundai Terracan JX250 INTERCOOLER 4WD
                                                </p>
                                                <p class="para2">
                                                    IC1251931 - Used - H-100 - Van/MiniVan - 2,457cc - LHD - Manual - Front 2WD - Diesel - Yellow - S.Korea
                                                </p>
                                            </div>
                                            <div class="col-12 align-self-end">
                                                <div class="row no-gutters align-items-end">
                                                <div class="col-5">
                                                    <div class="para2">
                                                    <span class="blue"><i class="fa fa-check" aria-hidden="true"></i></span>
                                                    <span>Condition Report</span>
                                                    </div>
                                                </div>
                                                <div class="col-7 text-right">
                                                    <div class="row no-gutters">
                                                    <div class="col">
                                                        <div class="summersale">Summer Sale</div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="oldprice para grey">USD 1,680</div>
                                                        </div>
                                                    </div>
                                                    <div class="head3 bold red">
                                                    USD 1,590
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                            
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
            </div>
            <div class="row">
            <div class="col-12 text-center">
                <div class="btn-group">
                <button type="button" class="btn btn-primary btn-lg">Load More</button>
                </div>
            </div>
            </div>
        </div>
        </section>
        </React.Fragment>
      ) 
    }
}

 export default AppWrapper(search, null, null);

