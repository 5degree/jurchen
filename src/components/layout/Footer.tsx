import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="max-w-[1100px] mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row">
          {/* Company Info - 40% width on desktop, 100% on mobile */}
          <div className="w-full md:w-[40%] mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">
              <img src={logo} alt="Logo" width={200} />
            </h3>
            <p className="mb-4 text-gray-300">
              Providing high-quality solar products for sustainable energy
              solutions.
            </p>
            <div className="flex space-x-4">
            <a
                href="https://www.facebook.com/JurchenIndia"
                target="blank"
                className="text-gray-300 hover:text-white"
                aria-label="Facebook"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                href="https://x.com/jurchenindia"
                target="blank"
                className="text-gray-300 hover:text-white"
                aria-label="Twitter"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/jurchentechnologyindia/"
                target="blank"
                className="text-gray-300 hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.pinterest.com/jurchentechnologyindia/"
                target="blank"
                className="text-gray-300 hover:text-white"
                aria-label="Pinterest"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 4.99 3.657 9.163 8.438 10.117-.117-.86-.223-2.183.047-3.125.242-.829 1.562-5.3 1.562-5.3s-.398-.796-.398-1.972c0-1.848 1.072-3.229 2.406-3.229 1.137 0 1.685.853 1.685 1.875 0 1.144-.729 2.852-1.105 4.435-.314 1.33.666 2.414 1.977 2.414 2.372 0 3.972-3.047 3.972-6.648 0-2.742-1.848-4.792-5.213-4.792-3.799 0-6.172 2.838-6.172 6.008 0 1.091.314 1.863.806 2.46.226.266.257.375.176.684-.059.226-.195.77-.253.989-.082.314-.337.427-.622.31-1.736-.711-2.546-2.62-2.546-4.764 0-3.544 2.992-7.795 8.933-7.795 4.769 0 7.896 3.449 7.896 7.152 0 4.894-2.716 8.556-6.71 8.556-1.342 0-2.606-.726-3.039-1.553l-.827 3.153c-.3 1.153-1.115 2.6-1.661 3.482C9.515 23.83 10.74 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/jurchen-technology-india/about/"
                target="blank"
                className="text-gray-300 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right side container for Quick Links and Contact Info */}
          <div className="w-full md:w-[60%] flex flex-row">
            {/* Quick Links - 50% of the right side on all screens */}
            <div className="w-1/2 pl-0 md:pl-8">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-gray-300 hover:text-white"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="text-gray-300 hover:text-white"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info - 50% of the right side on all screens */}
            <div className="w-1/2 pl-4">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-300">
                <p className="mb-2">114, The Summit Business Bay</p>
                <p className="mb-2">Andheri - Kurla Rd, opp Moviemax</p>
                <p className="mb-2">Chakala, Andheri East</p>
                <p className="mb-2">Mumbai, Maharashtra 400093</p>
              </address>
              <p className="mt-4 text-gray-300">
                <span className="block mb-1">Phone: +91 22 4968 9797</span>
                <span className="block">Email: Sales@jurchen-technology.com</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Jurchen Technology. All rights
            reserved.
          </p>
          
          <p>
            Developed By <a href="https://www.aravalibharat.com?utm_source=jurchen-technology.co/in" target="blank">Aravali Bharat</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
