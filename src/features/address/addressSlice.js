import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as addressApi from "../../api/addressApi";

export const fetchUserAddresses = createAsyncThunk(
  "address/fetchUserAddresses",
  async (_, { rejectWithValue }) => {
    try {
      return await addressApi.getUserAddresses();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
