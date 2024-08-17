import React from "react";
import CustomerService from "./service/customerService";

function CreateCustomer({ callback }) {
  const createCustomer = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let newCustomer = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    newCustomer = await CustomerService.createCustomer(newCustomer);

    callback(newCustomer);
    e.target.reset();
  };
  return (
    <form
      method="POST"
      onSubmit={(e) => createCustomer(e)}
      className="flex flex-col gap-3 items-center justify-center w-full p-5"
    >
      <p className="text-center text-3xl my-5">Create new Customer</p>
      <input
        type="text"
        name="name"
        className="h-10 rounded-sm px-3 w-full bg-white bg-opacity-20"
        required
        placeholder="name"
      />
      <input
        type="email"
        name="email"
        className="h-10 rounded-sm px-3 w-full bg-white bg-opacity-20"
        required
        placeholder="email"
      />
      <button className="px-3 py-2 bg-black  rounded-md " type="submit">
        Add
      </button>
    </form>
  );
}

export default CreateCustomer;
