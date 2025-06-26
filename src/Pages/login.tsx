import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Card, Typography, message } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slice/UserSlice";
import type { AppDispatch } from "../Redux/Store";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
   
    console.log("Success:", values);
    const res = await dispatch(login(values));
    // console.log(res);
    if (res?.payload?.success) {
      messageApi.open({
        type: "success",
        content: "Login successful!",
      });
      navigate("/home");
    }
    
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ece9ff 0%, #f5f7fa 100%)",
        // border: "1px solid red",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: 12,
          border: "",
        }}
      >
        <Typography.Title
          level={3}
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          Login
        </Typography.Title>
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
          layout="horizontal"
          style={{
            // border: "1px solid yellow",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // width: "90%",
          }}
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              // border:"1px solid red"
            }}
          >
            <Input
              size="large"
              placeholder="Enter your username"
              style={{
                marginLeft: "23px",
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              // border:"1px solid red"
            }}
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>
          {contextHolder}
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Submit
            </Button>
          </Form.Item>
          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?
            <Link to="/" className="text-green-600 ml-1 font-medium">
              Signup here
            </Link>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
