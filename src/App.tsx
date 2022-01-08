import React from "react";
import { Layout } from "antd";
import { Header, Footer, Content } from "antd/lib/layout/layout";
import "./App.css";
import Search from "./components/ProductCatalogSearch";


function App() {
  return (
    <Layout style={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <Header style={{ color: 'white', backgroundColor: 'black' }}>header</Header>
      <Content style={{ padding: '30px 25px', flex: 1  }}>
        <div className="App">
          <Search />
        </div>
      </Content>
      <Footer style={{ color: 'white', backgroundColor: 'black', height: '10vh'}}>Footer</Footer>
    </Layout>
  );
}

export default App;
