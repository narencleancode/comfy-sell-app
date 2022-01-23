import React, {useEffect, useState} from "react";
import { Empty, List } from "antd";
import axios from "axios";
import  {ProductAsset} from "./ProductCatalogSearchResult";
import Title from "antd/lib/typography/Title";
import StoreProductCatalogSearchResultItem from "./StoreProductCatalogSearchResultItem";
import { COMFY_SERVICE_URL, STORE_ID } from "../services/config";

const MyListings = () => {
    const storeId = STORE_ID;
    const [listings, setListings] = useState([]);

    function getMyListings() {
        let endpoint = `${COMFY_SERVICE_URL}/store/${storeId}/store-catalog`;
        axios
            .get(endpoint)
            .then((response) => {
                setListings(response.data);
            });
    }

    useEffect(() => {
        //TODO temp fix to avoid multiple calls.
        if(listings.length == 0) {
            getMyListings();
        }
    }, );

    return (
        <div>
            <Title level={4}>My Listings</Title>
            {(!!listings && listings.length > 0)
                ? (
                    <List
                        dataSource={listings}
                        renderItem={(listingItem: ProductAsset) => {
                            return (
                                <List.Item key={listingItem.productCode}>
                                    <StoreProductCatalogSearchResultItem storeId={storeId} searchResultItem={listingItem} />
                                </List.Item>
                            );
                        }}
                    />
                )
                : (<Empty description={<Title level={3}>No results found</Title>}/>)
            }
        </div>
    );
};

export default MyListings;
