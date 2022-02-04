import { Upload, message, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from "react";
import { COMFY_SERVICE_URL, STORE_ID } from "../services/config";

const FileUploadButton = () => {
    const storeId = STORE_ID;
    let endpoint = `${COMFY_SERVICE_URL}/store/${storeId}/bulk-upload`;
    const [state, setState] = React.useState(false);
    
    const params = {
    name: 'file',
    action: endpoint,
    showUploadList: true,
    maxCount: 1,
    progress: {
        strokeWidth: 3,
        format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },
    onChange(info: any) {
        console.log(info.file.status)
        if (info.file.status == 'uploading') {
            setState(true)
        }
        if (info.file.status !== 'uploading') {
            setState(false)
        }
        if (info.file.status === 'done') {
            info.file.response.successfulUploads ?
             message.success(`${info.file.response.successfulUploads} Products Added Successfully`) :
             message.warn(`No Products were added`);
            setState(false)
        } else if (info.file.status === 'error') {
            setState(false)
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    };

    return (
    <Space direction="vertical" style={{ width: '100%', height: (state ? '70px' : '35px')}} size="large">
        <Upload {...params} showUploadList={state}>
            <Button icon={<UploadOutlined />}>Bulk Upload Products</Button>
        </Upload>
    </Space>
    );
}

export default FileUploadButton