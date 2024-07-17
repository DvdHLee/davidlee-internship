import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TopSellers = () => {
  const [topSellersData, setTopSellersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopSellersData = async () => {
    try {
      const endpoint =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
      const response = await axios.get(endpoint);
      console.log(response.data);
      setTopSellersData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  var skeletonTopSellers = [];
  for (let i = 0; i < 12; i++) {
    skeletonTopSellers.push(
      <li key={i}>
        <div className="author_list_pp">
          <Link to={`/author`}>
            <div class="skeleton-box" style={{width: "50px", height: "50px", borderRadius: "50%"}}></div>
            <i className="fa fa-check"></i>
          </Link>
        </div>
        <div className="author_list_info">
          <Link to={`/author`}>
            <div class="skeleton-box" style={{width: "100px", height: "20px"}}></div>
          </Link>
          <span>
            <div class="skeleton-box" style={{width: "40px", height: "20px"}}></div>
          </span>
        </div>
      </li>
    );
  }

  useEffect(() => {
    fetchTopSellersData();
  }, []);

  const topSellers = [];
  topSellersData.map((element, index) =>
    topSellers.push(
      <li key={element.id}>
        <div className="author_list_pp">
          <Link to={`/author/${element.authorId}`}>
            <img className="lazy pp-author" src={element.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        <div className="author_list_info">
          <Link to={`/author/${element.authorId}`}>{element.authorName}</Link>
          <span>{element.price} ETH</span>
        </div>
      </li>
    )
  );

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoading ? skeletonTopSellers : topSellers}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
