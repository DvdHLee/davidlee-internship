import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [hotCollectionsData, setHotCollectionsData] = useState([]);
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
  

  const fetchHotCollectionsData = async () => {
    try {
      const endpoint =
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
      const response = await axios.get(endpoint);
      setHotCollectionsData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  var skeletonHotCollections = [];
  for (let i = 0; i < 4; i++) {
    skeletonHotCollections.push(
      <div
        className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
        key={i}
      >
        <div className="nft_coll">
          <div className="nft_wrap" style={{ height: "100%" }}>
            <Link to="/item-details">
              <div
                className="skeleton-box"
                style={{ width: "100%", height: "200px" }}
              ></div>
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to="/author">
              <div
                className="skeleton-box"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              ></div>
            </Link>
            <i className="fa fa-check"></i>
          </div>
          <div className="nft_coll_info">
            <Link to="/explore">
              <div
                className="skeleton-box"
                style={{ width: "100px", height: "20px" }}
              ></div>
            </Link>
            <br></br>
            <div
              className="skeleton-box"
              style={{ width: "60px", height: "20px" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  const hotCollections = [];
  hotCollectionsData.map((element) => {
    return hotCollections.push(
      <div
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        key={element.id}
        style={{ padding: 0 }}
      >
        <div className="nft_coll">
          <div className="nft_wrap" style={{ height: "100%" }}>
            <Link to={`/item-details/${element.nftId}`}>
              <img
                src={element.nftImage}
                className="lazy img-fluid"
                alt=""
                style={{ height: "fit-content" }}
              />
            </Link>
          </div>
          <div className="nft_coll_pp">
            <Link to={`/author/${element.authorId}`}>
              <img className="lazy pp-coll" src={element.authorImage} alt="" />
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

  useEffect(() => {
    fetchHotCollectionsData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade-in" data-aos-duration="500" data-aos-delay="200" data-aos-once='true'>
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={AuthorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>Pinky Ocean</h4>
                  </Link>
                  <span>ERC-192</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
