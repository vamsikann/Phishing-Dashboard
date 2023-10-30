import React, { useState, useEffect } from 'react';

const QuizMetrics = () => {
  const [topWrongQuestions, setTopWrongQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/top-wrong-questions')
      .then(response => response.json())
      .then(data => {
        setTopWrongQuestions(data.slice(0, 4));
      })
      .catch(err => {
        console.error('Error fetching top wrong questions:', err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 w-650 h-400 p-5">
      <div className="text-center">
        <h1 className="text-lg mb-2 text-white-700">Quiz Metrics</h1>
        <h2 className="text-xl text-blue-600 mb-2">Total questions in the quiz: 10</h2>

        
        <div className="mt-5 border-t border-gray-300 pt-2">
          <h3 className="text-base text-gray-700 mb-2">Top Questions Answered Incorrectly:</h3>
          {loading && <p>Loading...</p>}
          {error && <p>Error fetching data.</p>}
          {topWrongQuestions.map((item, idx) => (
            <p key={idx} className="text-sm text-indigo-600">
              {item[0]} - Answered wrong {item[1]} times
            </p>
          ))}
        </div>
        
        
      </div>
    </div>
  );
};

export default QuizMetrics;
