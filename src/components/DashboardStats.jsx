import { useClients } from '../context/ClientContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#94a3b8', '#60a5fa', '#34d399'];

export default function DashboardStats() {
  const { clients } = useClients();

  const totalClients = clients.length;
  const totalRevenue = clients.reduce((sum, c) => sum + (Number(c.revenue) || 0), 0);
  const doneCount = clients.filter(c => c.status === 'Done').length;
  const completionRate = totalClients > 0 ? Math.round((doneCount / totalClients) * 100) : 0;

  const pieData = [
    { name: 'To-Do', value: clients.filter(c => c.status === 'To-Do').length },
    { name: 'In Progress', value: clients.filter(c => c.status === 'In Progress').length },
    { name: 'Done', value: doneCount },
  ].filter(d => d.value > 0);

  return (

    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <button
            onClick={() => {
            const headers = ['Name', 'Email', 'Company', 'Revenue', 'Status'];
            const rows = clients.map(c => [
                c.name, c.email, c.company, c.revenue || 0, c.status
            ]);
            const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `clients_${new Date().toISOString().slice(0,10)}.csv`;
            a.click();
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
        >
            Export CSV
        </button>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Clients</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalClients}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{completionRate}%</p>
        </div>
      </div>

      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}