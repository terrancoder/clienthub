
import { useClients } from '../context/ClientContext';
import { useState } from 'react';
import ClientForm from './ClientForm';
import Modal from './Modal';

export default function ClientList() {
  const { clients, deleteClient } = useClients();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredClients = clients
    .filter(c => 
      (c.name.toLowerCase().includes(search.toLowerCase()) || 
       c.company.toLowerCase().includes(search.toLowerCase()))
    )
    .filter(c => filter === 'All' || c.status === filter);

  const openModal = (client = null) => {
    setEditingClient(client);
    setModalOpen(true);
  };

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Client Directory ({filteredClients.length})
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Add Client
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search name or company..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option>All</option>
          <option>To-Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      {filteredClients.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          {search || filter !== 'All' ? 'No clients match your search.' : 'No clients yet. Add your first one!'}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map(client => (
            <div
              key={client.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {client.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{client.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{client.company}</p>
              <p className="mt-2 font-medium text-green-600 dark:text-green-400">
                ${client.revenue || 0}
              </p>
              <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                client.status === 'Done' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                client.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {client.status}
              </span>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => openModal(client)}
                  className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteClient(client.id)}
                  className="flex-1 text-sm bg-red-600 hover:bg-red-700 text-white py-1 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingClient ? 'Edit Client' : 'Add New Client'}
      >
        <ClientForm
          client={editingClient}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}