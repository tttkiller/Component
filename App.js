import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  // Fetch data from API
  useEffect(() => {
    fetch('/api/internal/frontend-assignment') // Proxy setup
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error("Error fetching data:", error)); // Error handling
  }, []);

  // Store groupBy and sortBy in localStorage
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  // Sorting logic
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === 'priority') return b.priority - a.priority;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  // Grouping logic
  const groupedTickets = groupBy === 'status'
    ? groupByStatus(sortedTickets)
    : groupBy === 'user'
    ? groupByUser(sortedTickets)
    : groupByPriority(sortedTickets);

  return (
    <div className="app">
      <header>
        <h1>Kanban Board</h1>
        <div className="controls">
          <label>Group By:</label>
          <select value={groupBy} onChange={handleGroupByChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>

          <label>Sort By:</label>
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </header>
      <KanbanBoard tickets={groupedTickets} />
    </div>
  );
};

// Helper functions to group tickets by status, user, or priority
const groupByStatus = (tickets) => {
  return tickets.reduce((acc, ticket) => {
    const status = ticket.status || 'Uncategorized';
    acc[status] = acc[status] || [];
    acc[status].push(ticket);
    return acc;
  }, {});
};

const groupByUser = (tickets) => {
  return tickets.reduce((acc, ticket) => {
    const user = ticket.user || 'Unassigned';
    acc[user] = acc[user] || [];
    acc[user].push(ticket);
    return acc;
  }, {});
};

const groupByPriority = (tickets) => {
  return tickets.reduce((acc, ticket) => {
    const priority = ticket.priority || 0;
    const priorityLabel = getPriorityLabel(priority);
    acc[priorityLabel] = acc[priorityLabel] || [];
    acc[priorityLabel].push(ticket);
    return acc;
  }, {});
};

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 4:
      return 'Urgent';
    case 3:
      return 'High';
    case 2:
      return 'Medium';
    case 1:
      return 'Low';
    default:
      return 'No Priority';
  }
};

export default App;
