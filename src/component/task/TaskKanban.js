
import { useMemo, useState } from "react";
import "../custom-css/TaskKanban.css";

const initialTasks = [
  {
    id: 1,
    title: "Finish user onboarding",
    status: "TODO",
    priority: "HIGH",
    category: "Development",
    dueDate: "2026-10-26",
    comments: 1,
    assignee: "AS",
    avatar: "avatar-1",
  },
  {
    id: 2,
    title: "Solve the Dribbble prioritization issue with the team",
    status: "TODO",
    priority: "MEDIUM",
    category: "Marketing",
    dueDate: "2027-01-08",
    comments: 1,
    assignee: "RK",
    avatar: "avatar-2",
  },
  {
    id: 3,
    title: "Prepare project requirements",
    status: "TODO",
    priority: "LOW",
    category: "Template",
    dueDate: "2026-10-29",
    comments: 0,
    assignee: "PS",
    avatar: "avatar-3",
  },
  {
    id: 4,
    title: "Work in progress (WIP) Dashboard",
    status: "IN_PROGRESS",
    priority: "HIGH",
    category: "Development",
    dueDate: "2026-10-25",
    comments: 1,
    assignee: "AM",
    avatar: "avatar-4",
  },
  {
    id: 5,
    title: "Kanban manager",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    category: "Template",
    dueDate: "2027-01-08",
    comments: 2,
    assignee: "VK",
    avatar: "avatar-5",
  },
  {
    id: 6,
    title: "Review employee API integration",
    status: "IN_PROGRESS",
    priority: "HIGH",
    category: "Development",
    dueDate: "2026-10-28",
    comments: 3,
    assignee: "AS",
    avatar: "avatar-1",
  },
  {
    id: 7,
    title: "Manage internal feedback",
    status: "COMPLETED",
    priority: "LOW",
    category: "Dev",
    dueDate: "2026-10-26",
    comments: 1,
    assignee: "PS",
    avatar: "avatar-3",
  },
  {
    id: 8,
    title: "Do some projects on React Native with Flutter",
    status: "COMPLETED",
    priority: "MEDIUM",
    category: "Development",
    dueDate: "2027-01-08",
    comments: 1,
    assignee: "RK",
    avatar: "avatar-2",
  },
  {
    id: 9,
    title: "Complete database schema",
    status: "COMPLETED",
    priority: "HIGH",
    category: "Backend",
    dueDate: "2026-10-20",
    comments: 2,
    assignee: "VK",
    avatar: "avatar-5",
  },
  {
    id: 10,
    title: "Update application documentation",
    status: "COMPLETED",
    priority: "LOW",
    category: "Template",
    dueDate: "2026-10-22",
    comments: 0,
    assignee: "AM",
    avatar: "avatar-4",
  },
];

const columns = [
  { status: "TODO", label: "To Do", color: "todo" },
  { status: "IN_PROGRESS", label: "In Progress", color: "progress" },
  { status: "COMPLETED", label: "Completed", color: "completed" },
];

const initialForm = {
  title: "",
  category: "Development",
  dueDate: "",
  status: "TODO",
  priority: "MEDIUM",
};

function TaskKanban() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverStatus, setDragOverStatus] = useState(null);

  const counts = useMemo(() => ({
    ALL: tasks.length,
    TODO: tasks.filter((task) => task.status === "TODO").length,
    IN_PROGRESS: tasks.filter(
      (task) => task.status === "IN_PROGRESS"
    ).length,
    COMPLETED: tasks.filter(
      (task) => task.status === "COMPLETED"
    ).length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      const matchesStatus =
        activeFilter === "ALL" || task.status === activeFilter;

      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.category.toLowerCase().includes(search.toLowerCase()) ||
        task.assignee.toLowerCase().includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });

    if (sortBy === "title") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortBy === "priority") {
      const rank = { HIGH: 0, MEDIUM: 1, LOW: 2 };
      result = [...result].sort(
        (a, b) => rank[a.priority] - rank[b.priority]
      );
    } else if (sortBy === "dueDate") {
      result = [...result].sort((a, b) =>
        (a.dueDate || "9999-12-31").localeCompare(
          b.dueDate || "9999-12-31"
        )
      );
    }

    return result;
  }, [tasks, activeFilter, search, sortBy]);

  const moveTask = (id, status) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const handleDrop = (status) => {
    if (draggedTaskId !== null) {
      moveTask(draggedTaskId, status);
    }
    setDraggedTaskId(null);
    setDragOverStatus(null);
  };

  const formatDate = (date) => {
    if (!date) return "No due date";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const taskDate = new Date(`${date}T00:00:00`);

    if (taskDate.getTime() === today.getTime()) return "Today";
    if (taskDate.getTime() === tomorrow.getTime()) return "Tomorrow";

    return taskDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const addTask = (event) => {
    event.preventDefault();

    if (!form.title.trim()) return;

    const newTask = {
      id: Date.now(),
      ...form,
      title: form.title.trim(),
      comments: 0,
      assignee: "YO",
      avatar: "avatar-1",
    };

    setTasks((current) => [newTask, ...current]);
    setForm(initialForm);
    setActiveFilter("ALL");
    setSearch("");
    setShowModal(false);
  };

  return (
    <div className="kanban-page">
      {/* Search toolbar */}
      <div className="kanban-toolbar">
        <div className="kanban-search">
          <i className="bi bi-search"></i>
          <input
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search tasks"
          />
        </div>

        <div className="kanban-toolbar-actions">
          <label className="kanban-sort">
            <i className="bi bi-sliders2"></i>
            <span>Filter &amp; Sort</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort tasks"
            >
              <option value="default">Default order</option>
              <option value="title">Task title</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due date</option>
            </select>
          </label>

          <button
            className="kanban-add-btn"
            onClick={() => setShowModal(true)}
          >
            Add New Task
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="kanban-tabs-wrap">
        <div className="kanban-tabs" role="tablist" aria-label="Filter tasks">
          {[
            { value: "ALL", label: "All Tasks" },
            { value: "TODO", label: "To do" },
            { value: "IN_PROGRESS", label: "In Progress" },
            { value: "COMPLETED", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeFilter === tab.value}
              className={`kanban-tab ${
                activeFilter === tab.value ? "active" : ""
              }`}
              onClick={() => setActiveFilter(tab.value)}
            >
              {tab.label}
              <span>{counts[tab.value]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Kanban board */}
      <div className="kanban-board">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(
            (task) => task.status === column.status
          );

          return (
            <section
              key={column.status}
              className={`kanban-column ${
                dragOverStatus === column.status ? "drag-over" : ""
              }`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragOverStatus(column.status);
              }}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setDragOverStatus(null);
                }
              }}
              onDrop={(event) => {
                event.preventDefault();
                handleDrop(column.status);
              }}
            >
              <div className="kanban-column-header">
                <div className="kanban-column-heading">
                  <h3>{column.label}</h3>
                  <span className={`kanban-count count-${column.color}`}>
                    {counts[column.status]}
                  </span>
                </div>

                <button
                  className="kanban-more-btn"
                  title={`${column.label} options`}
                  aria-label={`${column.label} options`}
                >
                  <i className="bi bi-three-dots"></i>
                </button>
              </div>

              <div className="kanban-card-list">
                {columnTasks.map((task) => (
                  <article
                    key={task.id}
                    className={`kanban-task-card ${
                      task.status === "COMPLETED" ? "is-completed" : ""
                    }`}
                    draggable
                    onDragStart={(event) => {
                      setDraggedTaskId(task.id);
                      event.dataTransfer.effectAllowed = "move";
                      event.dataTransfer.setData(
                        "text/plain",
                        String(task.id)
                      );
                    }}
                    onDragEnd={() => {
                      setDraggedTaskId(null);
                      setDragOverStatus(null);
                    }}
                  >
                    <div className="kanban-card-title-row">
                      <span className="kanban-card-title">
                        {task.title}
                      </span>

                      <div
                        className={`kanban-avatar ${task.avatar}`}
                        title={`Assigned to ${task.assignee}`}
                      >
                        {task.assignee}
                      </div>
                    </div>

                    <div className="kanban-card-meta">
                      <span className="kanban-meta-item">
                        <i className="bi bi-calendar-event"></i>
                        {formatDate(task.dueDate)}
                      </span>

                      <span className="kanban-meta-item">
                        <i className="bi bi-chat"></i>
                        {task.comments}
                      </span>

                      <span
                        className={`kanban-priority priority-${task.priority.toLowerCase()}`}
                        title={`${task.priority} priority`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <div className="kanban-card-footer">
                      <span
                        className={`kanban-category category-${task.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      >
                        {task.category}
                      </span>

                      <select
                        className="kanban-move-select"
                        value={task.status}
                        onChange={(event) =>
                          moveTask(task.id, event.target.value)
                        }
                        aria-label={`Change status of ${task.title}`}
                        title="Move task to another column"
                      >
                        {columns.map((item) => (
                          <option
                            key={item.status}
                            value={item.status}
                          >
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </article>
                ))}

                {columnTasks.length === 0 && (
                  <div className="kanban-empty">
                    <i className="bi bi-inbox"></i>
                    <span>No tasks here</span>
                  </div>
                )}
              </div>

              <button
                className="kanban-add-column-task"
                onClick={() => {
                  setForm({ ...initialForm, status: column.status });
                  setShowModal(true);
                }}
              >
                <i className="bi bi-plus-lg"></i>
                Add task
              </button>
            </section>
          );
        })}
      </div>

      {/* Add task modal */}
      {showModal && (
        <div
          className="kanban-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div
            className="kanban-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="kanban-modal-title"
          >
            <div className="kanban-modal-header">
              <div>
                <h2 id="kanban-modal-title">Add New Task</h2>
                <p>Create a task for your Kanban board.</p>
              </div>
              <button
                type="button"
                className="kanban-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close dialog"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={addTask}>
              <div className="kanban-modal-body">
                <label htmlFor="kanban-title">Task title *</label>
                <input
                  id="kanban-title"
                  className="form-control"
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  maxLength={150}
                  placeholder="Enter task title"
                  required
                  autoFocus
                />

                <label htmlFor="kanban-status">Status</label>
                <select
                  id="kanban-status"
                  className="form-select"
                  value={form.status}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value })
                  }
                >
                  {columns.map((column) => (
                    <option key={column.status} value={column.status}>
                      {column.label}
                    </option>
                  ))}
                </select>

                <label htmlFor="kanban-category">Category</label>
                <select
                  id="kanban-category"
                  className="form-select"
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                >
                  <option>Development</option>
                  <option>Marketing</option>
                  <option>Design</option>
                  <option>Backend</option>
                  <option>Template</option>
                  <option>Documentation</option>
                </select>

                <label htmlFor="kanban-priority">Priority</label>
                <select
                  id="kanban-priority"
                  className="form-select"
                  value={form.priority}
                  onChange={(event) =>
                    setForm({ ...form, priority: event.target.value })
                  }
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>

                <label htmlFor="kanban-date">Due date</label>
                <input
                  id="kanban-date"
                  type="date"
                  className="form-control"
                  value={form.dueDate}
                  onChange={(event) =>
                    setForm({ ...form, dueDate: event.target.value })
                  }
                />
              </div>

              <div className="kanban-modal-footer">
                <button
                  type="button"
                  className="kanban-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="kanban-add-btn">
                  Create Task
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskKanban;
