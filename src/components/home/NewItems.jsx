import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "../../css/styles/owl.carousel.css";
import "../../css/styles/owl.theme.css";
import "../../css/styles/owl.transitions.css";
import NFTCard from "./NFTCard";

const NewItems = () => {
  const [newItemsData, setNewItemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  var carouselsettings = {
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

  const fetchNewItemsData = async () => {
    try {
      const endpoint =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
      const response = await axios.get(endpoint);
      setNewItemsData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  var skeletonNewItems = [];
  for (let i = 0; i < 4; i++) {
    skeletonNewItems.push(
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Creator: Monica Lucas"
            >
              <div
                className="skeleton-box"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              ></div>
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>

            <Link to="/">
              <div
                className="skeleton-box"
                style={{ width: "100%", height: "350px" }}
              ></div>
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to="/">
              <div
                className="skeleton-box"
                style={{ width: "180px", height: "30px" }}
              ></div>
            </Link>
            <div
              className="skeleton-box"
              style={{ width: "100px", height: "20px" }}
            ></div>
            <div className="nft__item_like">
              <div
                className="skeleton-box"
                style={{ width: "30px", height: "15px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const newItems = [];
  newItemsData.map((data, index) => {
    return newItems.push(<NFTCard key={index} data={data}></NFTCard>);
  });

  useEffect(() => {
    fetchNewItemsData();
  }, []);

  console.log(isLoading);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading ? (
            skeletonNewItems
          ) : (
            <OwlCarousel {...carouselsettings}>{newItems}</OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
