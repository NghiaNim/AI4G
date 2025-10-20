import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Therapy Activity Marketplace',
  description: 'AI-powered marketplace for therapy activities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-velvet-dark bg-clip-text text-transparent">
                    TherapyConnect
                  </span>
                </div>
                <nav className="flex space-x-8">
                  <a href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Home
                  </a>
                  <a href="/activities" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Activities
                  </a>
                  <a href="/patients" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Patients
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="bg-white mt-auto py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} TherapyConnect Marketplace. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
