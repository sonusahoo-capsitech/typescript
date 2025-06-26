/*

// ...existing code...
const updateStudentDetails = async (record) => {
  setId(record.id);
  console.log("the record is ", record);

  // Format date for input type="date"
  let formattedDate = "";
  if (record.date_of_Birth) {
    const date = new Date(record.date_of_Birth);
    formattedDate = date.toISOString().split("T")[0]; // yyyy-MM-dd
  }

  setStudentData({
    Name: record.name,
    FatherName: record.fatherName,
    Date_of_Birth: formattedDate,
    Gender: record.gender,
    Class: record.class,
    Address: record.address,
    School: record.school,
    Medium: record.medium,
    SchoolAddress: record.schoolAddress,
  });

  form1.setFieldsValue({
    ...record,
    Date_of_Birth: formattedDate,
  });

  setUpdateOpen(true);
};
// ...existing code...





// Example usage of message.useMessage() with nested Context Providers

import React, { createContext } from "react";
import { message } from "antd";

const Context1 = createContext<string>("Default1");
const Context2 = createContext<string>("Default2");

const App: React.FC = () => {
  const [api, contextHolder] = message.useMessage();

  return (
    <Context1.Provider value="Ant">
      {/* contextHolder is inside Context1, so api gets Context1's value */}
      {contextHolder}
      <Context2.Provider value="Design">
        {/* contextHolder is outside Context2, so api does NOT get Context2's value */}
        {/* ...other components... */}
      </Context2.Provider>
    </Context1.Provider>
  );
};

export default App;
