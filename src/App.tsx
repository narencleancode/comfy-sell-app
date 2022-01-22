import React from "react";
import "./App.css";
import ProductCatalogSearch from "./components/ProductCatalogSearch";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Navigation from "./components/Navigation";
import MyListings from "./components/MyListing";


function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/search" />} />
                    <Route path="/search"  element={<ProductCatalogSearch/>}/>
                    <Route path="/listings" element={<MyListings/>}/>
                </Routes>
                <Navigation/>
            </BrowserRouter>
        </div>
    );
}

export default App;
