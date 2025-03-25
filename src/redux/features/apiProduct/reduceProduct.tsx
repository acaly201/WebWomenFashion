import { createAppSlice } from "@/redux/createAppSlice";
import { apiAllProduct } from "./apiProduct";
import { act } from "react";

export interface ShowState1 {
  dataApi: object[];
  dataApi1: object[];
  dataImgs: { id: number; url: string; color: string; stock: any; size: any }[];
  idProduct: number;
  status: "idle" | "loading" | "failed";
  dataFrequentlyBoughtTogether: { id: number; url: string; color: string }[];
  textSearch: string;
  statusResultSearch: string;
}

const initialState: ShowState1 = {
  dataApi: [],
  dataApi1: [],
  dataImgs: [],
  idProduct: 0,
  dataFrequentlyBoughtTogether: [],
  textSearch: "",
  statusResultSearch: "",
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
          (value) => value.id != action.payload[0].featured_image.product_id
        ),
        {
          id: action.payload[0].featured_image.product_id,
          url: action.payload[0].featured_image.src,
          color:
            action.payload[1] == "img"
              ? action.payload[0].option2 == null
                ? action.payload[0].title
                : action.payload[0].option2
              : state.dataImgs.filter(
                  (item) =>
                    item.id == action.payload[0].featured_image.product_id
                )[0].color,
          stock:
            action.payload[1] == "img"
              ? action.payload[0].featured_image.stock
              : state.dataImgs.filter(
                  (item) =>
                    item.id == action.payload[0].featured_image.product_id
                )[0].stock,
          size:
            action.payload[1] == "size"
              ? action.payload[0].option1
              : state.dataImgs.filter(
                  (item) =>
                    item.id == action.payload[0].featured_image.product_id
                )[0].size,
        },
      ];
    },
    showImg2: (state, action) => {
      console.log(action.payload);
      state.dataFrequentlyBoughtTogether = [
        ...state.dataFrequentlyBoughtTogether.filter(
          (value) =>
            value.id != action.payload.variants[0].featured_image.product_id
        ),
        {
          id: action.payload.variants[0].featured_image.product_id,
          url: action.payload.variants.filter(
            (value: any) => value.title == action.payload.color
          )[0].featured_image.src,
          color: action.payload.color,
        },
      ];
    },
    textSearch: (state, action) => {
      state.textSearch = action.payload;
      console.log(state.textSearch);
    },
    dataProductBySearch: (state, action) => {
      state.dataApi1 = action.payload.filter(
        (item: any) =>
          item.title.toLowerCase().includes(state.textSearch.toLowerCase()) ==
          true
      );
      if (state.textSearch == "") {
        state.dataApi1 = [];
      }
      if (
        state.textSearch != "" &&
        action.payload.filter(
          (item: any) =>
            item.title.toLowerCase().includes(state.textSearch.toLowerCase()) ==
            true
        ).length == 0
      ) {
        state.statusResultSearch = `No results found for "${state.textSearch}". Check the spelling or use a different word or phrase.`;
      }else{
        state.statusResultSearch =''
      }
         state.textSearch = ""
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
          color:
            value.type == "clothes"
              ? value.variants[0].title
              : value.variants[0].option2,
          stock: value.variants[0].featured_image?.stock,
          size: value.variants[0].option1,
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
    selectTextSearch: (value) => value.textSearch,
    selectData: (value) => value.dataApi,
    selectData1: (value) => value.dataApi1,
    selectDataImg: (value) => value.dataImgs,
    selectId: (value) => value.idProduct,
    selectStatusResultSearch: (value) => value.statusResultSearch,
    status: (value) => value.status,
    selectDataFrequentlyBoughtTogether: (value) =>
      value.dataFrequentlyBoughtTogether,
  },
});

export const { showImg, textSearch, showImg2, dataProductBySearch } =
  apiProductReduce.actions;

export const {
  selectData,
  selectData1,
  status,
  selectDataImg,
  selectId,
  selectDataFrequentlyBoughtTogether,
  selectTextSearch,
  selectStatusResultSearch,
} = apiProductReduce.selectors;
