import React from 'react'

const Footer = () => {
  return (
  <footer
    className="
      fixed bottom-0 left-0 w-full z-50
      bg-white/20 backdrop-blur-lg shadow-inner border-t border-white/30
      flex flex-col md:flex-row items-center justify-between
      px-6 py-4 space-y-3 md:space-y-0
    "
  >
    <aside className="text-sm text-gray-800 font-medium text-center md:text-left">
      © {new Date().getFullYear()} DevTalk. All rights reserved.
    </aside>

    <nav className="flex gap-6 text-xl">
      <a href="https://tinyurl.com/Abhishekthakur009" className="hover:text-blue-600 transition-transform transform hover:scale-110" aria-label="Twitter">
        <img src="/twitter.png" width="24" height="24" className="fill-current" viewBox="0 0 24 24"></img>      
      </a>

      <a href="https://tinyurl.com/abhishek09" className="hover:text-red-600 transition-transform transform hover:scale-110" aria-label="YouTube">
                <img src="/linkedin.png" width="24" height="24" className="fill-current" viewBox="0 0 24 24"></img>      
      </a>

      <a href="https://tinyurl.com/abhishekthakur09" className="hover:text-blue-700 transition-transform transform hover:scale-110" aria-label="Facebook">
        <img src="/github.png" width="24" height="24" className="fill-current" viewBox="0 0 24 24"></img>      
      </a>
    </nav>
  </footer>
);

}

export default Footer
