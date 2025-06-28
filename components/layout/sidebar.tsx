'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calculator,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  Building2,
  ChartAreaIcon,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Link as Integrations,
  UserCheck,
  Truck,
  Warehouse,
  ListOrdered,
  Rows
} from 'lucide-react';

// Define grouped sections
const transactionItems = [
  { name: 'Sales', href: '/sales', icon: ShoppingCart },
  { name: 'Shipments', href: '/shipments', icon: Truck },
  { name: 'Purchases', href: '/purchases', icon: Calculator },
];

const peopleItems = [
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Vendors', href: '/vendors', icon: Users },
  { name: 'Employees', href: '/employees', icon: UserCheck },
];

const otherItems = [
  { name: 'Integrations', href: '/integrations', icon: Integrations },
  { name: 'Analytics', href: '/other/analytics', icon: ChartAreaIcon },
  { name: 'Locations', href: '/other/locations', icon: Building2 },
  { name: 'WMS Setup', href: '/other/wms-config', icon: Warehouse },
  { name: 'Sales Classes', href: '/sales_classes', icon: FileText },
  { name: 'Sales Categories', href: '/sales_categories', icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [transactionsOpen, setTransactionsOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);

  const renderSection = (
    label: string,
    isOpen: boolean,
    toggle: () => void,
    icon: React.ReactNode,
    items: { name: string; href: string; icon: any }[]
  ) => (
    <div>
      <button
        onClick={toggle}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
          isOpen
            ? 'bg-blue-600 text-white'
            : 'text-slate-300 hover:text-white hover:bg-slate-700'
        )}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span>{label}</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="mt-1 ml-8 flex flex-col space-y-1">
          {items.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                pathname === href
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-slate-900 text-white h-screen transition-all duration-300 flex flex-col w-64">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">CloudOps</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Dashboard */}
        <Link
          href="/"
          className={cn(
            'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
            pathname === '/'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700'
          )}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        {/* Transactions */}
        {renderSection(
          'Transactions',
          transactionsOpen,
          () => setTransactionsOpen(!transactionsOpen),
          <ShoppingCart className="h-5 w-5" />,
          transactionItems
        )}

        {/* Inventory */}
        <Link
          href="/inventory"
          className={cn(
            'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
            pathname === '/inventory'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700'
          )}
        >
          <Package className="h-5 w-5" />
          <span>Inventory</span>
        </Link>

        {/* People */}
        {renderSection(
          'People',
          peopleOpen,
          () => setPeopleOpen(!peopleOpen),
          <Users className="h-5 w-5" />,
          peopleItems
        )}

        {/* Other */}
        {renderSection(
          'Other',
          otherOpen,
          () => setOtherOpen(!otherOpen),
          <MoreHorizontal className="h-5 w-5" />,
          otherItems
        )}

        {/* Settings */}
        <Link
          href="/settings"
          className={cn(
            'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
            pathname === '/settings'
              ? 'bg-blue-600 text-white'
              : 'text-slate-300 hover:text-white hover:bg-slate-700'
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="text-sm text-slate-400">Version 2025.1.0</div>
      </div>
    </div>
  );
}
