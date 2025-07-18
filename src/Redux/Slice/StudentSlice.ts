import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance/axiosInstance";

const initialState = {
  data: JSON.parse(localStorage.getItem("data") || "[]"),
};
// All API
interface SignupStudentData {
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

interface UpdateStudentData {
  Name?: string;
  FatherName?: string;
  Date_of_Birth?: string;
  Gender?: string;
  Class?: string;
  Address?: string;
  School?: string;
  Medium?: string;
  SchoolAddress?: string;
}

export async function registerUser(userData: SignupStudentData) {
  try {
    console.log(userData);
    const response = await axiosInstance.post(
      "/api/StudentRegister/v1/registerStudent",
      userData
    );
    console.log("The response is ", response);
    if (!response.data?.user?.isSuccess) {  
      throw new Error("Failed to register");
    }
    return response?.data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export const GetAlluser = createAsyncThunk(
  "student/login",
  async ({ pageNumber, pageSize , sortField, sortOrder }: { pageNumber: number; pageSize: number , sortField: string , sortOrder :string }) => {
    try {
      console.log("The filed's are",sortField,sortOrder);
      const response = await axiosInstance.get(`/api/StudentRegister/v1/AllUser?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortField}&sortOrder=${sortOrder}`, {
        params: { pageNumber, pageSize ,sortField, sortOrder},
      });
      console.log(response);

      return (await response)?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface id {
  studentId: string;
}

export async function deleteUser(studentId: id) {
  try {
    console.log(studentId);
    const response = await axiosInstance.delete(
      `/api/StudentRegister/v1/DeleteStudentDetails/${studentId} `
    );
    console.log("The response is ", response);
    if (!response.data?.success) {
      throw new Error("Failed to register");
    }
    return response?.data;
  } catch (error) {
    console.log(error);
    return;
  }
}



export async function UpdateUser(
  studentId: id,
  updateStudentData: UpdateStudentData
) {
  try {
    const response = await axiosInstance.put(
      `/api/StudentRegister/v1/editStudentDetails/${studentId}`,
      updateStudentData
    );
    console.log("The response is ", response);
    if (!response) {
      throw new Error("Failed to register");
    }
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}

//All slice 
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      GetAlluser.fulfilled,
      (
        state: typeof initialState,
        action: {
          type: string;
          payload: {
            data: Array<{ [key: string]: any }>;
            
          };
        }
      ) => {
        if (action.payload && Array.isArray(action.payload.data)) {
          state.data = action.payload.data;
          localStorage.setItem("data", JSON.stringify(action.payload.data));
        } else {
          state.data = [];
          localStorage.setItem("data", "[]");
        }
      }
    );
  },
});

export default studentSlice.reducer;




