import React from "react";
import "./App.css";
import ProductCatalogSearch from "./components/ProductCatalogSearch";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Navigation from "./components/Navigation";
import MyListings from "./components/MyListing";
import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";


function App() {

    return (
        <Layout style={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <Header style={{ color: 'white', fontSize: "18px", textAlign: "center", height: '50px', lineHeight: '50px' }}>Comfy Sell</Header>
            <Content style={{ padding: '16px 16px 50px 16px', flex: 1  }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/search" />} />
                        <Route path="/search"  element={<ProductCatalogSearch/>}/>
                        <Route path="/listings" element={<MyListings/>}/>
                    </Routes>
                    <Navigation/>
                </BrowserRouter>
            </Content>
        </Layout>
    );
}

export default App;
