import { createAppSlice } from "@/redux/createAppSlice";
import { apiAllProduct } from "./apiProduct";
import { act } from "react";

export interface ShowState1 {
  dataApi: object[];
  dataImgs: { id: number; url: string; color: string; stock: any }[];
  idProduct: number;
  status: "idle" | "loading" | "failed";
  dataFrequentlyBoughtTogether: { id: number; url: string; color: string }[];
}

const initialState: ShowState1 = {
  dataApi: [],
  dataImgs: [],
  idProduct: 0,
  dataFrequentlyBoughtTogether: [],
  status: "idle",
};

export const apiProductReduce = createAppSlice({
  name: "products",
  initialState,
  // Xử lý action
  reducers: {
    showImg: (state, action) => {
      state.dataImgs = [
        ...state.dataImgs.filter(
          (value) => value.id != action.payload.featured_image.product_id
        ),
        {
          id: action.payload.featured_image.product_id,
          url: action.payload.featured_image.src,
          color: action.payload.title,
          stock: action.payload.featured_image.stock,
        },
      ];
    },
    showImg2: (state, action) => {
      console.log(action.payload);
      state.dataFrequentlyBoughtTogether = [
        ...state.dataFrequentlyBoughtTogether.filter(
          (value) => value.id != action.payload.variants[0].featured_image.product_id
        ),
        {
          id: action.payload.variants[0].featured_image.product_id,
          url: action.payload.variants.filter((value:any)=>value.title == action.payload.color)[0].featured_image.src,
          color: action.payload.color,
        },
      ];
    },
    byProduct: (state, action) => {
      state.idProduct = action.payload;
    },
  },

  // Gọi API
  extraReducers: (builder) => {
    builder.addCase(apiAllProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(apiAllProduct.fulfilled, (state, action) => {
      state.status = "idle";
      state.dataApi = action.payload;
      state.dataImgs = action.payload.map((value: any) => {
        return {
          id: value.id,
          url: value.featured_image,
          color: value.variants[0].title,
          stock: value.variants[0].featured_image?.stock,
        };
      });
      state.dataFrequentlyBoughtTogether = action.payload.map((value: any) => {
        return {
          id: value.id,
          url: value.featured_image,
          color: value.variants[0].title,
        };
      });
    });
    builder.addCase(apiAllProduct.rejected, (state) => {
      state.status = "failed";
    });
  },
  selectors: {
    selectData: (value) => value.dataApi,
    selectDataImg: (value) => value.dataImgs,
    selectId: (value) => value.idProduct,
    status: (value) => value.status,
    selectDataFrequentlyBoughtTogether: (value) =>
      value.dataFrequentlyBoughtTogether,
  },
});

export const { showImg, byProduct, showImg2 } = apiProductReduce.actions;

export const {
  selectData,
  status,
  selectDataImg,
  selectId,
  selectDataFrequentlyBoughtTogether,
} = apiProductReduce.selectors;
