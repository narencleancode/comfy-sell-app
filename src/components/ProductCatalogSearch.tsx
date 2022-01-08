import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import { CameraOutlined } from "@ant-design/icons";

const { Search } = Input;

const SearchContainer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  position: relative;
`;

const ProductCatalogSearch = () => {
  const handleSuffixClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("Camera clicked !!!!");
  };

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
      <h2>Product Catalog Digitization</h2>
      <SearchContainer>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          suffix={suffix}
        />
      </SearchContainer>
      <div>Search Results</div>
    </div>
  );
};

export default ProductCatalogSearch;
