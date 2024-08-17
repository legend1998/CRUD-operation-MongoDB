export default class CustomerService {
  static SERVER_URL = "http://localhost:8080/customer";

  static async getCustomers() {
    const response = await fetch(this.SERVER_URL);
    return await response.json();
  }

  static async createCustomer(customer) {
    const response = await fetch(this.SERVER_URL, {
      body: JSON.stringify(customer),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  }

  static async deleteCustomer(customerId) {
    const response = await fetch(this.SERVER_URL + "/" + customerId, {
      method: "DELETE",
    });

    return await response.json();
  }

  static async updateCustomer(customerId, update) {
    const response = await fetch(this.SERVER_URL + "/" + customerId, {
      method: "PATCH",
      body: update,
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  }
}
