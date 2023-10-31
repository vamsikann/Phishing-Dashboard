import React, { useState, useEffect } from 'react';

const UserCounter = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/User_Data/processed_files.txt')
      .then(response => response.text())
      .then(data => {
        const users = data.split('\n').filter(line => line.trim() !== '');
        setUserCount(users.length);
      })
      .catch(err => {
        console.error('Error fetching user count:', err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
}, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">User Counter</h2>
      </header>
      <div className="text-center p-5">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data.</p>}
        <div className="mt-5">
          <div className="relative w-60 h-60 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-pink-500"></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-4xl font-bold" style={{ color: 'rgb(25,2,45)' }}>{userCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCounter;
