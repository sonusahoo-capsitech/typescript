import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import {
  deleteUser,
  GetAlluser,
  registerUser,
  UpdateUser,
} from "../../Redux/Slice/StudentSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../Redux/Store.ts";
import { Button, Modal, Input, Form, Select } from "antd";
import type { FormProps } from "antd";
import dayjs from "dayjs";
// import type { TableColumnsType, TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
interface StudentsData {
  Name: string;
  FatherName: string;
  Date_of_Birth: string;
  Gender: string;
  Class: string;
  Address: string;
  School: string;
  Medium: string;
  SchoolAddress: string;
}

const sortFieldMap: Record<string, string> = {
  name: "Name",
  fatherName: "FatherName",
  date_of_Birth: "Date_of_Birth",
  gender: "Gender",
  class: "Class",
  address: "Address",
  school: "School",
  medium: "Medium",
  schoolAddress: "SchoolAddress",
};

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const studentData = useSelector((state) => state?.student?.data);
  console.log(studentData);
  const [form] = Form.useForm();
  // const [openDelete, setOpenDelete] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [selectedStudentKey, setSelectedStudentKey] = useState<string | null>(
    null
  );
  const [StudentData, setStudentData] = useState<StudentsData>({
    Name: "",
    FatherName: "",
    Date_of_Birth: "",
    Gender: "",
    Class: "",
    Address: "",
    School: "",
    Medium: "",
    SchoolAddress: "",
  });
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);

  const [form1] = Form.useForm();
  const [id, setId] = useState("");
  const [updateOpen, setUpdateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [paginations, setPagination] = useState({
    pageNumber: 1,
    pageSize: 5,
    total: 0,
  });
  const data: DataType[] = studentData;
  console.log(data);

  const openDeletePopup = (key: string) => {
    console.log("the key is ", key);
    setSelectedStudentKey(key);
    setDeletePopupVisible(true);
    setId(key);
  };

  const closeDeletePopup = () => {
    setDeletePopupVisible(false);
    setSelectedStudentKey(null);
  };

  const confirmDelete = async () => {
    console.log("The id is ", id);
    setConfirmLoading(true);
    const response = await deleteUser(id);
    console.log(response);
    if (response.success) {
      setOpen(false);
      setConfirmLoading(false);
    }
    closeDeletePopup();
    fetchData(
      paginations.pageNumber,
      paginations.pageSize,
      undefined,
      undefined
    );
  };

  interface UpdateStudentRecord {
    id: string;
    name: string;
    fatherName: string;
    date_of_Birth: string;
    gender: string;
    class: string;
    address: string;
    school: string;
    medium: string;
    schoolAddress: string;
    // [key: string]: any;
  }

  const updateStudentDetails = async (
    record: UpdateStudentRecord
  ): Promise<void> => {
    setId(record.id);
    console.log("the record is ", record);

    let formattedDate: string = "";
    if (record.date_of_Birth) {
      const date = new Date(record.date_of_Birth);
      formattedDate = date.toISOString().split("T")[0];
    }
    form1.setFieldsValue(record);

    console.log(form1.setFieldValue("Name", record.name));
    console.log(form1.setFieldValue("FatherName", record.fatherName));
    console.log(form1.setFieldValue("Date_of_Birth", formattedDate));
    console.log(form1.setFieldValue("Gender", record.gender));
    console.log(form1.setFieldValue("Class", record.class));
    console.log(form1.setFieldValue("Address", record.address));
    console.log(form1.setFieldValue("School", record.school));
    console.log(form1.setFieldValue("Medium", record.medium));
    console.log(form1.setFieldValue("SchoolAddress", record.schoolAddress));
    console.log("The studnet data is", studentData);
    setUpdateOpen(true);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      sorter: {},
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "FatherName",
      dataIndex: "fatherName",
      key: "fatherName",
      render: (text) => <a>{text}</a>,
      sorter: {},
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Date_of_Birth",
      dataIndex: "date_of_Birth",
      key: "date_of_Birth",
      render: (date_of_Birth) => {
        const date = new Date(date_of_Birth);
        const formattedDate = date.toISOString().split("T")[0];
        const resizeDate = dayjs(formattedDate).format("DD-MM-YYYY");
        return <>{resizeDate}</>;
      },
      sorter: {},
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => {
        let color = "default";
        if (gender === "Male") color = "red";
        else if (gender === "Female") color = "magenta";
        else color = "gold";
        return <Tag color={color}>{gender}</Tag>;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "School",
      dataIndex: "school",
      key: "school",
    },
    {
      title: "Medium",
      dataIndex: "medium",
      key: "medium",
    },
    {
      title: "SchoolAddress",
      dataIndex: "schoolAddress",
      key: "schoolAddress",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Button
            color="purple"
            variant="filled"
            onClick={() => {
              updateStudentDetails(record);
            }}
          >
            Update
          </Button>
          <Button
            danger
            type="dashed"
            onClick={() => openDeletePopup(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  //all ant code

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };
  const handelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.name);
    const { name, value } = e.target;
    setStudentData({
      ...StudentData,
      [name]: value,
    });
  };
  const onEditSubmit: FormProps<StudentsData>["onFinish"] = async (value) => {
    console.log("The update value is  ", value);
  };

  const onFinish: FormProps<StudentsData>["onFinish"] = async (values) => {
    try {
      setSubmitLoading(true);
      console.log(values);
      const newVal = {
        ...values,
        Date_of_Birth: dayjs(values.Date_of_Birth).format("YYYY-MM-DD"),
      };
      console.log(newVal);
      const response = await registerUser(newVal);
      if (response) {
        form.resetFields();
        setStudentData({
          Name: "",
          FatherName: "",
          Date_of_Birth: "",
          Gender: "",
          Class: "",
          Address: "",
          School: "",
          Medium: "",
          SchoolAddress: "",
        });
        setOpen(false);

        fetchData(
          paginations.pageNumber,
          paginations.pageSize,
          sortField,
          sortOrder
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchData = async (
    pageNumber = paginations.pageNumber,
    pageSize = paginations.pageSize,
    sortField: string,
    sortOrder: string
  ) => {
    const backendSortField = sortFieldMap[sortField] || "Name";
    const backendSortOrder = sortOrder || "asc";
    console.log(
      "The fields sent to backend: ",
      backendSortField,
      backendSortOrder
    );
    // console.log("The fileds  are inside the fetchdat a ", sortField, sortOrder);
    const response = await dispatch(
      GetAlluser({ pageNumber, pageSize, sortField: backendSortField, sortOrder: backendSortOrder  })
    );
    if (response.payload?.success) {
      setPagination((prev) => ({
        ...prev,
        total: response.payload?.total,
      }));
    }
  };

  const handelInputChangeForm = async () => {};

  const getingFormValue = async () => {
    try {
      setUpdateLoading(true);
      const allUpdatedata = form1.getFieldsValue();
      const response = await UpdateUser(id, allUpdatedata);
      console.log(response);
      if (response) {
        fetchData(
          paginations.pageNumber,
          paginations.pageSize,
          sortField,
          sortOrder
        );
        setUpdateOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateLoading(false);
    }
  };
  const onChange: TableProps<DataType>["onChange"] = async (
    pagination,
    filters,
    sorter
  ) => {
    const newPageNumber = pagination.current || 1;
    const newPageSize = pagination.pageSize || 5;
    console.log(sorter);
    console.log(pagination);
    console.log(filters);
    // let sortField, sortOrder;
    let field: string | undefined;
    let order: string | undefined;
    if (sorter && !Array.isArray(sorter)) {
      field = (sorter.field as string) || sortField;
      // sortField = sorter.field;
      order =
        sorter.order === "ascend"
          ? "asc"
          : sorter.order === "descend"
          ? "desc"
          : undefined;

      setSortField(field);
      setSortOrder(order);
    }
    setPagination((prev) => ({
      ...prev,
      pageNumber: newPageNumber,
      pageSize: newPageSize,
    }));
    console.log("The field is ", order);
    await fetchData(newPageNumber, newPageSize, field, order);
  };
  const cancelStudent = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    setUpdateOpen(false);
  };

  // end ant code

  useEffect(() => {
    fetchData(
      paginations.pageNumber,
      paginations.pageSize,
      sortField || "name",
      sortOrder || "asc"
    );
  }, [paginations.pageNumber, paginations.pageSize, sortField, sortOrder]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            height: "30%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="primary" onClick={showModal}>
            Add new Student
          </Button>
          <Modal
            title="Basic Modal"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: false }}
            footer={null}
            confirmLoading={confirmLoading}
          >
            {/* -----------------------------------------------form------------------------ */}

            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Full Name"
                name="Name"
                rules={[{ required: true, message: "Please enter full name" }]}
              >
                <Input
                  placeholder="Enter full name"
                  name="Name"
                  onChange={handelInputChange}
                  value={StudentData.Name}
                />
              </Form.Item>
              <Form.Item
                label="Father Name"
                name="FatherName"
                rules={[
                  { required: true, message: "Please enter father name" },
                ]}
              >
                <Input
                  placeholder="Enter father name"
                  onChange={handelInputChange}
                  name="Name"
                  value={StudentData.FatherName}
                />
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="Date_of_Birth"
                rules={[
                  { required: true, message: "Please select date of birth" },
                ]}
              >
                <Input
                  type="date"
                  name="Date_of_Birth"
                  onChange={handelInputChange}
                  value={StudentData.Date_of_Birth}
                />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="Gender"
                rules={[{ required: true, message: "Please select gender" }]}
              >
                <Select
                  placeholder="Select gender"
                  onChange={(value) => {
                    console.log(value);
                  }}
                  value={StudentData.Gender}
                >
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Class"
                name="Class"
                rules={[{ required: true, message: "Please enter class" }]}
              >
                <Input
                  placeholder="Enter class"
                  name="Class"
                  onChange={handelInputChange}
                  value={StudentData.Class}
                />
              </Form.Item>
              <Form.Item
                label="Address"
                name="Address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input
                  placeholder="Enter address"
                  onChange={handelInputChange}
                  name="Address"
                  value={StudentData.Address}
                />
              </Form.Item>
              <Form.Item
                label="School"
                name="School"
                rules={[{ required: true, message: "Please enter school" }]}
              >
                <Input
                  placeholder="Enter school"
                  name="School"
                  onChange={handelInputChange}
                  value={StudentData.School}
                />
              </Form.Item>
              <Form.Item
                label="Medium"
                name="Medium"
                rules={[{ required: true, message: "Please enter medium" }]}
              >
                <Input
                  placeholder="Enter medium"
                  onChange={handelInputChange}
                  name="Medium"
                  value={StudentData.Medium}
                />
              </Form.Item>
              <Form.Item
                label="School Address"
                name="SchoolAddress"
                rules={[
                  { required: true, message: "Please enter school address" },
                ]}
              >
                <Input
                  placeholder="Enter school address"
                  name="SchoolAddress"
                  onChange={handelInputChange}
                  value={StudentData.SchoolAddress}
                />
              </Form.Item>
              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            {/* ------------------------------------- form end-------------------------------*/}
          </Modal>
        </div>
        <div>
          <Table<DataType>
            columns={columns}
            dataSource={data}
            rowKey="id"
            onChange={onChange}
            pagination={{
              current: paginations.pageNumber,
              pageSize: paginations.pageSize,
              total: paginations.total,
              hideOnSinglePage: true,
            }}
          />
        </div>
        <Modal
          title="Confirm Delete"
          open={deletePopupVisible}
          onOk={confirmDelete}
          onCancel={closeDeletePopup}
          confirmLoading={confirmLoading}
          okText="Yes, Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this student?</p>
        </Modal>
        <Modal
          title="Update Student"
          open={updateOpen}
          // onOk={updateStudent}
          onCancel={cancelStudent}
          // okText={"Update"}
          // confirmLoading={confirmLoading}
          footer={null}
        >
          {/* -----------------form1---------------------------- */}
          <Form form={form1} onFinish={onEditSubmit}>
            <Form.Item
              label="Full Name"
              name="Name"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input
                placeholder="Enter full name"
                name="Name"
                onChange={handelInputChangeForm}
                value={StudentData.Name}
              />
            </Form.Item>
            <Form.Item
              label="Father Name"
              name="FatherName"
              rules={[{ required: true, message: "Please enter father name" }]}
            >
              <Input
                placeholder="Enter father name"
                onChange={handelInputChangeForm}
                name="Name"
                value={StudentData.FatherName}
              />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="Date_of_Birth"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
            >
              <Input
                type="date"
                name="date_of_Birth"
                onChange={handelInputChangeForm}
                value={StudentData.Date_of_Birth}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="Gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select
                placeholder="Select gender"
                onChange={(value) => {
                  console.log(value);
                }}
                value={studentData.Gender}
              >
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Class"
              name="Class"
              rules={[{ required: true, message: "Please enter class" }]}
            >
              <Input
                placeholder="Enter class"
                name="Class"
                onChange={handelInputChangeForm}
                value={StudentData.Class}
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input
                placeholder="Enter address"
                onChange={handelInputChangeForm}
                name="Address"
                value={StudentData.Address}
              />
            </Form.Item>
            <Form.Item
              label="School"
              name="School"
              rules={[{ required: true, message: "Please enter school" }]}
            >
              <Input
                placeholder="Enter school"
                name="School"
                onChange={handelInputChangeForm}
                value={StudentData.School}
              />
            </Form.Item>
            <Form.Item
              label="Medium"
              name="Medium"
              rules={[{ required: true, message: "Please enter medium" }]}
            >
              <Input
                placeholder="Enter medium"
                onChange={handelInputChangeForm}
                name="Medium"
                value={StudentData.Medium}
              />
            </Form.Item>
            <Form.Item
              label="School Address"
              name="SchoolAddress"
              rules={[
                { required: true, message: "Please enter school address" },
              ]}
            >
              <Input
                placeholder="Enter school address"
                name="SchoolAddress"
                onChange={handelInputChange}
                value={StudentData.SchoolAddress}
              />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={getingFormValue}
                loading={updateLoading}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
          {/* ----------------------form2----------------------- */}
        </Modal>
      </div>
    </>
  );
};

export default App;
