import http from "../http-common";

class PassDataService {
    getAllConditionPagionation(page, size, condition) {
        return http.get(`/passes?page=${page}&size=${size}&condition=${condition}`);
    }

    get(id) {
        return http.get(`/passes/${id}`);
    }

    create(data) {
        return http.post("/passes/", data);
    }

    update(id, data) {
        return http.put(`/passes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/passes/${id}`);
    }

    deleteAll() {
        return http.delete(`/passes/`);
    }
}

export default new PassDataService();