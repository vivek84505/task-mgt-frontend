
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../custom-css/dashboard.css";

const mockTasks = [
  {
    id: 1,
    title: "Complete user CRUD screens",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignedTo: "Aarav Sharma",
    category: "Development",
    dueDate: "2026-10-25",
  },
  {
    id: 2,
    title: "Create PostgreSQL task tables",
    status: "COMPLETED",
    priority: "HIGH",
    assignedTo: "Priya Patel",
    category: "Backend",
    dueDate: "2026-10-22",
  },
  {
    id: 3,
    title: "Review dashboard layout",
    status: "TODO",
    priority: "MEDIUM",
    assignedTo: "Rahul Verma",
    category: "Design",
    dueDate: "2026-10-24",
  },
  {
    id: 4,
    title: "Implement task status API",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignedTo: "Sneha Kulkarni",
    category: "Backend",
    dueDate: "2026-10-26",
  },
  {
    id: 5,
    title: "Write application documentation",
    status: "TODO",
    priority: "LOW",
    assignedTo: "Aarav Sharma",
    category: "Documentation",
    dueDate: "2026-10-28",
  },
  {
    id: 6,
    title: "Design login page",
    status: "COMPLETED",
    priority: "MEDIUM",
    assignedTo: "Priya Patel",
    category: "Design",
    dueDate: "2026-10-20",
  },
  {
    id: 7,
    title: "Fix authentication validation",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignedTo: "Rahul Verma",
    category: "Backend",
    dueDate: "2026-10-21",
  },
  {
    id: 8,
    title: "Set up navigation and routing",
    status: "COMPLETED",
    priority: "MEDIUM",
    assignedTo: "Sneha Kulkarni",
    category: "Development",
    dueDate: "2026-10-19",
  },
  {
    id: 9,
    title: "Add task search functionality",
    status: "TODO",
    priority: "MEDIUM",
    assignedTo: "Aarav Sharma",
    category: "Development",
    dueDate: "2026-10-27",
  },
  {
    id: 10,
    title: "Prepare release checklist",
    status: "IN_PROGRESS",
    priority: "LOW",
    assignedTo: "Priya Patel",
    category: "Documentation",
    dueDate: "2026-10-29",
  },
  {
    id: 11,
    title: "Test employee APIs",
    status: "COMPLETED",
    priority: "HIGH",
    assignedTo: "Rahul Verma",
    category: "Testing",
    dueDate: "2026-10-18",
  },
  {
    id: 12,
    title: "Review responsive layouts",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    assignedTo: "Sneha Kulkarni",
    category: "Design",
    dueDate: "2026-10-30",
  },
];

const mockUsers = [
  { id: 1, name: "Aarav Sharma", role: "Admin" },
  { id: 2, name: "Priya Patel", role: "User" },
  { id: 3, name: "Rahul Verma", role: "User" },
  { id: 4, name: "Sneha Kulkarni", role: "User" },
];

const statusConfig = {
  TODO: {
    label: "To do",
    className: "dash-status-todo",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "dash-status-progress",
  },
  COMPLETED: {
    label: "Completed",
    className: "dash-status-completed",
  },
};

const priorityConfig = {
  HIGH: "dash-priority-high",
  MEDIUM: "dash-priority-medium",
  LOW: "dash-priority-low",
};

function Dashboard() {
  const navigate = useNavigate();
  const [tasks] = useState(mockTasks);
  const [taskFilter, setTaskFilter] = useState("ALL");

  // Dashboard statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "COMPLETED"
    ).length;
    const inProgress = tasks.filter(
      (task) => task.status === "IN_PROGRESS"
    ).length;
    const todo = tasks.filter(
      (task) => task.status === "TODO"
    ).length;

    // Only unfinished tasks with a due date before today are overdue.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdue = tasks.filter((task) => {
      if (task.status === "COMPLETED" || !task.dueDate) {
        return false;
      }

      const due = new Date(`${task.dueDate}T00:00:00`);
      return due < today;
    }).length;

    return {
      total,
      completed,
      inProgress,
      todo,
      overdue,
      completionRate: total
        ? Math.round((completed / total) * 100)
        : 0,
    };
  }, [tasks]);

  // Workload by user
  const workload = useMemo(() => {
    return mockUsers.map((user) => {
      const assignedTasks = tasks.filter(
        (task) => task.assignedTo === user.name
      );

      return {
        ...user,
        total: assignedTasks.length,
        completed: assignedTasks.filter(
          (task) => task.status === "COMPLETED"
        ).length,
        inProgress: assignedTasks.filter(
          (task) => task.status === "IN_PROGRESS"
        ).length,
      };
    });
  }, [tasks]);

  const recentTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      return (
        taskFilter === "ALL" || task.status === taskFilter
      );
    });

    return filtered.slice(0, 5);
  }, [tasks, taskFilter]);

  const upcomingTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks
      .filter((task) => {
        if (task.status === "COMPLETED" || !task.dueDate) {
          return false;
        }

        const due = new Date(`${task.dueDate}T00:00:00`);
        return due >= today;
      })
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 4);
  }, [tasks]);

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });

  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const goToTasks = () => navigate("/tasks");
  const goToUsers = () => navigate("/users");

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p>
            Welcome back! Here&apos;s what&apos;s happening with your
            projects today.
          </p>
        </div>

        <button className="dash-primary-btn" onClick={goToTasks}>
          <i className="bi bi-kanban"></i>
          View Task Board
        </button>
      </div>

      {/* Summary cards */}
      <div className="row g-3 dashboard-stats">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="dash-stat-card">
            <div className="dash-stat-top">
              <span>Total Tasks</span>
              <div className="dash-stat-icon icon-indigo">
                <i className="bi bi-clipboard-check"></i>
              </div>
            </div>
            <h3>{stats.total}</h3>
            <div className="dash-stat-bottom">
              <span>All assigned tasks</span>
              <span className="dash-stat-link" onClick={goToTasks}>
                View <i className="bi bi-arrow-up-right"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="dash-stat-card">
            <div className="dash-stat-top">
              <span>Completed</span>
              <div className="dash-stat-icon icon-green">
                <i className="bi bi-check2-circle"></i>
              </div>
            </div>
            <h3>{stats.completed}</h3>
            <div className="dash-stat-bottom">
              <span>Tasks finished</span>
              <span className="dash-stat-positive">
                {stats.completionRate}% complete
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="dash-stat-card">
            <div className="dash-stat-top">
              <span>In Progress</span>
              <div className="dash-stat-icon icon-amber">
                <i className="bi bi-clock-history"></i>
              </div>
            </div>
            <h3>{stats.inProgress}</h3>
            <div className="dash-stat-bottom">
              <span>Currently being worked on</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="dash-stat-card">
            <div className="dash-stat-top">
              <span>Overdue Tasks</span>
              <div className="dash-stat-icon icon-red">
                <i className="bi bi-exclamation-circle"></i>
              </div>
            </div>
            <h3>{stats.overdue}</h3>
            <div className="dash-stat-bottom">
              <span>Unfinished past-due tasks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main dashboard grid */}
      <div className="row g-3 dashboard-main-grid">
        {/* Task overview */}
        <div className="col-12 col-xl-7">
          <section className="dash-panel h-100">
            <div className="dash-panel-header">
              <div>
                <h5>Task Overview</h5>
                <p>Distribution by current status</p>
              </div>
              <button
                className="dash-text-btn"
                onClick={goToTasks}
              >
                View all <i className="bi bi-arrow-right"></i>
              </button>
            </div>

            <div className="dash-progress-summary">
              <div className="dash-progress-ring">
                <svg viewBox="0 0 120 120" role="img"
                  aria-label={`${stats.completionRate}% of tasks completed`}>
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#edf0f7"
                    strokeWidth="11"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray={`${(stats.completionRate / 100) * 301.59} 301.59`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="dash-ring-label">
                  <strong>{stats.completionRate}%</strong>
                  <span>Completed</span>
                </div>
              </div>

              <div className="dash-status-breakdown">
                <div className="dash-breakdown-row">
                  <span className="dash-legend-dot dot-todo"></span>
                  <span>To do</span>
                  <strong>{stats.todo}</strong>
                </div>
                <div className="dash-breakdown-track">
                  <span
                    className="dash-breakdown-fill fill-todo"
                    style={{
                      width: `${stats.total ? (stats.todo / stats.total) * 100 : 0}%`,
                    }}
                  ></span>
                </div>

                <div className="dash-breakdown-row">
                  <span className="dash-legend-dot dot-progress"></span>
                  <span>In Progress</span>
                  <strong>{stats.inProgress}</strong>
                </div>
                <div className="dash-breakdown-track">
                  <span
                    className="dash-breakdown-fill fill-progress"
                    style={{
                      width: `${stats.total ? (stats.inProgress / stats.total) * 100 : 0}%`,
                    }}
                  ></span>
                </div>

                <div className="dash-breakdown-row">
                  <span className="dash-legend-dot dot-completed"></span>
                  <span>Completed</span>
                  <strong>{stats.completed}</strong>
                </div>
                <div className="dash-breakdown-track">
                  <span
                    className="dash-breakdown-fill fill-completed"
                    style={{
                      width: `${stats.total ? (stats.completed / stats.total) * 100 : 0}%`,
                    }}
                  ></span>
                </div>
              </div>
            </div>

            <div className="dash-overview-footer">
              <div>
                <span>Open tasks</span>
                <strong>{stats.todo + stats.inProgress}</strong>
              </div>
              <div>
                <span>Total team members</span>
                <strong>{mockUsers.length}</strong>
              </div>
            </div>
          </section>
        </div>

        {/* Team workload */}
        <div className="col-12 col-xl-5">
          <section className="dash-panel h-100">
            <div className="dash-panel-header">
              <div>
                <h5>Team Workload</h5>
                <p>Tasks assigned to each member</p>
              </div>
              <button
                className="dash-icon-link"
                onClick={goToUsers}
                title="Manage users"
                aria-label="Manage users"
              >
                <i className="bi bi-people"></i>
              </button>
            </div>

            <div className="dash-team-list">
              {workload.map((user) => (
                <div className="dash-team-member" key={user.id}>
                  <div className={`dash-user-avatar avatar-color-${user.id}`}>
                    {getInitials(user.name)}
                  </div>

                  <div className="dash-team-details">
                    <div className="dash-team-name-row">
                      <strong>{user.name}</strong>
                      <span>{user.total} tasks</span>
                    </div>

                    <div className="dash-team-track">
                      <span
                        style={{
                          width: `${stats.total ? (user.total / stats.total) * 100 : 0}%`,
                        }}
                      ></span>
                    </div>

                    <small>
                      {user.completed} completed · {user.inProgress} in
                      progress
                    </small>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="dash-team-footer"
              onClick={goToUsers}
            >
              Manage team members
              <i className="bi bi-arrow-right"></i>
            </button>
          </section>
        </div>

        {/* Recent tasks */}
        <div className="col-12 col-xl-7">
          <section className="dash-panel h-100">
            <div className="dash-panel-header dash-recent-header">
              <div>
                <h5>Recent Tasks</h5>
                <p>Latest tasks and their current status</p>
              </div>

              <select
                className="form-select dash-filter-select"
                value={taskFilter}
                onChange={(event) => setTaskFilter(event.target.value)}
                aria-label="Filter recent tasks by status"
              >
                <option value="ALL">All Tasks</option>
                <option value="TODO">To do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div className="dash-recent-task-list">
              {recentTasks.length > 0 ? (
                recentTasks.map((task) => (
                  <div className="dash-recent-task" key={task.id}>
                    <div className="dash-recent-task-main">
                      <span
                        className={`dash-task-priority ${priorityConfig[task.priority]}`}
                        title={`${task.priority} priority`}
                      ></span>

                      <div>
                        <strong>{task.title}</strong>
                        <small>
                          {task.category} · {task.assignedTo}
                        </small>
                      </div>
                    </div>

                    <span
                      className={`dash-status-badge ${statusConfig[task.status].className}`}
                    >
                      {statusConfig[task.status].label}
                    </span>
                  </div>
                ))
              ) : (
                <div className="dash-empty">
                  No tasks match this status.
                </div>
              )}
            </div>

            <button
              className="dash-panel-footer-btn"
              onClick={goToTasks}
            >
              Open task board <i className="bi bi-arrow-right"></i>
            </button>
          </section>
        </div>

        {/* Upcoming deadlines */}
        <div className="col-12 col-xl-5">
          <section className="dash-panel h-100">
            <div className="dash-panel-header">
              <div>
                <h5>Upcoming Deadlines</h5>
                <p>Next tasks that need attention</p>
              </div>
              <i className="bi bi-calendar3 dash-header-symbol"></i>
            </div>

            <div className="dash-deadline-list">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => (
                  <div className="dash-deadline-item" key={task.id}>
                    <div className="dash-calendar-tile">
                      <span>
                        {formatDate(task.dueDate).split(" ")[0]}
                      </span>
                      <strong>
                        {formatDate(task.dueDate).split(" ")[1]}
                      </strong>
                    </div>

                    <div className="dash-deadline-details">
                      <strong>{task.title}</strong>
                      <small>{task.assignedTo}</small>
                    </div>

                    <span
                      className={`dash-task-priority ${priorityConfig[task.priority]}`}
                      title={`${task.priority} priority`}
                    ></span>
                  </div>
                ))
              ) : (
                <div className="dash-empty">
                  No upcoming deadlines.
                </div>
              )}
            </div>

            <button
              className="dash-panel-footer-btn"
              onClick={goToTasks}
            >
              View all deadlines <i className="bi bi-arrow-right"></i>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
