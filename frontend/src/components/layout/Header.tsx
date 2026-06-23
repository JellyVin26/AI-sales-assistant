import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
      <div className="flex items-center space-x-4">
        {/* Theme toggle and user menu will be added in Step 8 */}
        <span className="text-sm text-gray-500">User menu placeholder</span>
      </div>
    </header>
  );
};

export default Header;
