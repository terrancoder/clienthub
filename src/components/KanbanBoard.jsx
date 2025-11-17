import { DndContext, closestCenter } from '@dnd-kit/core';
import { useClients } from '../context/ClientContext';
import KanbanColumn from './KanbanColumn';

const columns = [
  { id: 'To-Do', title: 'To-Do' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Done', title: 'Done' },
];

export default function KanbanBoard() {
  const { clients, updateClient } = useClients();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const clientId = active.id;
    const newStatus = over.id;

    // Only update if status changed
    const client = clients.find(c => c.id === clientId);
    if (client && client.status !== newStatus) {
      updateClient(clientId, { status: newStatus });
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Project Pipeline
      </h2>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(col => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              clients={clients.filter(c => c.status === col.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}