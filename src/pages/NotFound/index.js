import { Result } from 'antd';
import React from 'react';
import MyButton from '../../components/MyButton';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const naviagate = useNavigate();
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, the page you are requesting is not available."
            extra={<MyButton label={"Back Home"} onClick={() => naviagate("/")} style={{ margin: "auto" }} />}
        />
    )
}

export default NotFound