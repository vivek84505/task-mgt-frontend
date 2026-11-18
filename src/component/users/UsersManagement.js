
import { useEffect, useState } from "react";

import api from "../services/api";

import "../custom-css/UsersManagement.css"




function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [errors,setErrors] = useState({})
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal,setShowModal] = useState(false)
  const [formData , setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  })

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user?.name?.toLowerCase().includes(searchText) ||
      user?.email?.toLowerCase().includes(searchText) ||
      user?.department?.toLowerCase().includes(searchText);

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "All" || user.is_active === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleChange = (e) => {
 
    const {name,value} = e.target;
    setFormData((prevData) => (
      {...prevData,[name]:value}
    )
  )

  }

  const validateForm = () => {

      let newErrors = {}

      if(!formData.firstname.trim()){
          newErrors.firstname = "Firstname is required"
      }

      if(!formData.lastname.trim()){
          newErrors.lastname = "Lastname is required"
      }

      if(!formData.role.trim()){
          newErrors.role = "Role is required"
      }

        if(!formData.email.trim()){
          newErrors.email = "Email is required"
      }

      
      
     
      setErrors(newErrors)
    

      

      return Object.keys(newErrors).length === 0


  }

  const addUser = async (e) => {
    e.preventDefault()

    if(validateForm()){
      alert("Form validated sucessfully")
      // API calling code
    }

  }

  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const getAvatarColor = (id) => {
    const colors = [
      "avatar-purple",
      "avatar-blue",
      "avatar-green",
      "avatar-orange",
      "avatar-pink",
      "avatar-teal",
    ];

    return colors[(id - 1) % colors.length];
  };

  const handleDelete = (id) => {
    const user = users.find((item) => item.id === id);

    if (window.confirm(`Delete user ${user.name}?`)) {
      setUsers((currentUsers) =>
        currentUsers.filter((item) => item.id !== id)
      );
    }
  };

  const handleAddUser = () => {
    setShowModal(true)
   
  };

  const handleEdit = (user) => {
    alert(`Connect this action to edit ${user.name}.`);
  };

  const handleView = (user) => {
    alert(`Connect this action to view ${user.name}.`);
  };

 
 
  const activeCount = users.filter(
    (user) => user.is_active === true
  ).length;

  const adminCount = users.filter(
    (user) => user.role === "ADMIN"
  ).length;

  useEffect(() => {
    getUsers();
  }, [])


  const getUsers = async () => {
    const response = await api.get("api/users")
    console.log("Response====>", response)
    if(response.data.status == "sucessfull" && response.data.data.length > 0){
      setUsers(response.data.data)
    }
    else{
      alert("Data Not found")
    }

  }



  return (
    <div className="users-page">
      {/* Page Header */}
      <div className="users-page-header">
        <div>
          <h2 className="users-page-title">User Management</h2>
          <p className="users-page-subtitle">
            Manage users, roles and access permissions.
          </p>
        </div>

        <button
          className="btn btn-primary add-user-btn"
          onClick={handleAddUser}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add New User
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="user-stat-card">
            <div className="user-stat-icon stat-purple">
              <i className="bi bi-people"></i>
            </div>
            <div>
              <p>Total Users</p>
              <h3>{users.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="user-stat-card">
            <div className="user-stat-icon stat-green">
              <i className="bi bi-person-check"></i>
            </div>
            <div>
              <p>Active Users</p>
              <h3>{activeCount}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="user-stat-card">
            <div className="user-stat-icon stat-orange">
              <i className="bi bi-shield-lock"></i>
            </div>
            <div>
              <p>Administrators</p>
              <h3>{adminCount}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="users-table-card">
        <div className="users-table-toolbar">
          <div>
            <h5 className="mb-1">All Users</h5>
            <small className="text-muted">
              View and manage your team members
            </small>
          </div>

          <div className="users-filters">
            <div className="users-search">
              <i className="bi bi-search"></i>
              <input
                type="search"
                className="form-control"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search users"
              />
            </div>

            <select
              className="form-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              aria-label="Filter by role"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="table-responsive">
          <table className="table users-table align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">USER</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ROLE</th>            
                <th scope="col">STATUS</th>
                <th scope="col">JOINED DATE</th>
                <th scope="col" className="text-end">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.user_id}>
                    <td>
                      <div className="user-info-cell">
                        <div
                          className={`user-avatar ${getAvatarColor(user.user_id)}`}
                        >
                          {getInitials(user.firstname)}
                        </div>

                        <div className="user-details">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">
                            {user.firstname} {user.lastname} 
                          </div>
                        </div>
                      </div>
                    </td>

                     <td>
                      <span
                        className={`role-badge role-${user.email.toLowerCase()}`}
                      >
                        {user.email}
                      </span>
                    </td>


                    <td>
                      <span
                        className={`role-badge role-${user.role.toLowerCase()}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="department-cell">
                      {user?.department}
                    </td>

                    <td>
                      <span
                        className={`status-badge status-${ (user.is_active  ?  'active' : 'inactive')}`}
                      >
                        <span className="status-dot"></span>
                        {
                          (user.is_active  ?  'Active' : 'Inactive')
                        }
                      </span>
                    </td>

                    <td className="date-cell">
                      {new Date(
                        `${user.created_at}T00:00:00`
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td>
                      <div className="user-actions">
                        <button
                          className="action-btn"
                          title="View user"
                          aria-label={`View ${user.name}`}
                          onClick={() => handleView(user)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>

                        <button
                          className="action-btn"
                          title="Edit user"
                          aria-label={`Edit ${user.name}`}
                          onClick={() => handleEdit(user)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="action-btn action-delete"
                          title="Delete user"
                          aria-label={`Delete ${user.name}`}
                          onClick={() => handleDelete(user.id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-users">
                    <i className="bi bi-people"></i>
                    <p className="mb-1">No users found</p>
                    <small>
                      Try changing your search or filters.
                    </small>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

         {/* Add User modal */}
      {showModal && (
        <div
          className="task-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-task-title"
          >
            <div className="task-modal-header">
              <div>
                <h2 id="add-task-title">Create New User</h2>
                <p>Add a user to your project board.</p>
              </div>

              <button
                type="button"
                className="task-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

    

               
            <form onSubmit={addUser}>
              <div className="task-modal-body">
                <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="task-title">Firstname</label>
                      <input
                      id="task-title"
                      className="form-control"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="firstname"
                      maxLength={150}                     
                      autoFocus
                      />
                        <small className="text-danger">{errors.firstname}</small>

                    </div>
                  

                     <div className="col-md-6">
                      <label htmlFor="task-title">Lastname</label>
                      <input
                      id="task-title"
                      name="lastname"
                      className="form-control"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="lastname"
                      maxLength={150}                      
                      autoFocus
                      />

                       <small className="text-danger"> {errors.lastname}</small>

                    </div>
                </div>
               
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="task-category">Role</label>
                        <select
                        id="task-category"
                        className="form-select"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        >
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER" >USER</option>
                       
                        </select>

                          <small className="text-danger">{errors.role}</small>
                    </div>

                    <div className="col-md-6">
                          <label htmlFor="task-due-date">Email</label>
                          <input
                          id="task-due-date"
                          type="text"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          placeholder="email"
                          onChange={handleChange}
                          />

                            <small className="text-danger"> {errors.email}</small>
                    </div>
                </div>
                

               

                
              </div>

              <div className="task-modal-footer">
                <button
                  type="button"
                  className="task-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="task-add-btn">
                  Create Task <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
         )}

        {/* Table Footer */}
        <div className="users-table-footer">
          <span>
            Showing <strong>{filteredUsers.length}</strong> of{" "}
            <strong>{users.length}</strong> users
          </span>

          {(search ||
            roleFilter !== "All" ||
            statusFilter !== "All") && (
              <button
                className="btn btn-sm btn-light"
                onClick={() => {
                  setSearch("");
                  setRoleFilter("All");
                  setStatusFilter("All");
                }}
              >
                <i className="bi bi-x-circle me-1"></i>
                Clear filters
              </button>
            )}
        </div>
      </div>
      
    </div>

    
  );
}

export default UsersManagement;
