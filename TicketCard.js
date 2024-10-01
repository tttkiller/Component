import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p>Priority: {getPriorityLabel(ticket.priority)}</p>
    </div>
  );
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

export default TicketCard;
