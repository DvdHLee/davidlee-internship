import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems.jsx";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const [authorData, setAuthorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authorId } = useParams();
  const [follow, setFollow] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchAuthorData = async () => {
    try {
      const endpoint =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=" +
        authorId;
      const response = await axios.get(endpoint);
      setAuthorData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };


  const skeletonAuthor = (
    <section aria-label="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <div
                    className="skeleton-box"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                  >
                    …
                  </div>
                  <i className="fa fa-check"></i>
                  <div className="profile_name">
                    <h4>
                      <div
                        className="skeleton-box"
                        style={{ width: "200px" }}
                      ></div>
                      <span className="profile_username">
                        <div
                          className="skeleton-box"
                          style={{ width: "100px" }}
                        ></div>
                      </span>
                      <span id="wallet" className="profile_wallet">
                        <div
                          className="skeleton-box"
                          style={{ width: "250px" }}
                        ></div>
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <div className="profile_follower">
                    <div
                      className="skeleton-box"
                      style={{ width: "150px", height: "40px" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="de_tab tab_simple">
              <div className="row">
                {new Array(8).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  >
                    <div
                      className="skeleton-box"
                      style={{ width: "100%", height: "400px" }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const clickedFollow = () => {
    const followbutton = document.getElementById("authorfollowbutton");
    if (follow === 0) {
      followbutton.innerHTML = "Unfollow";
      setFollow(1);
    } else {
      followbutton.innerHTML = "Follow";
      setFollow(0);
    }
  };

  let author = [];
  if (authorData) {
    author = (
      <section aria-label="section" key={authorData.id}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img src={authorData.authorImage} alt="" />

                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>
                        {authorData.authorName}
                        <span className="profile_username">
                          @{authorData.tag}
                        </span>
                        <span id="wallet" className="profile_wallet">
                          {authorData.address}
                        </span>
                        <button id="btn_copy" title="Copy Text">
                          Copy
                        </button>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                    <div className="profile_follower">
                      {parseInt(authorData.followers) + follow}
                    </div>
                    <button
                      className="btn-main"
                      id="authorfollowbutton"
                      onClick={clickedFollow}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <AuthorItems
                  nftCollection={authorData.nftCollection}
                  author={[authorId, authorData.authorImage]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  useEffect(() => {
    fetchAuthorData();
  }, []);

  return (
    <div id="wrapper" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="300" data-aos-once='true'>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        {isLoading ? skeletonAuthor : author}
      </div>
    </div>
  );
};

export default Author;
