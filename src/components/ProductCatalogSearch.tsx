import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Divider, Drawer, Input, Tooltip } from "antd";
import { CameraOutlined, FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import ProductCatalogSearchResult from "./ProductCatalogSearchResult";
import BarcodeScanner from "./BarcodeScanner";
import FilterSelection from "./FilterSelection";
import SelectedFilters from "./SelectedFilters";
import FilterContext from "../contexts/FilterContext";

const { Search } = Input;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  position: relative;
  text-align: center;
`;

const ProductCatalogSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showBarcodeScanner, setShowBarcodeScanner] = React.useState(false)
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

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

  const openFilters = (event: React.MouseEvent<HTMLElement>) => {
    setShowFilters(true);
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
      <FilterContext.Provider value={{filters, categories, setFilters, setCategories}}>
        <h2 style={{ textAlign: "center" }}>Product Catalog Digitization</h2>
        <SearchContainer>
          <Search
            placeholder="input search text"
            enterButton
            size="large"
            suffix={suffix}
            onSearch={handleSearch}
            onChange={handleChange}
          />

          <Tooltip title="Filter">
            <Button type="default" size="large" icon={<FilterOutlined />} onClick={openFilters} />
          </Tooltip>

        </SearchContainer>

        <SelectedFilters></SelectedFilters>
        <Divider orientation="left">Results</Divider>
        <div>{ showBarcodeScanner ? <BarcodeScanner data={updateBarcodeResult}/> : null}</div>
        <ProductCatalogSearchResult searchResult={searchResult} />
        <Drawer
            title="Filters"
            placement="bottom"
            closable={true}
            onClose={() => setShowFilters(false)}
            visible={showFilters}
            size="large"
          >
            <FilterSelection/>
          </Drawer>
      </FilterContext.Provider>
    </div>
  );
};

export default ProductCatalogSearch;
