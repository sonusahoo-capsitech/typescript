import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance/axiosInstance";
// import { data } from "react-router-dom";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data") || "{}"),
};



interface SignupStudentData {
  name: string;
  email: string;
  password: string;
}

export async function signupUser(userData: SignupStudentData) {
  try {
    
    console.log(userData);
    const response = await axiosInstance.post("/api/auth/v1/signup", userData);
    console.log(response);
    if (!response.data) {
      throw new Error("Failed to signup");
    }
    return response?.data;
  } catch (error) {
    console.log(error)
    return ;
  }
}
interface LoginData{
  email:string,
  password:string
}

export  const login = createAsyncThunk("student/login", async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/api/auth/v1/login",data);
    console.log(response);

    return (await response)?.data;
  } catch (error) {
    console.log(error)
  }
});

const authSlice =createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(
      login.fulfilled,
      (
        state: typeof initialState,
        action: {
          type: string;
          payload: {
            user: {
              role: string;
              // [key: string]: any;
            };
            // [key: string]: any;
          };
        }
      ) => {
        console.log(action)
        state.isLoggedIn = true;
        state.role = action.payload?.user?.role;
        state.data = action.payload?.user;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", action.payload?.user?.role);
        localStorage.setItem("data", JSON.stringify(action.payload?.user));
      }
      );
  },
})

export default authSlice.reducer;
