import http from "../http-common";

class RoleDataService {
    getAllConditionPagionation(page, size) {
        return http.get(`/roles?page=${page}&size=${size}`);
    }

    get(id) {
        return http.get(`/roles/${id}`);
    }

    create(data) {
        return http.post("/roles/", data);
    }

    update(id, data) {
        return http.put(`/roles/${id}`, data);
    }

    delete(id) {
        return http.delete(`/roles/${id}`);
    }

    deleteAll() {
        return http.delete(`/roles/`);
    }
}

var roleDataService = new RoleDataService();
export default roleDataService;