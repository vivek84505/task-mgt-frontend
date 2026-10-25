
import { useMemo, useState } from "react";
import "../custom-css/task-management.css";

const initialTasks = [
  {
    id: 1,
    title: "Finish user onboarding",
    status: "TODO",
    category: "Marketing",
    dueDate: "Tomorrow",
    comments: 1,
    assignee: "AS",
    color: "avatar-purple",
  },
  {
    id: 2,
    title: "Solve the Dribbble prioritization issue with the team",
    status: "TODO",
    category: "Marketing",
    dueDate: "Tomorrow",
    comments: 2,
    assignee: "RK",
    color: "avatar-green",
  },
  {
    id: 3,
    title: "Prepare the monthly project report",
    status: "COMPLETED",
    category: "Marketing",
    dueDate: "Feb 12, 2026",
    comments: 1,
    assignee: "PS",
    color: "avatar-orange",
  },
  {
    id: 4,
    title: "Work in Progress (WIP) Dashboard",
    status: "IN_PROGRESS",
    category: "Template",
    dueDate: "Jan 8, 2027",
    comments: 2,
    assignee: "AM",
    color: "avatar-blue",
  },
  {
    id: 5,
    title: "Review employee management APIs",
    status: "IN_PROGRESS",
    category: "Development",
    dueDate: "Oct 28, 2026",
    comments: 3,
    assignee: "VK",
    color: "avatar-purple",
  },
  {
    id: 6,
    title: "Create the user CRUD screens",
    status: "IN_PROGRESS",
    category: "Development",
    dueDate: "Oct 30, 2026",
    comments: 1,
    assignee: "RK",
    color: "avatar-green",
  },
  {
    id: 7,
    title: "Set up database tables",
    status: "IN_PROGRESS",
    category: "Development",
    dueDate: "Nov 1, 2026",
    comments: 0,
    assignee: "AS",
    color: "avatar-orange",
  },
  {
    id: 8,
    title: "Create project documentation",
    status: "COMPLETED",
    category: "Documentation",
    dueDate: "Oct 20, 2026",
    comments: 2,
    assignee: "AM",
    color: "avatar-blue",
  },
];

const statusTabs = [
  { label: "All Tasks", value: "ALL" },
  { label: "To do", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
];

const statusLabels = {
  TODO: "Todo",
  IN_PROGRESS: "In-Progress",
  COMPLETED: "Completed",
};

function TaskManagement() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sortByTitle, setSortByTitle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Development");
  const [newDueDate, setNewDueDate] = useState("");
  const [newStatus, setNewStatus] = useState("TODO");

  const counts = useMemo(() => {
    return {
      ALL: tasks.length,
      TODO: tasks.filter((task) => task.status === "TODO").length,
      IN_PROGRESS: tasks.filter(
        (task) => task.status === "IN_PROGRESS"
      ).length,
      COMPLETED: tasks.filter(
        (task) => task.status === "COMPLETED"
      ).length,
    };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      const matchesTab =
        activeTab === "ALL" || task.status === activeTab;

      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.category.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });

    if (sortByTitle) {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [tasks, activeTab, search, sortByTitle]);

  const groupedTasks = [
    { status: "TODO", tasks: visibleTasks.filter((t) => t.status === "TODO") },
    {
      status: "IN_PROGRESS",
      tasks: visibleTasks.filter((t) => t.status === "IN_PROGRESS"),
    },
    {
      status: "COMPLETED",
      tasks: visibleTasks.filter((t) => t.status === "COMPLETED"),
    },
  ].filter((group) => group.tasks.length > 0);

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "COMPLETED" ? "TODO" : "COMPLETED",
            }
          : task
      )
    );
  };

  const addTask = (event) => {
    event.preventDefault();

    if (!newTitle.trim()) return;

    const task = {
      id: Date.now(),
      title: newTitle.trim(),
      status: newStatus,
      category: newCategory,
      dueDate: newDueDate
        ? new Date(`${newDueDate}T00:00:00`).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric", year: "numeric" }
          )
        : "No due date",
      comments: 0,
      assignee: "YO",
      color: "avatar-purple",
    };

    setTasks((current) => [task, ...current]);
    setNewTitle("");
    setNewCategory("Development");
    setNewDueDate("");
    setNewStatus("TODO");
    setShowModal(false);
    setActiveTab("ALL");
  };

  return (
    <div className="task-page">
      {/* Top toolbar */}
      <div className="task-toolbar">
        <div className="task-search">
          <i className="bi bi-search"></i>
          <input
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search tasks"
          />
          <span className="search-shortcut">⌘ K</span>
        </div>

        <div className="task-toolbar-actions">
          <button
            className="task-icon-btn"
            title="Sort tasks alphabetically"
            aria-label="Sort tasks alphabetically"
            onClick={() => setSortByTitle((current) => !current)}
          >
            <i className="bi bi-arrow-down-up"></i>
          </button>

          <button
            className="task-add-btn"
            onClick={() => setShowModal(true)}
          >
            Add New Task
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="task-tabs-bar">
        <div className="task-tabs" role="tablist" aria-label="Task status">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeTab === tab.value}
              className={`task-tab ${
                activeTab === tab.value ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              <span>{tab.label}</span>
              <span className="task-tab-count">{counts[tab.value]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Task groups */}
      <div className="task-list-area">
        {groupedTasks.length > 0 ? (
          groupedTasks.map((group) => (
            <section className="task-group" key={group.status}>
              <div className="task-group-header">
                <div className="task-group-title">
                  <h3>{statusLabels[group.status]}</h3>
                  <span className={`group-count count-${group.status.toLowerCase()}`}>
                    {group.tasks.length}
                  </span>
                </div>

                <button
                  className="task-more-btn"
                  title={`More ${statusLabels[group.status]} options`}
                  aria-label={`More ${statusLabels[group.status]} options`}
                >
                  <i className="bi bi-three-dots"></i>
                </button>
              </div>

              <div className="task-items">
                {group.tasks.map((task) => (
                  <article className="task-item" key={task.id}>
                    <i
                      className="bi bi-grip-vertical task-drag-icon"
                      aria-hidden="true"
                    ></i>

                    <input
                      type="checkbox"
                      className="form-check-input task-checkbox"
                      checked={task.status === "COMPLETED"}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Mark ${task.title} as ${
                        task.status === "COMPLETED"
                          ? "incomplete"
                          : "completed"
                      }`}
                    />

                    <span
                      className={`task-item-title ${
                        task.status === "COMPLETED" ? "task-done" : ""
                      }`}
                    >
                      {task.title}
                    </span>

                    <div className="task-item-meta">
                      <span className="task-category">{task.category}</span>

                      <span className="task-due-date">
                        <i className="bi bi-calendar3"></i>
                        {task.dueDate}
                      </span>

                      <span className="task-comments" title="Comments">
                        <i className="bi bi-chat"></i>
                        {task.comments}
                      </span>

                      <div
                        className={`task-assignee ${task.color}`}
                        title={`Assignee: ${task.assignee}`}
                        aria-label={`Assignee ${task.assignee}`}
                      >
                        {task.assignee}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="task-empty-state">
            <i className="bi bi-clipboard-check"></i>
            <h5>No tasks found</h5>
            <p>Try another search or create a new task.</p>
            <button
              className="task-add-btn"
              onClick={() => setShowModal(true)}
            >
              Add New Task <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        )}
      </div>

      {/* Add Task modal */}
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
                <h2 id="add-task-title">Create New Task</h2>
                <p>Add a task to your project board.</p>
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

            <form onSubmit={addTask}>
              <div className="task-modal-body">
                <label htmlFor="task-title">Task title *</label>
                <input
                  id="task-title"
                  className="form-control"
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="e.g. Complete user management page"
                  maxLength={150}
                  required
                  autoFocus
                />

                <label htmlFor="task-category">Category</label>
                <select
                  id="task-category"
                  className="form-select"
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                >
                  <option>Development</option>
                  <option>Marketing</option>
                  <option>Design</option>
                  <option>Documentation</option>
                  <option>Template</option>
                </select>

                <label htmlFor="task-status">Status</label>
                <select
                  id="task-status"
                  className="form-select"
                  value={newStatus}
                  onChange={(event) => setNewStatus(event.target.value)}
                >
                  <option value="TODO">To do</option>
                  <option value="IN_PROGRESS">In progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>

                <label htmlFor="task-due-date">Due date</label>
                <input
                  id="task-due-date"
                  type="date"
                  className="form-control"
                  value={newDueDate}
                  onChange={(event) => setNewDueDate(event.target.value)}
                />
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
    </div>
  );
}

export default TaskManagement;
