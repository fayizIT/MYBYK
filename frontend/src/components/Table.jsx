import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios';

const TableComponent = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // To store the ID of the user to be deleted
  const [editUser, setEditUser] = useState(null); // To store the user being edited
  const [userProfile, setUserProfile] = useState(null); // To store the user's profile data

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const confirmDelete = (id) => {
    setDeleteId(id); // Set the user ID to be deleted
    // Show a confirmation dialog
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteHandler(id); // Call deleteHandler if the user confirms
    }
  }

  const editHandler = (user) => {
    setEditUser(user);
  }

  const viewProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/admin/user-profile/${userId}`);
      setUserProfile(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const cancelEdit = () => {
    setEditUser(null);
  }

  const saveEdit = async (editedUserData) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/admin/update-user`, {
        id: editedUserData._id,
        updatedUserData: editedUserData
      });

      if (response.status === 200) {
        toast.success('User updated successfully');
        setEditUser(null);
        setDeleted(!deleted);
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userDetails = await axios.get('http://localhost:3001/api/admin/adminHome');
        setUsers(userDetails.data.userData);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
    
    fetchUsers();
  }, [deleted]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.mobile.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Form>
        <Form.Group className="d-flex my-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            style={{ width: "500px" }}
            value={search}
            type="text"
            placeholder="Search Here"
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action Remove</th>
            <th>Action Edit</th>
            <th>Action View Profile</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length !== 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => confirmDelete(user._id)}>
                  <FaRegTrashAlt className="delete-icon" />
                </td>
                <td style={{ cursor: 'pointer' }}>
                  <FaEdit onClick={() => editHandler(user)} />
                </td>
                <td style={{ cursor: 'pointer' }} onClick={() => viewProfile(user._id)}>
                  View Profile
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                No users Available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {editUser && (
        <div>
          <h3>Edit User</h3>
          <form onSubmit={(e) => { e.preventDefault(); saveEdit(editUser); }}>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            />
            <input
              type="text"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            />
            <button type="submit">Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </form>
        </div>
      )}
      {userProfile && (
        <div>
          <h3>User Profile</h3>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          {/* Display other user profile information here */}
        </div>
      )}
    </>
  );
};

export default TableComponent;
