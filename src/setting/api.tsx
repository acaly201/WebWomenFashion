export const Api_URL = "http://localhost:4000";
export const PREFIX = "/";
export const NAME_API = {
  List_Sample: "list_sample",
  Demo_Guide: "demo_guide",
  List_Product :"list_product"
};
export const Api = {
  List_Sample: {
    getAll: Api_URL + PREFIX + NAME_API.List_Sample,
    getById: Api_URL + PREFIX + NAME_API.List_Sample + PREFIX,
  },
  Demo_Guide: {
    getAll: Api_URL + PREFIX + NAME_API.Demo_Guide,
    getById: Api_URL + PREFIX + NAME_API.Demo_Guide + PREFIX,
    getByContent :Api_URL + PREFIX,
  },
  List_Product: {
    getAll: Api_URL + PREFIX + NAME_API.List_Product ,
    getById:Api_URL + PREFIX + NAME_API.List_Product + PREFIX,
  }
};
