import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const [itemDetailsData, setItemDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { nftId } = useParams();

  const fetchItemDetailsData = async () => {
    try {
      const endpoint =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=" +
        nftId;
      const response = await axios.get(endpoint);
      setItemDetailsData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const skeletonItemDetails = (
    <section aria-label="section" className="mt90 sm-mt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="skeleton-box" style={{width: "100%", height: "100%"}}></div>
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <div className="skeleton-box" style={{width: "300px", height: "40px"}}></div>

              <div className="item_info_counts">
                <div className="skeleton-box" style={{width: "80px", height: "30px"}}></div>
                <div className="skeleton-box" style={{width: "80px", height: "30px"}}></div>
              </div>
              <div className="skeleton-box" style={{width: "100%", height: "80px"}}></div>
              <div className="d-flex flex-row">
                <div className="mr40">
                  <h6>Owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <div className="skeleton-box" style={{width: "50px", height: "50px", borderRadius: "50%"}}></div>
                    </div>
                    <div className="author_list_info">
                      <div className="skeleton-box" style={{width: "125px", height: "20px"}}></div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="de_tab tab_simple">
                <div className="de_tab_content">
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <div className="skeleton-box" style={{width: "50px", height: "50px", borderRadius: "50%"}}></div>
                    </div>
                    <div className="author_list_info">
                      <div className="skeleton-box" style={{width: "125px", height: "20px"}}></div>
                    </div>
                  </div>
                </div>
                <div className="spacer-40"></div>
                <h6>Price</h6>
                <div className="nft-item-price">
                  <div className="skeleton-box" style={{width: "75px", height: "20px"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const itemDetails = (
    <section aria-label="section" className="mt90 sm-mt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={itemDetailsData.nftImage}
              className="img-fluid img-rounded mb-sm-30 nft-image"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <h2>{itemDetailsData.title} #{itemDetailsData.tag}</h2>

              <div className="item_info_counts">
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>
                  {itemDetailsData.views}
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>
                  {itemDetailsData.likes}
                </div>
              </div>
              <p>
                {itemDetailsData.description}
              </p>
              <div className="d-flex flex-row">
                <div className="mr40">
                  <h6>Owner</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <Link to={`/author/${itemDetailsData.ownerId}`}>
                        <img className="lazy" src={itemDetailsData.ownerImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${itemDetailsData.ownerId}`}>{itemDetailsData.ownerName}</Link>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="de_tab tab_simple">
                <div className="de_tab_content">
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <Link to={`/author/${itemDetailsData.creatorId}`}>
                        <img className="lazy" src={itemDetailsData.creatorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${itemDetailsData.creatorId}`}>{itemDetailsData.creatorName}</Link>
                    </div>
                  </div>
                </div>
                <div className="spacer-40"></div>
                <h6>Price</h6>
                <div className="nft-item-price">
                  <img src={EthImage} alt="" />
                  <span>{itemDetailsData.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetailsData();
  }, []);

  return (
    <div id="wrapper" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300" data-aos-once='true'>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {isLoading ? skeletonItemDetails : itemDetails}
      </div>
    </div>
  );
};

export default ItemDetails;
