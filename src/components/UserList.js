import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './app.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [searchTerm]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
      handleSearch(searchTerm);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.username.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h2 className="has-text-centered has-text-weight-bold mb-4" style={{ fontSize: '30px', fontStyle: 'italic' }}>
          UserList
        </h2>
        <div className="mb-4">
          <label className="label">Search:</label>
          <input
            type="text"
            className="input"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <br />
        <br />
        <Link to={`add`} className="button is-success">
          Add User
        </Link>
        <table className="table is-striped is-fullwidth" style={{ backgroundColor: '#add8e6', color: 'green' }}>
          <thead>
            <tr>
              <th>NO.</th>
              <th>NAMA LENGKAP</th>
              <th>USERNAME</th>
              <th>PASSWORD</th>
              <th>STATUS</th>
              <th colSpan="2">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {(searchTerm ? filteredUsers : users).map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.status}</td>
                <td className="action-column">
                  <Link
                    to={`edit/${user.id}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                </td>
                <td className="action-column">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
