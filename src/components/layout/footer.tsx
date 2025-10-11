import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Help', href: '/help' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
]

const legalLinks = [
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Code of Conduct', href: '/code-of-conduct' },
  { name: 'Cookie Policy', href: '/cookies' },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Top Section - Logo and Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-neutral-200">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black font-montserrat text-primary-dark">
              MM
            </span>
            <span className="hidden sm:block text-sm font-medium font-montserrat text-neutral-600">
              MentorMatchmaking
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium font-montserrat text-primary-dark hover:text-primary-accent transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-neutral-600 hover:text-primary-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section - Legal and Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-sm font-montserrat text-neutral-600">
            &copy; {new Date().getFullYear()} MentorMatchmaking. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {legalLinks.map((item, index) => (
              <span key={item.name} className="flex items-center">
                <Link
                  href={item.href}
                  className="text-sm font-montserrat text-neutral-600 hover:text-primary-accent transition-colors"
                >
                  {item.name}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="ml-4 text-neutral-300">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}