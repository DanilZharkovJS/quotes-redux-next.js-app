'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaSearch } from 'react-icons/fa'
import { FaRandom } from 'react-icons/fa'
import { GrTest } from 'react-icons/gr'
import { RiPlayListAddLine } from "react-icons/ri";


export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/', icon: <FaRandom />, label: 'Random' },
    { href: '/search', icon: <FaSearch />, label: 'Search' },
    { href: '/create', icon: <RiPlayListAddLine />, label: 'Create' },
    { href: '/test', icon: <GrTest />, label: 'Test' },
  ]

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md flex flex-col items-center md:flex-row md:items-center md:justify-start relative">
      <Link href={'/'}>
        <h1 className="text-2xl font-bold mb-4 md:mb-0 md:text-left md:flex-shrink-0">
          Quotes Next.JS App
        </h1>
      </Link>
      <div className="w-full md:w-auto md:ml-20 ml-0">
        <ul className="flex gap-10 justify-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative inline-block px-3 py-1 transition-colors duration-200 hover:text-yellow-400 ${
                  pathname === link.href ? 'text-yellow-400 font-semibold' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </div>

                {pathname === link.href && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-yellow-400 rounded"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
