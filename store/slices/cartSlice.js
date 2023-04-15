import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default cartSlice.reducer;
