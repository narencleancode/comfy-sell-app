import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import axios from "axios";
import ProductCatalogSearchResult from "./ProductCatalogSearchResult";
import BarcodeScanner from "./BarcodeScanner";

const { Search } = Input;

const SearchContainer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  position: relative;
  text-align: center;
`;

const ProductCatalogSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showBarcodeScanner, setShowBarcodeScanner] = React.useState(false)

  const handleSuffixClick = (event: React.MouseEvent<HTMLElement>) => {
    setShowBarcodeScanner(!showBarcodeScanner);
  };

  useEffect(() => {
    let endpoint = "http://127.0.0.1:5000/product-catalog";
    if (!!searchText && !!searchText.trim()) {
      endpoint += `?q=${searchText}`
    }
    axios
    .get(endpoint)
    .then((response) => {
      setSearchResult(response.data);
    });
  }, [searchText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  } 

  const handleSearch = (value: string) => {
    setSearchText(value);
  } 
  const updateBarcodeResult = (value: any) => {
      setSearchText(value);
     setShowBarcodeScanner(false);
    }

  const suffix = (
    <CameraOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
      onClick={handleSuffixClick}
    />
  );

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Product Catalog Digitization</h2>
      <SearchContainer>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          suffix={suffix}
          onSearch={handleSearch}
          onChange={handleChange}
        />
      </SearchContainer>
      <div>{ showBarcodeScanner ? <BarcodeScanner data={updateBarcodeResult}/> : null}</div>
      <ProductCatalogSearchResult searchResult={searchResult} />
    </div>
  );
};

export default ProductCatalogSearch;
