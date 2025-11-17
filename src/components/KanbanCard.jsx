import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function KanbanCard({ client }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: client.id });


const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
};

return (
    <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow cursor-move hover:shadow-md transition"
    >
      <h4 className="font-semibold text-gray-900 dark:text-white">{client.name}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{client.company}</p>
      <p className="mt-1 font-medium text-green-600 dark:text-green-400">
        ${client.revenue || 0}
      </p>
      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
        client.status === 'Done' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        client.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' }`}>{client.status}
      </span>
    </div>
);
}