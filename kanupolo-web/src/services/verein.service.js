import http from "../http-common";

class VereinDataService {
    getAll() {
        return http.get("/vereins");
    }

    getAllConditionPagionation(page, size) {
        return http.get(`/vereins?page=${page}&size=${size}`);
    }

    get(id) {
        return http.get(`/vereins/${id}`);
    }

    create(data) {
        return http.post("/vereins/", data);
    }

    update(id, data) {
        return http.put(`/vereins/${id}`, data);
    }

    delete(id) {
        return http.delete(`/vereins/${id}`);
    }

    deleteAll() {
        return http.delete(`/vereins/`);
    }
}

export default new VereinDataService();