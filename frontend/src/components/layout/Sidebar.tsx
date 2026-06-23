import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">AI Sales Assistant</h2>
      </div>
      <nav className="mt-4">
        {/* Navigation links will be added in Step 8 */}
        <p className="px-4 text-sm text-gray-500">Navigation placeholder</p>
      </nav>
    </aside>
  );
};

export default Sidebar;
