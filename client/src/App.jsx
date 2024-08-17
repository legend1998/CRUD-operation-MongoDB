import { useEffect, useRef, useState } from "react";
import CustomerService from "./service/customerService";
import CreateCustomer from "./CreateCustomer";

function App() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState([]);

  const customerFormRef = useRef();

  useEffect(() => {
    CustomerService.getCustomers().then((res) => setCustomers(res));
  }, []);

  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const handleSelectCustomer = (id) => {
    if (selected.includes(id))
      setSelected(selected.filter((item) => item != id));
    else setSelected([...selected, id]);
  };

  const handleShowForm = () => {
    if (customerFormRef.current.style.display == "none") {
      customerFormRef.current.style.display = "block";
    } else {
      customerFormRef.current.style.display = "none";
    }
  };

  const handleDelete = async () => {
    for (const id of selected) {
      const response = await CustomerService.deleteCustomer(id);
    }
    setCustomers(
      customers.filter((customer) => !selected.includes(customer._id))
    );
    setSelected([]);
  };

  return (
    <div className="bg-black text-white h-screen overflow-scroll">
      <div className=""></div>
      <div className="p-5 flex gap-4">
        <div className="flex-1">
          <div className="flex justify-between gap-5 items-center py-5">
            <p className="">Customer table</p>
            <div className="flex justify-end gap-5 items-center">
              {selected.length > 0 && (
                <button
                  onClick={handleDelete}
                  className="h-12 border border-red-500 text-red-500 px-3 bg-white bg-opacity-20 rounded"
                >
                  Delete selected
                </button>
              )}
              <button
                onClick={handleShowForm}
                className="h-12 px-3 bg-white bg-opacity-20 rounded"
              >
                Add New Customer
              </button>
            </div>
          </div>
          <table className=" table-auto text-left w-full border rounded overflow-hidden">
            <thead>
              <tr className="h-12 bg-white bg-opacity-50">
                <th></th>
                <th>Sl. No.</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  key={customer._id}
                  className="h-10 hover:bg-white hover:bg-opacity-30"
                >
                  <td className="text-center bg-transparent">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                      onChange={() => handleSelectCustomer(customer._id)}
                    />
                  </td>
                  <td>{index + 1}.</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          ref={customerFormRef}
          style={{ display: "none" }}
          className="w-1/3 bg-white bg-opacity-30 h-min"
        >
          <CreateCustomer callback={addCustomer} />
        </div>
      </div>
    </div>
  );
}

export default App;
