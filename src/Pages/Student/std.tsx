// // ...existing code...
//   const columns: TableProps<DataType>["columns"] = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => <a>{text}</a>,
//       sorter: (a, b) => a.name.localeCompare(b.name),
//       sortDirections: ["ascend", "descend"],
//     },
//     {
//       title: "FatherName",
//       dataIndex: "fatherName",
//       key: "fatherName",
//       render: (text) => <a>{text}</a>,
//       sorter: (a, b) => a.fatherName.localeCompare(b.fatherName),
//       sortDirections: ["ascend", "descend"],
//     },
//     {
//       title: "Date_of_Birth",
//       dataIndex: "date_of_Birth",
//       key: "date_of_Birth",
//       render: (date_of_Birth) => {
//         const date = new Date(date_of_Birth);
//         const formattedDate = date.toISOString().split("T")[0];
//         const resizeDate = dayjs(formattedDate).format("DD-MM-YYYY");
//         return <>{resizeDate}</>;
//       },
//       sorter: (a, b) => new Date(a.date_of_Birth).getTime() - new Date(b.date_of_Birth).getTime(),
//       sortDirections: ["ascend", "descend"],
//     },
//     {
//       title: "Gender",
//       dataIndex: "gender",
//       key: "gender",
//       render: (gender) => {
//         let color = "default";
//         if (gender === "Male") color = "red";
//         else if (gender === "Female") color = "magenta";
//         else color = "gold";
//         return <Tag color={color}>{gender}</Tag>;
//       },
//       sorter: (a, b) => a.gender.localeCompare(b.gender),
//       sortDirections: ["ascend", "descend"],
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//       sorter: (a, b) => a.address.localeCompare(b.address),
//       sortDirections: ["ascend", "descend"],
//     },
//     {
//       title: "Class",
//       dataIndex: "class",
//       key: "class",
//       sorter: (a, b) => a.class.localeCompare(b.class),
//       sortDirections: ["ascend", "descend"],
//     },
//     {
//       title: "School",
//       dataIndex: "school",
//       key: "school",
//       sorter: (a, b) => a.school.localeCompare(b.school),
//       sortDirections: ["ascend", "descend"],
//     },
//     {
//       title: "Medium",
//       dataIndex: "medium",
//       key: "medium",
//       sorter: (a, b) => a.medium.localeCompare(b.medium),
//       sortDirections: ["ascend", "descend"],
//     },
//     {
//       title: "SchoolAddress",
//       dataIndex: "schoolAddress",
//       key: "schoolAddress",
//       sorter: (a, b) => a.schoolAddress.localeCompare(b.schoolAddress),
//       sortDirections: ["ascend", "descend"],
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space wrap>
//           <Button
//             color="purple"
//             variant="filled"
//             onClick={() => {
//               updateStudentDetails(record);
//             }}
//           >
//             Update
//           </Button>
//           <Button
//             danger
//             type="dashed"
//             onClick={() => openDeletePopup(record.id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];
// // ...existing code...