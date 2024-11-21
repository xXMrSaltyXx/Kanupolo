import http from "../http-common";

class VerbandDataService {
    getAll() {
        return http.get("/verbands");
    }

    getAllConditionPagionation(page, size) {
        return http.get(`/verbands?page=${page}&size=${size}`);
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

var verbandDataService = new VerbandDataService();
export default verbandDataService;