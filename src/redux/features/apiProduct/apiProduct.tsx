import { createAsyncThunk } from "@reduxjs/toolkit";
export const apiAllProduct = createAsyncThunk("apiproduct", async () => {
    const reponse = await fetch("http://localhost:4000/list_product");
    return reponse.json();
  });