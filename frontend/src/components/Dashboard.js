import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";

import { getRequest, postRequest } from "../utils/api";
import Select from "react-select";

import { Edit2, Trash2 } from "react-feather";
import ToggleButton from "react-toggle-button";
import { Plus } from "react-feather";
import Button from "../shared/Button";
import Modal from "../shared/Modal";
import Preloader from "../shared/Preloader";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export default function Dashboard() {
  const [products, setProducts] = useState(null);
  const [tags, setTags] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({
    shop_id: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  function handleDropdownChange(items) {
    let data = [];
    items.forEach((item) => {
      data.push(item.value);
    });
    setSelectedTags(data);
  }

  function toggleProductModal() {
    setIsProductModalOpen((prev) => !prev);
  }

  function handleAddProductChange(e) {
    let data = { ...productDetails };
    data[e.target.name] = e.target.value;
    setProductDetails(data);
  }

  function handleProductSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    let payload = productDetails;
    payload.tags_string = selectedTags.join(",");
    postRequest(
      `/api/shop/list_products?product_name=${payload.product_name}&mrp=${payload.mrp}&image_address=${payload.image_address}&shop_id=1&tags_string=${payload.tags_string}&quantity=${payload.quantity}`
    )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsProductModalOpen(false);
        getProducts();
        setIsLoading(false);
      });
  }

  function getProducts() {
    getRequest("/api/shop/get_products_by_shop_id?id=1")
      .then((resp) => {
        setProducts(resp.data.data.reverse());
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getAllTags() {
    getRequest("/api/user/get_all_tags")
      .then((resp) => {
        console.log(resp);
        let initTags = [];
        let data = resp.data.data;
        data.forEach((tag) => {
          let temp = {
            label: tag.tag,
            value: tag.tag,
          };
          initTags.push(temp);
        });
        setTags(initTags);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getProducts();
    getAllTags();
  }, []);

  return (
    <div className={styles.wrapper}>
      {isLoading || !tags ? <Preloader /> : null}
      <Button
        className={styles.addProduct}
        name="Add Product"
        prefixIcon={<Plus />}
        width="150px"
        backgroundColor="#F45C2C"
        onClick={toggleProductModal}
      />
      <div className={styles.header}>
        <div className={styles.text}>
          <p>Welcome to your shop! 😃</p>
          <p>All Products</p>
        </div>
        <div className={styles.controller}>
          <p>Shop Status:</p>
          <ToggleButton
            value={true}
            // onToggle={(value) => {
            //   self.setState({
            //     value: !value,
            //   });
            // }}
          />
        </div>
      </div>
      <div className={styles.products}>
        {products &&
          products.length &&
          products.map((prod, index) => (
            <div className={styles.product} key={index}>
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

      <Modal
        isOpen={isProductModalOpen}
        title="Add Product"
        onClose={toggleProductModal}
        allowClose
      >
        <div className={styles.productForm}>
          <form onChange={handleAddProductChange} onSubmit={handleProductSubmit}>
            <div className={styles.native}>
              <label>Product Name</label>
              <input type="text" name="product_name" />
              <label>Product MRP</label>
              <input type="number" name="mrp" />
              <label>Quantity</label>
              <input type="text" name="quantity" />
              <label>Image URL</label>
              <input type="text" name="image_address" />
            </div>
            <label>Tags</label>
            <Select options={tags} onChange={handleDropdownChange} isMulti />
            <Button name="Submit" backgroundColor="#F45C2C" />
          </form>
        </div>
      </Modal>
    </div>
  );
}
