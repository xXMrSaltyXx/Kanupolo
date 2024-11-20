import http from "../http-common";

class VerbandDataService {
    getAllConditionPagionation(page, size, condition) {
        return http.get(`/verbands?page=${page}&size=${size}&condition=${condition}`);
    }

    get(id) {
        return http.get(`/verbands/${id}`);
    }

    create(data) {
        return http.post("/verbands/", data);
    }

    update(id, data) {
        return http.put(`/verbands/${id}`, data);
    }

    delete(id) {
        return http.delete(`/verbands/${id}`);
    }

    deleteAll() {
        return http.delete(`/verbands/`);
    }

}

export default new VerbandDataService();