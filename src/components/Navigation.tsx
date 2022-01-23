import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { SearchOutlined, ShopOutlined } from '@ant-design/icons';

const tabs = [{
    route: "/search",
    label: "Search",
    icon: <SearchOutlined />
}, {
    route: "/listings",
    label: "My Listings",
    icon: <ShopOutlined />
}]

const Navigation = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const navigateToPage = ((e: any) => {
        navigate(e.key);
    })
    return (
        <div style={{position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#ffffff', zIndex: 10}}>
            <Menu 
            mode='horizontal'
            selectedKeys={[location.pathname]}
            className='menu'
            onClick={navigateToPage}
            >
                {tabs.map(tab => (
                    <Menu.Item icon={tab.icon} key={tab.route}>{tab.label}</Menu.Item>
                ))}
            </Menu>
        </div>
    )
}

export default Navigation;
