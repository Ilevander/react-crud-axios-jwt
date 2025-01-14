import PropTypes from "prop-types";

const CustomerList = ({ customers, editCustomer, deleteCustomer }) => {
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Nº</th>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Identity Ref</th>
          <th scope="col">Username</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tbody>
        {customers && customers.length > 0 ? (
          customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstname}</td>
              <td>{customer.lastname}</td>
              <td>{customer.identityRef}</td>
              <td>{customer.username}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editCustomer(customer)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => deleteCustomer(customer.identityRef)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No customers available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

// PropTypes Validation
CustomerList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      identityRef: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  editCustomer: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
};

export default CustomerList;
