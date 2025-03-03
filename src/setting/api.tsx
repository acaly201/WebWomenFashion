export const Api_URL = 'http://localhost:4000';
export const PREFIX = "/"
export const NAME_API = {
    List_Sample: 'list_sample'
}
export const Api = {
    List_Sample : {
        getAll : Api_URL+ PREFIX + NAME_API.List_Sample,
        getById : Api_URL+ PREFIX + NAME_API.List_Sample + PREFIX
    }
}