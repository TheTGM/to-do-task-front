const Header = ({
  username,
  toggleMenu,
  handleLogout,
  isMenuOpen,
}: {
  username: string;
  toggleMenu: () => void;
  handleLogout: () => void;
  isMenuOpen?: boolean;
}) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">To-Do App</h1>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-700 font-medium focus:outline-none"
          >
            {username}
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
