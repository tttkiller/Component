import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets }) => {
  return (
    <div className="kanban-board">
      {Object.keys(tickets).map(group => (
        <div key={group} className="kanban-column">
          <h2>{group}</h2>
          {tickets[group].map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
