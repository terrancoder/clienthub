
import { useState } from 'react';
import { useClients } from '../context/ClientContext';

export default function ClientForm({ client, onClose }) {
  const { addClient, updateClient } = useClients();
  const [form, setForm] = useState(client || {
    name: '', email: '', company: '', revenue: '', status: 'To-Do'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    if (client) {
      updateClient(client.id, form);
    } else {
      addClient(form);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        required
      />
      <input
        type="text"
        placeholder="Company"
        value={form.company}
        onChange={e => setForm({ ...form, company: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <input
        type="number"
        placeholder="Revenue ($)"
        value={form.revenue}
        onChange={e => setForm({ ...form, revenue: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
      <select
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        <option>To-Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          {client ? 'Update' : 'Add'} Client
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}