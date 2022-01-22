import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Divider, Drawer, Input, Tooltip, message, Empty } from "antd";
import { CameraOutlined, FilterOutlined, ScanOutlined, CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import ProductCatalogSearchResult from "./ProductCatalogSearchResult";
import BarcodeScanner from "./BarcodeScanner";
import FilterSelection from "./FilterSelection";
import SelectedFilters from "./SelectedFilters";
import FilterContext from "../contexts/FilterContext";
import WebcamCapture from "./ProductImageCapture";
import Title from "antd/lib/typography/Title";
import { StoreService } from "../services/StoreService";

const { Search } = Input;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  position: relative;
  text-align: center;
`;

const ProductCatalogSearch = () => {
  const storeId = "8888"; // TODO: fetch from authentication
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showBarcodeScanner, setShowBarcodeScanner] = React.useState(false)
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showCamera, setShowCamera] = React.useState(false)

  const handleSuffixClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("Camera Clicked!!")
    setShowBarcodeScanner(false);
    setShowCamera(!showCamera);
  };

  const handleBarcodeScanner = (event: React.MouseEvent<HTMLElement>) => {
    setShowCamera(false);
    setShowBarcodeScanner(!showBarcodeScanner);
  };

  function getProductCatalogs() {
    let endpoint = "http://127.0.0.1:4000/product-catalog";
    if (filters.find(filter => filter === 'Curated List')) {
      endpoint += `?filterBy=Curated List`
    } else if (!!searchText && !!searchText.trim()) {
      endpoint += `?q=${searchText}`
    } else if(filters.length > 0) {
      endpoint += `?filterBy=${filters}`
    } 
    axios
        .get(endpoint)
        .then((response) => {
          setSearchResult(response.data);
        });
  }

  function getMyListings() {
    let endpoint = `http://127.0.0.1:4000/store/${storeId}`;
    axios
        .get(endpoint)
        .then((response) => {
          setSearchResult(response.data.storeCatalogs);
        });
  }

  useEffect(() => {
    if(filters.find(filter => filter === 'Listed Products')) {
      getMyListings();
    } else {
      getProductCatalogs();
    }
  }, [searchText, filters]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  } 

  const handleSearch = (value: string) => {
    setSearchText(value);
  }

  const addProductByCode = (productCode: string) => {
    message.loading({content: `Adding product ${productCode}`, key: productCode, duration: 0})
      StoreService.addProductByCode(storeId, productCode)
        .then((response) => {
          const addedProduct = response.data;
          setSearchResult([addedProduct as never])
          message.success({content: `Added product ${addedProduct.title}`, key: productCode, duration: 2.5})
        })
        .catch(() => {
          message.error({content: `Unable to identify product`, key: productCode, duration: 2.5})
        })
  }
  const updateSearchInputResult = (value: any) => {
    if (value !== searchText) {
      addProductByCode(value);
    }
    setShowCamera(false);
  }

  const openFilters = (event: React.MouseEvent<HTMLElement>) => {
    setShowFilters(true);
  }

  const suffix = (
    <React.Fragment>
    <CameraOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
      onClick={handleSuffixClick}
    />
    <ScanOutlined 
      style={{
        fontSize: 16,
        color: "#1890ff",
        marginLeft: "10px"
      }}
    onClick={handleBarcodeScanner}
    /> 
    </React.Fragment>
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
            value={searchText}
            onSearch={handleSearch}
            onChange={handleChange}
          />

          <Tooltip title="Filter">
            <Button type="default" size="large" icon={<FilterOutlined />} onClick={openFilters} />
          </Tooltip>

        </SearchContainer>
        <div>{ showBarcodeScanner && <>
          <div style={{textAlign: 'right', marginBottom: '16px'}}>
            <Button
            type="primary" icon={<CloseOutlined />} onClick={() => setShowBarcodeScanner(false)}>Close</Button>
          </div>
          <BarcodeScanner data={updateSearchInputResult}/>
        </>}</div>
        <div>{ showCamera ? <WebcamCapture data={updateSearchInputResult}/> : null}</div>
        <SelectedFilters></SelectedFilters>
        { (!!searchResult && searchResult.length > 0)
          ? (
            <>
              <Divider orientation="left">Results</Divider>
              <ProductCatalogSearchResult searchResult={searchResult} />
            </>
          )
          : (<Empty description={<Title level={3}>No results found</Title>} />) 
        }
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
