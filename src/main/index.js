import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants.js";
import { Carousel } from "antd";

dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(
        `${API_URL}/products`
        // "http://localhost:8080/products"
        // "https://c6ed8d23-1c8f-43fa-888e-2c716f64e44e.mock.pstmn.io/products"
      )
      .then(function (result) {
        console.log(result);
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생:", error);
      });

    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error) => {
        console.error("에러 발생 : ", error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} alt="배너" />
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product-list">
        {products.map(function (product, index) {
          return (
            <div className="product-card">
              {product.soldout === 1 && <div className="product-blur" />}

              <Link className="product-link" to={`/products/${product.id}`}>
                <div className="product-img">
                  <img
                    className="product-img"
                    src={`${API_URL}/${product.imageUrl}`}
                    alt="이미지"
                  />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                        alt="아바타"
                      />
                      <span>{product.seller}</span>
                    </div>
                    <span className="product-date">
                      {dayjs(product.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
