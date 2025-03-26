import { createAsyncThunk } from "@reduxjs/toolkit";
export const apiAllProduct = createAsyncThunk("apiproduct", async () => {
  const reponse = await fetch(
    "https://webwomenfashion-production.up.railway.app/list_product"
  );
  return reponse.json();
});
