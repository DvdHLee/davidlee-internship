import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/owl.carousel.css";
import "../../css/styles/owl.theme.css";
import "../../css/styles/owl.transitions.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  var settings = {
    className: "owl-theme",
    margin: 10,
    loop: true,
    dots: false,
    nav: true,
    responsive: {
      1200: {
        items: 4,
      },
      768: {
        items: 3,
      },
      600: {
        items: 2,
      },
      0: {
        items: 1,
      },
    },
    key: 1,
  };

  const fetchHotCollectionsData = async () => {
    try {
      const endpoint =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
      const response = await axios.get(endpoint);
      const tempHotCollections = [];
      response.data.map((element) => {
        tempHotCollections.push(
          <div
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            key={element.id}
            style={{ padding: 0 }}
          >
            <div className="nft_coll">
              <div className="nft_wrap" style={{ height: "100%" }}>
                <Link to="/item-details">
                  <img
                    src={element.nftImage}
                    className="lazy img-fluid"
                    alt=""
                    style={{ height: "fit-content" }}
                  />
                </Link>
              </div>
              <div className="nft_coll_pp">
                <Link to="/author">
                  <img
                    className="lazy pp-coll"
                    src={element.authorImage}
                    alt=""
                  />
                </Link>
                <i className="fa fa-check"></i>
              </div>
              <div className="nft_coll_info">
                <Link to="/explore">
                  <h4>{element.title}</h4>
                </Link>
                <span>ERC-{element.code}</span>
              </div>
            </div>
          </div>
        );
      });
      setHotCollections([
        <OwlCarousel {...settings}>{tempHotCollections}</OwlCarousel>,
      ]);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    var skeletonHotCollections = [];
    for (let i = 0; i < 4; i++) {
      skeletonHotCollections.push(
        <div
          className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          key={i}
          style={{ padding: 0 }}
        >
          <div className="nft_coll">
            <div className="nft_wrap" style={{ height: "100%" }}>
              <Link to="/item-details">
                <div
                  className="skeleton-box"
                  style={{width: "100%", height: "200px"}}
                ></div>
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <div
                  className="skeleton-box"
                  style={{width: "50px", height: "50px", borderRadius: "50%"}}
                ></div>
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <div className="skeleton-box" style={{width: "100px", height: "20px"}}></div>
              </Link>
              <br></br>
              <div className="skeleton-box" style={{width: "60px", height: "20px"}}></div>
            </div>
          </div>
        </div>
      );
    }
    setHotCollections(<OwlCarousel {...settings}>{skeletonHotCollections}</OwlCarousel>);
    fetchHotCollectionsData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {hotCollections}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
