import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import NFTCard from "../home/NFTCard";

const ExploreItems = () => {
  const [exploreItemsData, setExploreItemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExploreItemsData = async () => {
    try {
      const endpoint =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
      const response = await axios.get(endpoint);
      setExploreItemsData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  var skeletonExploreItems = [];
  for (let i = 0; i < 12; i++) {
    skeletonExploreItems.push(
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

  const exploreItems = [];
  exploreItemsData.map((data, index) => {
    return exploreItems.push(<NFTCard key={index} data={data}></NFTCard>);
  });

  useEffect(() => {
    fetchExploreItemsData();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
