import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-[1100px] mx-auto px-4 py-6">
        {/* Top row: Logo centered on mobile, left-aligned on desktop */}
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            <img src={logo} alt="Logo" width={200} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-gray-900 font-medium">
              Products
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation: Grid under the centered logo */}
        <nav className="md:hidden mt-6 grid grid-cols-2 gap-x-2 gap-y-1 text-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium py-1">
          Home
          </Link>
          <Link to="/categories" className="text-gray-600 hover:text-gray-900 font-medium py-1">
            Products
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium py-1">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium py-1">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 