import { useState } from 'react';
import Logo from "../../assets/InterviewerAi Logo.png"

const Header = () => {
const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="overflow-x-hidden bg-gray-50">
      <header className="py-4 md:py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <a href="#" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                <img
                  className="w-auto h-8"
                  src={Logo}
                  alt="Logo"
                />
              </a>
            </div>

            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-900"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {!expanded ? (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>


            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
              <a href="#" className="text-base font-medium text-gray-900 hover:text-opacity-50">Login</a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-600"
              >
                Sign up
              </a>
            </div>
          </div>

          {/* Mobile Nav */}
          {/* {expanded && ( */}
              <div
            className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
              expanded ? 'max-h-40 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
            }`}
            >
            <nav > 
              <div className="px-1 py-8">
                <div className="grid grid-cols-2 gap-x-7">
                  <a href="#" className="inline-flex items-center justify-center px-4 py-3 text-base font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-600 transition "> Login</a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-3 text-base font-bold text-gray-900 bg-white border-gray-900 border-2 rounded-xl hover:bg-gray-200"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </nav>
            </div>
          {/* )} */}
        </div>
      </header>
      </div>
    </div>
  )
}

export default Header
