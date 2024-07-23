import React from "react";
import NFTCard from "../../components/home/NFTCard";

const AuthorItems = ( {nftCollection, author} ) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {new Array(nftCollection.length).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}><NFTCard key={index} data={nftCollection[index]} author={author}></NFTCard></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
