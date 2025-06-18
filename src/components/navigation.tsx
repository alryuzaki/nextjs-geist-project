'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const { data: session } = useSession();
  const { plan, goldBalance } = useSubscription();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: '/generators/text-generator', label: 'Text Generator' },
    { href: '/image-generator', label: 'Image Generator' },
    { href: '/video-generator', label: 'Video Generator' },
    { href: '/auto-content', label: 'Auto Content' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/"
              className="text-2xl font-extrabold text-black hover:text-gray-800 transition duration-300"
              aria-label="BlackboxAI Home"
            >
              BLACKBOXAI
            </Link>
            <div className="hidden md:flex space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-black font-medium px-3 py-2 rounded-md transition duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                  <div>
                    Plan: <span className="font-semibold text-black">{plan}</span>
                  </div>
                  <div>
                    Balance: <span className="font-semibold text-black">{goldBalance} gold</span>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-300 transform hover:scale-105"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-black font-medium px-4 py-2 rounded-md transition duration-300 relative group"
                >
                  Sign In
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-300 transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-300"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-300 shadow-inner"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-md transition duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {session && (
                <div className="pt-4 border-t border-gray-300 text-gray-700 space-y-1">
                  <div>
                    Plan: <span className="font-semibold text-black">{plan}</span>
                  </div>
                  <div>
                    Balance: <span className="font-semibold text-black">{goldBalance} gold</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
