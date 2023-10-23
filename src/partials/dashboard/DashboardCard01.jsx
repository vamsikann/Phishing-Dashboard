import React from 'react';

const QuizMetrics = () => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 w-650 h-400 p-5">
        <div className="text-center">
          <h1 className="text-lg mb-2 text-white-700">Quiz Metrics</h1>
          <h2 className="text-xl text-blue-600 mb-2">Total questions in the quiz: 10</h2>

          <div className="mt-5 border-t border-gray-300 pt-2">
            <h3 className="text-base text-gray-700 mb-2">Top Questions Answered Incorrectly:</h3>
            <p className="text-sm text-indigo-600">Question 9</p>
            <p className="text-sm text-indigo-800">Question 10</p>
            <p className="text-sm text-blue-900">Question 4</p>
            <p className="text-sm text-purple-500">Question 8</p>
          </div>
        </div>
      </div>
    
  );
};

export default QuizMetrics;
