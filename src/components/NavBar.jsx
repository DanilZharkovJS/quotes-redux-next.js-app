'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Random' },
    { href: '/search', label: 'Search' },
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
                className={`relative px-3 py-1 transition-colors duration-200 hover:text-yellow-400 ${
                  pathname === link.href ? 'text-yellow-400 font-semibold' : ''
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 rounded"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
