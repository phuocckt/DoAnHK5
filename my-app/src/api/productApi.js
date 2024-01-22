import axiosClient from "./axiosClient";

const productApi = {
    getAll(params){
        const url = '/Products';
        return axiosClient.get(url, {params});
    },

    get(id){
        const url = `/Products/${id}`;
        return axiosClient.get(url);
    },

    add(data){
        const url = '/Products';
        return axiosClient.post(url, data);
    },

    update(data){
        const url = `/Products/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id){
        const url = `/Products/${id}`;
        return axiosClient.delete(url);
    },
}

export default productApi;