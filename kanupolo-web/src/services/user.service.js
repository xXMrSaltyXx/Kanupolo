import http from "../http-common";

class UserDataService {
    getAllPagionation(page, size) {
        return http.get(`/users?page=${page}&size=${size}`);
    }

    getAllWithoutPagination() {
        return http.get(`/users/without-pagination`);
    }

    getAllWithRoleAndPass(page, size) {
        return http.get(`/users/role-pass?page=${page}&size=${size}`);
    }

    getUserData(id) {
        return http.get(`/users/user-data/${id}`);
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

var userDataService = new UserDataService();
export default userDataService;