import { useState } from "react";
import PropTypes from "prop-types";
import CustomerList from "./CustomerList";
import CustomerService from "../services/CustomerService";

const CustomerComponent = ({ load, customers }) => {
  // State Definitions
  const [id, setId] = useState("");
  const [identityRef, setIdentityRef] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [messageInfo, setMessageInfo] = useState("");
  const [messageError, setMessageError] = useState("");

  // Save or Update Customer
  const save = async (event) => {
    event.preventDefault();

    try {
      if (id) {
        await CustomerService.put(`/update/${identityRef}`, {
          lastname,
          firstname,
          identityRef,
          username,
        });
        setMessageInfo("Customer updated successfully!");
      } else {
        await CustomerService.post("/create", {
          firstname,
          lastname,
          identityRef,
          username,
        });
        setMessageInfo("Customer added successfully!");
      }

      // Reset form fields
      resetForm();
      load();
    } catch (error) {
      console.error("Error saving customer:", error);
      setMessageError("Failed to save customer. Please try again.");
    }
  };

  // Edit Customer
  const editCustomer = (customer) => {
    setId(customer.id);
    setFirstname(customer.firstname);
    setLastname(customer.lastname);
    setIdentityRef(customer.identityRef);
    setUsername(customer.username);
    setMessageInfo("");
    setMessageError("");
  };

  // Delete Customer
  const deleteCustomer = async (id) => {
    setMessageInfo("");
    setMessageError("");
    try {
      const result = await CustomerService.delete(`/delete/${id}`);
      setMessageInfo(result.data || "Customer deleted successfully!");
      load();
    } catch (error) {
      console.error("Error deleting customer:", error);
      setMessageError("Failed to delete customer. Please try again.");
    }
  };

  // Reset Form
  const resetForm = () => {
    setId("");
    setFirstname("");
    setLastname("");
    setIdentityRef("");
    setUsername("");
  };

  // JSX
  return (
    <div className="container mt-4">
      {/* Alerts */}
      {messageError && (
        <div className="alert alert-danger" role="alert">
          {messageError}
        </div>
      )}
      {messageInfo && (
        <div className="alert alert-success" role="alert">
          {messageInfo}
        </div>
      )}

      {/* Customer Form */}
      <form onSubmit={save}>
        <div className="form-group my-2">
          <input hidden type="text" value={id} onChange={(e) => setId(e.target.value)} />
          <label>Lastname</label>
          <input
            type="text"
            className="form-control"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label>Firstname</label>
          <input
            type="text"
            className="form-control"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label>Identity Ref</label>
          <input
            type="text"
            className="form-control"
            value={identityRef}
            onChange={(e) => setIdentityRef(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>

      {/* Customer List */}
      <CustomerList
        customers={customers}
        editCustomer={editCustomer}
        deleteCustomer={deleteCustomer}
      />
    </div>
  );
};

// PropTypes Validation
CustomerComponent.propTypes = {
  load: PropTypes.func.isRequired,
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      identityRef: PropTypes.string,
      username: PropTypes.string,
    })
  ).isRequired,
};

export default CustomerComponent;
