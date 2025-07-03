import React, { useState } from "react";
import { Cascader, Flex, message, type CascaderProps } from "antd";
import "./Form.css";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
// import Item from "antd/es/list/Item";
import { useForm } from "antd/es/form/Form";
// import { error } from "echarts/types/src/util/log.js";
const Forms: React.FC = () => {
  interface Option {
    value: string;
    label: string;
  }
  const [form] = useForm();
  const [forms1] = useForm();
  const [firstForm, setFirstForm] = useState(false);
  const [secondForm, setsecondForm] = useState(false);
  // const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const { RangePicker } = DatePicker;
  const { TextArea } = Input;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const options: Option[] = [
    {
      value: "form 1",
      label: (
        <div
          style={{
            width: "100%",
            // minWidth:"200px"
          }}
        >
          <span
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            form 1
          </span>
        </div>
      ),
    },
    {
      value: "form 2",
      label: (
        <div
          style={{
            width: "100%",
            // minWidth:"200px"
          }}
        >
          <span
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            form 2
          </span>
        </div>
      ),
    },
  ];

  const onChange: CascaderProps<Option>["onChange"] = (value) => {
    console.log("The value is ", value);
    if (value[0] === "form 1") {
      setFirstForm(true);
      setsecondForm(false);
    }
    if (value[0] === "form 2") {
      setsecondForm(true);
      setFirstForm(false);
    }
  };
  const onsubmit = (value) => {
    console.log("onsubmit value", value);
  };
  //
  const onFinish = (values) => {
    console.log("Submitted values:", values);
  };

  const submited = (values) => {
    console.log("The values are", values);
    forms1.submit();
  };
  // After the submit if any error is happend then onfinished is worked
  const onFinishFailed = (errorInfo) => {
    console.log("Failed to submit:", errorInfo);
  };

  const ongetFieldsError = () => {
    const allError = form.getFieldsError();
    console.log(allError);
  };
  const handleSubmit = () => {
    form.submit();
  };

  const ongetFieldError = () => {
    const errors = form.getFieldError("Email");
    console.log(errors);
  };

  const ongetFieldValue = () => {
    const values = form.getFieldValue("fullName");
    console.log(values);
  };

  const ongetFieldsValue = () => {
    const allValues = form.getFieldsValue();
    console.log(allValues);
  };

  const onisFieldsTouched = () => {
    const istouched = form.isFieldsTouched();
    console.log(istouched);
    const specificFilled = form.isFieldsTouched(["fullName", "Email"]);
    console.log(specificFilled);
  };
  const onIsFieldTouched = () => {
    const isUsernameTouched = form.isFieldTouched("fullName");
    console.log("fullname touched?", isUsernameTouched);
  };
  // need to thinking
  const onisFieldValidating = () => {
    const validating = form.isFieldValidating("fullName");
    console.log(validating);
  };

  const handleResetFields = () => {
    form.resetFields();
  };

  const onScrollToFilled = () => {
    form.scrollToField("fullName", {
      behavior: "smooth",
      focus: true,
    });
  };

  const onSetFilled = () => {
    form.setFields([
      {
        name: "fullName",
        value: "capsiteh",
        errors: ["manually set the filled "],
      },
      { name: "password", value: "newPassword123" },
    ]);
  };

  const onSetFieldValue = () => {
    form.setFieldValue("Email", "new.email@example.com");
  };

  const onSetFieldsValues = () => {
    form.setFieldsValue({
      fullName: "Capsitech Debitam",
      Email: "admin@example.com",
    });
  };

  const cascaderStyle: React.CSSProperties = {
    minWidth: "200px",
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    padding: 4,
    flex: "center",
    alignItems: "center",
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "10vh",
        }}
      >
        <Flex vertical gap="middle">
          <Cascader
            style={cascaderStyle}
            placeholder="Please select"
            variant="outlined"
            options={options}
            onChange={onChange}
          />
        </Flex>
      </div>

      {firstForm && (
        <div
          className="responsive-form-container"
        >
          {/* <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Form disabled
          </Checkbox> */}
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            form={forms1}
            name="forms1"
            layout="vertical"
            onFinish={onsubmit}
          >
          
              <Form.Item
                label="Checkbox"
                name="disabled"
                valuePropName="checked"
               
              >
                <Checkbox   >Checkbox</Checkbox>
              </Form.Item>
            
            <Form.Item label="Radio" name="radio">
              <Radio.Group>
                <Radio value="apple"> Apple </Radio>
                <Radio value="pear"> Pear </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Input" name="input">
              <Input />
            </Form.Item>
            <Form.Item label="Select" name="select">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="TreeSelect" name="treeSelect">
              <TreeSelect
                treeData={[
                  {
                    title: "Light",
                    value: "light",
                    children: [{ title: "Bamboo", value: "bamboo" }],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Cascader" name="cascader">
              <Cascader
                options={[
                  {
                    value: "zhejiang",
                    label: "Zhejiang",
                    children: [
                      {
                        value: "hangzhou",
                        label: "Hangzhou",
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="DatePicker">
              <DatePicker />
            </Form.Item>
            <Form.Item label="RangePicker">
              <RangePicker />
            </Form.Item>
            <Form.Item label="InputNumber">
              <InputNumber />
            </Form.Item>
            <Form.Item label="TextArea">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload action="/upload.do" listType="picture-card">
                <button
                  style={{
                    color: "inherit",
                    cursor: "inherit",
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>

            <Form.Item label="Slider">
              <Slider />
            </Form.Item>
            <Form.Item label="ColorPicker">
              <ColorPicker />
            </Form.Item>
            <Form.Item label="Rate">
              <Rate />
            </Form.Item>
            {/* <Form.Item label={null}> */}
            <Button type="primary" htmlType="submit" onClick={submited}>
              Submit
            </Button>
            {/* </Form.Item> */}
          </Form>
        </div>
      )}
      {secondForm && (
        <div
          style={{
            width: "100%",
            height: "100%",
            // border: "1px solid red",
          }}
        >
          <Form
            form={form}
            name="form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              label="fullName"
              name="fullName"
              rules={[
                { required: true, message: "Enter your fullName" },
                { min: 4, message: "fullName must be 4 charecter" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                { required: true, message: "Enter your Email" },
                { min: 4, message: "Enter a valid email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="password"
              name="password"
              rules={[
                { required: true, message: "Enter your Password" },
                { min: 4, message: "Password must be 4 charecter" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <Button type="primary" onClick={handleSubmit}>
                submit
              </Button>
              <Button type="primary" onClick={onFinishFailed}>
                finishedfailed
              </Button>
              <Button type="primary" onClick={ongetFieldError}>
                getFieldError
              </Button>
              <Button type="primary" onClick={ongetFieldsError}>
                getFieldsError
              </Button>
              <Button type="primary" onClick={ongetFieldValue}>
                getFieldValue
              </Button>
              <Button type="primary" onClick={ongetFieldsValue}>
                getFieldsValue
              </Button>
              <Button type="primary" onClick={onisFieldsTouched}>
                isFieldsTouched
              </Button>
              <Button type="primary" onClick={onIsFieldTouched}>
                isFieldTouched
              </Button>
              <Button type="primary" onClick={onisFieldValidating}>
                isFieldValidating
              </Button>
              <Button type="primary" onClick={handleResetFields}>
                ResetFields
              </Button>
              <Button type="primary" onClick={onScrollToFilled}>
                ScrollToFilled
              </Button>
              <Button type="primary" onClick={onSetFilled}>
                SetFilled
              </Button>
              <Button type="primary" onClick={onSetFieldValue}>
                SetFieldValue
              </Button>
              <Button type="primary" onClick={onSetFieldsValues}>
                SetFieldsValues
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default Forms;



// {firstForm && (
//   <div className="responsive-form-container">
//     <Form
//       labelCol={{ span: 4 }}
//       wrapperCol={{ span: 14 }}
//       form={forms1}
//       name="forms1"
//       layout="vertical"
//       style={{ width: "500px", minWidth: "300px", maxWidth: "100%" }}
//       onFinish={onsubmit}
//     >
//       {/* ...existing Form.Item components... */}
//       <Button type="primary" htmlType="submit" onClick={submited}>
//         Submit
//       </Button>
//     </Form>
//   </div>
// )}