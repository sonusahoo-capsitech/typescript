import React from "react";
import { Card, Typography, Button } from "antd";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #ece9ff 100%)",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: 12,
        }}
      >
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Welcome Home!
        </Typography.Title>
        <Typography.Paragraph style={{ textAlign: "center" }}>
          This is a demo Home page. You can customize it as you like.
        </Typography.Paragraph>
        <Button type="primary" block>
          <Link to="/allstudent">
          
          Get Started
          </Link>
        </Button>
      </Card>
    </div>
  );
};

export default Home;