import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "@/redux/createAppSlice";
import type { AppThunk } from "@/redux/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export const apiProduct = createAsyncThunk("apiproduct", async () => {
  const reponse = await fetch("http://localhost:4000/list_product");
  return reponse.json();
});

export interface ShowState {
  dataSelect: object[];
  status: "idle" | "loading" | "failed";
}

const initialState: ShowState = {
  dataSelect: [],
  status: "idle",
};

export const apiProductReduce = createAppSlice({
  name: "products",
  initialState,
  reducers: {
    showDemo: (state) => {},
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(apiProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(apiProduct.fulfilled, (state, action) => {
      state.status = "idle";
      state.dataSelect = action.payload;
    });
    builder.addCase(apiProduct.rejected, (state) => {
      state.status = "failed";
    });
  },
  selectors: {
    selectData: (value) => value.dataSelect,
    status:(value) => value.status
  },
});

export const { showDemo } = apiProductReduce.actions;

export const { selectData ,status} = apiProductReduce.selectors;
