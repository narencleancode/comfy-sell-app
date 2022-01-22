import React, {useEffect, useState} from "react";
import {Divider, Empty} from "antd";
import axios from "axios";
import ProductCatalogSearchResult from "./ProductCatalogSearchResult";
import Title from "antd/lib/typography/Title";

const MyListings = () => {
    const storeId = "8888"; // TODO: fetch from authentication
    const [searchResult, setSearchResult] = useState([]);

    function getMyListings() {
        let endpoint = `http://127.0.0.1:4000/store/${storeId}`;
        axios
            .get(endpoint)
            .then((response) => {
                setSearchResult(response.data.storeCatalogs);
            });
    }

    useEffect(() => {
        getMyListings();
    }, );

    return (
        <div>
            <h2 style={{textAlign: "center"}}>Product Catalog Digitization</h2>
            {(!!searchResult && searchResult.length > 0)
                ? (
                    <>
                        <Divider orientation="left">Results</Divider>
                        <ProductCatalogSearchResult searchResult={searchResult}/>
                    </>
                )
                : (<Empty description={<Title level={3}>No results found</Title>}/>)
            }
        </div>
    );
};

export default MyListings;
