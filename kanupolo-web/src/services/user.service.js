import http from "../http-common";

class UserDataService {
    getAllConditionPagionation(page, size, condition) {
        return http.get(`/users?page=${page}&size=${size}&condition=${condition}`);
    }

    get(id) {
        return http.get(`/users/${id}`);
    }

    create(data) {
        return http.post("/users/", data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }

    deleteAll() {
        return http.delete(`/users/`);
    }
}

export default new UserDataService();