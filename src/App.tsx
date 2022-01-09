import React, { SetStateAction, useState } from "react";
import { Layout } from "antd";
import { Header, Footer, Content } from "antd/lib/layout/layout";
import "./App.css";
import ProductCatalogSearch from "./components/ProductCatalogSearch";

function App() {

  return (
    <Layout style={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <Header style={{ color: 'white', backgroundColor: 'black', fontSize: "25px", textAlign: "center" }}>Comfy Sell</Header>
      <Content style={{ padding: '30px 25px', flex: 1  }}>
        <div className="App">
          <ProductCatalogSearch />
        </div>
      </Content>
      <Footer style={{ color: 'white', backgroundColor: 'black', height: '10vh', fontSize: "25px", textAlign: "center"}}>Footer</Footer>
    </Layout>
  );
}

export default App;
