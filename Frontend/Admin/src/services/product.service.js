import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/Products") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (
          await this.api.post("/", data, {
            headers: {
              "Content-Type": "multipart/form-data", // Đảm bảo định dạng dữ liệu là multipart/form-data
            },
          })
        ).data;
      }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
      return (
        await this.api.put(`/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Đảm bảo định dạng dữ liệu là multipart/form-data
          },
        })
      ).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}

export default new ProductService();