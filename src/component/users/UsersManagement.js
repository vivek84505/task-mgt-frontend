
import { useState } from "react";
import "../custom-css/UsersManagement.css"
const mockUsers = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    role: "Admin",
    department: "IT",
    status: "Active",
    joinedDate: "2025-01-15",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    role: "User",
    department: "HR",
    status: "Active",
    joinedDate: "2025-02-10",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul.verma@example.com",
    role: "User",
    department: "Finance",
    status: "Inactive",
    joinedDate: "2024-11-20",
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    email: "sneha.kulkarni@example.com",
    role: "Manager",
    department: "Engineering",
    status: "Active",
    joinedDate: "2025-03-05",
  },
  {
    id: 5,
    name: "Rohan Deshmukh",
    email: "rohan.deshmukh@example.com",
    role: "User",
    department: "Engineering",
    status: "Pending",
    joinedDate: "2025-04-18",
  },
  {
    id: 6,
    name: "Ananya Singh",
    email: "ananya.singh@example.com",
    role: "Admin",
    department: "IT",
    status: "Active",
    joinedDate: "2024-09-12",
  },
];

function UsersManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.department.toLowerCase().includes(searchText);

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

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
    alert("Connect this button to your Add User form.");
  };

  const handleEdit = (user) => {
    alert(`Connect this action to edit ${user.name}.`);
  };

  const handleView = (user) => {
    alert(`Connect this action to view ${user.name}.`);
  };

  const activeCount = users.filter(
    (user) => user.status === "Active"
  ).length;

  const adminCount = users.filter(
    (user) => user.role === "Admin"
  ).length;

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
                <th scope="col">ROLE</th>
                <th scope="col">DEPARTMENT</th>
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
                  <tr key={user.id}>
                    <td>
                      <div className="user-info-cell">
                        <div
                          className={`user-avatar ${getAvatarColor(user.id)}`}
                        >
                          {getInitials(user.name)}
                        </div>

                        <div className="user-details">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`role-badge role-${user.role.toLowerCase()}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="department-cell">
                      {user.department}
                    </td>

                    <td>
                      <span
                        className={`status-badge status-${user.status.toLowerCase()}`}
                      >
                        <span className="status-dot"></span>
                        {user.status}
                      </span>
                    </td>

                    <td className="date-cell">
                      {new Date(
                        `${user.joinedDate}T00:00:00`
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
