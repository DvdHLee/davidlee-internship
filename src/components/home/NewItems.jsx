import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "../../css/styles/owl.carousel.css";
import "../../css/styles/owl.theme.css";
import "../../css/styles/owl.transitions.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [expiryDates, setExpiryDates] = useState([]);
  const [tempExpiryDates, setTempExpiryDates] = useState([]);

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

  const fetchNewItemsData = async () => {
    try {
      const endpoint =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
      const response = await axios.get(endpoint);
      const tempTempExpiryDates = [];
      response.data.map((element, index) => {
        tempTempExpiryDates.push(element.expiryDate);
      })
      setTempExpiryDates(tempTempExpiryDates);
      renderNewItems(response.data, expiryDates);
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderNewItems = (data, expiries) => {
    const tempNewItems = [];
    data.map((element, index) => {
      tempNewItems.push(
        <div
          className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          key={element.id}
          style={{ padding: 0 }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${element.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Creator: Monica Lucas"
              >
                <img className="lazy" src={element.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {expiries[index]}

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

              <Link to={`/item-details/${element.nftId}`}>
                <img
                  src={element.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{element.title}</h4>
              </Link>
              <div className="nft__item_price">{element.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{element.likes}</span>
              </div>
            </div>
          </div>
        </div>
      );
    });
    setNewItems([<OwlCarousel {...settings}>{tempNewItems}</OwlCarousel>]);
  };

  useEffect(() => {
    var skeletonNewItems = [];
    for (let i = 0; i < 4; i++) {
      skeletonNewItems.push(
        <div
          className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          key={i}
          style={{ padding: 0 }}
        >
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
    setNewItems(<OwlCarousel {...settings}>{skeletonNewItems}</OwlCarousel>);
    fetchNewItemsData();
  }, []);

  //Timer
  setInterval(() => {
    setExpiryTimers();
  }, [1000]);

  function setExpiryTimers() {
    var newExpiryDates = [];
    newExpiryDates = tempExpiryDates.map((expiryDate, index) => {
      const secondsremaining = Math.floor((expiryDate - Date.now()) / 1000);
      if (expiryDate === null) {
        return null;
      } else if (expiryDate < 0) {
        return (
          <div className="de_countdown" key={index}>
            Expired
          </div>
        );
      } else {
        var seconds = Math.floor(secondsremaining) % 60;
        var minutes = Math.floor(secondsremaining / 60) % 60;
        const hours = Math.floor(secondsremaining / 60 / 60);

        if (seconds.toString().length < 2) {
          seconds = seconds.toString().padStart(2, "0");
        }

        if (minutes.toString().length < 2) {
          minutes = minutes.toString().padStart(2, "0");
        }

        return (
          <div className="de_countdown" key={index}>
            {hours + "h " + minutes + "m " + seconds + "s"}
          </div>
        );
      }
    });
    setExpiryDates(newExpiryDates);
  }

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
          {newItems}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
