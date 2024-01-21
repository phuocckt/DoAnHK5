import axiosClient from "./axiosClient";

const CartApi = {
    getAll(params){
        const url = '/cart';
        return axiosClient.get(url, {params});
    },

    get(id){
        const url = `/cart/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/cart';
        return axiosClient.post(url, data);
    },

    update(data){
        const url = `/cart/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id){
        const url = `/cart/${id}`;
        return axiosClient.delete(url);
    },
}

export default CartApi;