import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import ProtectedRoute from '@/components/auth/protected-route';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import AuthPage from '@/app/auth/page';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const metadata: Metadata = {
  title: 'CloudOps - Enterprise Resource Planning',
  description: 'Comprehensive ERP solution for modern businesses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProtectedRoute fallback={<AuthPage />}>
            <div className="flex h-screen bg-slate-50">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                  {children}
                </main>
              </div>
            </div>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}