import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../api';

export default function ListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getUsers()
      .then(data => {
        if (mounted) setUsers(data);
      })
      .catch(err => console.error(err))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <header className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-extrabold text-center">User Directory</h1>
        <p className="text-center text-gray-500 mt-2">Click a card to view details</p>
      </header>

      <main className="max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {users.map(user => (
              <article
                key={user.id}
                onClick={() => navigate(`/details/${user.id}`)}
                className="cursor-pointer bg-white rounded-xl p-5 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 flex items-center justify-center text-white font-semibold text-lg">
                    {user.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-400">{user.company?.name}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{user.address?.city}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">{user.phone}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
