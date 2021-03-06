import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Divider, Input, message, Empty, BackTop, Popover, Image } from "antd";
import { CameraOutlined, ControlOutlined, ScanOutlined, CloseOutlined, ArrowUpOutlined, AudioOutlined } from "@ant-design/icons";
import ProductCatalogSearchResult from "./ProductCatalogSearchResult";
import BarcodeScanner from "./BarcodeScanner";
import FilterSelection from "./FilterSelection";
import SelectedFilters from "./SelectedFilters";
import FilterContext from "../contexts/FilterContext";
import WebcamCapture from "./ProductImageCapture";
import Title from "antd/lib/typography/Title";
import { StoreService } from "../services/StoreService";
import { ProductCatalogService } from "../services/ProductCatalogService";
import { STORE_ID } from "../services/config";
import FileUploadButton from "./FileUpload";
import VoiceRecorder from "./VoiceRecorder";

const { Search } = Input;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  position: relative;
  text-align: center;
`;

const ProductCatalogSearch = () => {
  const storeId = STORE_ID;
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [showBarcodeScanner, setShowBarcodeScanner] = React.useState(false)
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showCamera, setShowCamera] = React.useState(false)
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [popOverVisible, setPopOverVisible] = useState(false);
  const [webCamType, setWebCamType] = useState("OCR");
  const [showRecorder, setShowRecorder] = useState(false);

  
  const showWebCamera = () => {
    setPopOverVisible(!popOverVisible);
    setShowBarcodeScanner(false);
    setShowCamera(!showCamera); 
  }
  
  const handleImageOCRScanner = (event: React.MouseEvent<HTMLElement>) => {
    setWebCamType("OCR"); 
    showWebCamera();
  };

  const handleImageScanner = (event: React.MouseEvent<HTMLElement>) => {
    setWebCamType("IMG");
    showWebCamera();
  }

  const handleBarcodeScanner = (event: React.MouseEvent<HTMLElement>) => {
    setShowCamera(false);
    setShowBarcodeScanner(!showBarcodeScanner);
  };

  const handleVoiceInput = (event: React.MouseEvent<HTMLElement>) => {
    setShowRecorder(true);
  }

  function getProductCatalog() {
    return ProductCatalogService.getProductCatalog(prepareSearchQuery())
  }

  function prepareSearchQuery() {
    let query = `page=${page}`;
    if (!!searchText && !!searchText.trim()) {
      query += `&q=${searchText}`;
    } else if(filters.length > 0) {
      query += `&filterBy=${filters}`
    } else {
      query += "&filterBy=Curated List";
    }
    if(categories.length > 0) {
      query += '&categories=' + categories.map(encodeURIComponent).join('&categories=');
    }
    return query;
  }

  function loadPage() {
    getProductCatalog()
        .then((response) => {
          if (!!response.data && response.data.length > 0) {
            if (page === 1) {
              setSearchResult(response.data);
            } else {
              setSearchResult([...searchResult, ...response.data]);
            }
            setHasMore(true);
          } else {
            setHasMore(false)
          }
          setLoading(false);
        });
  }

  function loadMore() {
    if (loading) {
      return;
    }
    setPage(page + 1);
    setLoading(true);
  }

  useEffect(() => {
      setSearchResult([]);
      setPage(1);
      loadPage()
  }, [searchText, categories]);

  useEffect(() => {
    loadPage()
  }, [page])

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

  const enListAndUpdateSearchInputResult = (value: any) => {
    if (value !== searchText) {
      addProductByCode(value);
    }
    setShowCamera(false);
  }

  const updateSearchInputResult = (result: any) => {
    setSearchResult(result);
    setShowCamera(false);
  }

  const openFilters = (event: React.MouseEvent<HTMLElement>) => {
    setShowFilters(true);
  }
  
  const content = (
    <div style={{ display: "flex", alignItems: "center"}}>
      <p style={{  }}>
        <img src="/ocr.svg" width="70px" height="70px" onClick={handleImageOCRScanner} />
      </p>
      <p> 
        <img src="/images.png" width="70px" height="70px" onClick={handleImageScanner} />
      </p>
    </div>
  );

  const suffix = (
    <React.Fragment>
      <Popover visible={popOverVisible} content={content} trigger="click" title="Identify Product">
        <CameraOutlined
          style={{
            fontSize: 16,
            color: "#1890ff",
          }}
          onClick={() => {setPopOverVisible(!popOverVisible)}}
        />
      </Popover>
    <ScanOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
        marginLeft: "10px"
      }}
    onClick={handleBarcodeScanner}
    />
    <AudioOutlined 
    style={{
      fontSize: 16,
      color: "#1890ff",
      marginLeft: "10px"
    }}
    onClick={handleVoiceInput}

    />
    </React.Fragment>
  );

  return (
    <div>
      <FilterContext.Provider value={{filters, categories, setFilters, setCategories}}>
        <SearchContainer>
          <Search
            placeholder="Search text"
            enterButton
            size="large"
            suffix={suffix}
            value={searchText}
            onSearch={handleSearch}
            onChange={handleChange}
          />

        </SearchContainer>
        <div>{ showBarcodeScanner && <>
          <div style={{textAlign: 'right', marginBottom: '16px'}}>
            <Button
            type="primary" icon={<CloseOutlined />} onClick={() => setShowBarcodeScanner(false)}>Close</Button>
          </div>
          <BarcodeScanner data={enListAndUpdateSearchInputResult}/>
        </>}</div>
        <div>{showCamera ?
          <>
            <div style={{ textAlign: 'right', marginBottom: '16px' }}>
              <Button
                type="primary" icon={<CloseOutlined />} onClick={() => setShowCamera(false)}>Close</Button>
            </div>
            <WebcamCapture webCamType={webCamType} updateSearchText={handleSearch} data={updateSearchInputResult} /> </>
          : <></>}</div>
        {showRecorder && (
          <>
            <div style={{textAlign: 'right', marginBottom: '16px'}}>
              <Button
              type="primary" icon={<CloseOutlined />} onClick={() => setShowRecorder(false)}>Close</Button>
            </div>
            <VoiceRecorder onTextAvailable={(text) => {console.log('received text', text); setSearchText(text)}} />
          </>
        )}
        <FileUploadButton/>
        <SelectedFilters></SelectedFilters>
        { (!!searchResult && searchResult.length > 0)
          ? (
            <>
              <Divider style={{marginTop: 0, marginBottom: 8}}></Divider>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Title level={5} type="secondary">Results</Title>
                  <Button type="default" size="small" icon={<ControlOutlined />} onClick={openFilters}>Add Filter</Button>
              </div>
              <ProductCatalogSearchResult hasMore={hasMore} next={loadMore} searchResult={searchResult} />
            </>
          )
          : (<Empty description={<Title level={3}>No results found</Title>} />)
        }
        <FilterSelection visible={showFilters} onClose={() => setShowFilters(false)}/>
        <BackTop style={{width: 'auto'}}><Button type="link" size="large" icon={<ArrowUpOutlined />} style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', background: '#fff'}}>Top</Button></BackTop>
      </FilterContext.Provider>
    </div>
  );
};

export default ProductCatalogSearch;
