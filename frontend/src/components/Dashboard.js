import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";

import { getRequest } from "../utils/api";

import { Edit2, Trash2 } from "react-feather";

export default function Dashboard() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getRequest("/get_all_products")
      .then((resp) => {
        console.log(resp);
        setProducts(resp.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.text}>
          <p>Welcome to your shop! 😃</p>
          <p>All Products</p>
        </div>
        <div className={styles.controller}>
          <p>Shop Status:</p>
        </div>
      </div>
      <div className={styles.products}>
        {products &&
          products.length &&
          products.map((prod) => (
            <div className={styles.product}>
              <div className={styles.image}>
                <img src={prod.image_address} alt="" />
              </div>
              <div className={styles.details}>
                <p>
                  Name: <span>{prod.product_name}</span>
                </p>
                <p>
                  MRP: <span>{prod.mrp}</span>
                </p>
                <p>
                  Rating: <span>{prod.ratings}</span>
                </p>
                <p>
                  Quantity: <span>{prod.quantity}</span>
                </p>
              </div>
              <div className={styles.controllers}>
                <button>
                  <Edit2 />
                </button>
                <button>
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
