import {useDroppable} from '@dnd-kit/core';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ id, title, clients }) {
    const { setNodeRef } = useDroppable({ id });
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-96" >
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
            {title} ({clients.length})
        </h3>
        <div ref={setNodeRef} className="space-y-3">
            {clients.map(client => (
                <KanbanCard key={client.id} client={client} />
            ))}
        </div>
    </div>
  );
}

