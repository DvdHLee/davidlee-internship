import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function NFTCard({ data }) {
  const [expiry, setExpiry] = useState([]);

  function updateTimers() {
    const secondsremaining = Math.floor((data.expiryDate - Date.now()) / 1000);
    if (data.expiryDate === null) {
      setExpiry(null);
    } else if (data.expiryDate < 0) {
      setExpiry(<div className="de_countdown">Expired</div>);
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

      setExpiry(
        <div className="de_countdown">
          {hours + "h " + minutes + "m " + seconds + "s"}
        </div>
      );
    }
  }

  setInterval(() => {
    updateTimers();
  }, [1000]);

  return (
    <div
      className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
      key={data.id}
      style={{ padding: 0 }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${data.authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: Monica Lucas"
          >
            <img className="lazy" src={data.authorImage} alt="" />
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {expiry}

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

          <Link to={`/item-details/${data.nftId}`}>
            <img
              src={data.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>{data.title}</h4>
          </Link>
          <div className="nft__item_price">{data.price} ETH</div>
          <div className="nft__item_like">
            <i className="fa fa-heart"></i>
            <span>{data.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
