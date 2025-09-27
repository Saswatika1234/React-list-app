import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../api';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getUserById(id)
      .then(data => {
        if (mounted) setUser(data);
      })
      .catch(err => console.error(err))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-gray-500">User not found</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 underline">← Back</button>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
              {user.name.split(' ').map(n => n[0]).slice(0,2).join('')}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.company?.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Contact</h3>
              <p><span className="font-medium">Phone: </span>{user.phone}</p>
              <p><span className="font-medium">Website: </span>{user.website}</p>
            </div>

            <div className="p-4 border rounded">
              <h3 className="font-semibold mb-2">Location</h3>
              <p>{user.address?.suite}, {user.address?.street}</p>
              <p>{user.address?.city} - {user.address?.zipcode}</p>
            </div>

            <div className="p-4 border rounded sm:col-span-2">
              <h3 className="font-semibold mb-2">Company</h3>
              <p><span className="font-medium">Name: </span>{user.company?.name}</p>
              <p><span className="font-medium">Catchphrase: </span>{user.company?.catchPhrase}</p>
              <p><span className="font-medium">BS: </span>{user.company?.bs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
