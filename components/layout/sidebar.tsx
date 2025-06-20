'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    ChartAreaIcon
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Sales', href: '/sales', icon: ShoppingCart },
    { name: 'Purchases', href: '/accounting', icon: Calculator },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Vendors', href: '/vendors', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: ChartAreaIcon },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className={cn(
            "bg-slate-900 text-white h-screen transition-all duration-300 flex flex-col w-64"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                    <Building2 className="h-8 w-8 text-blue-400" />
                    <span className="text-xl font-bold">CloudOps</span>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                                isActive 
                                    ? "bg-blue-600 text-white" 
                                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
                <div className="text-sm text-slate-400">
                    Version 2025.1.0
                </div>
            </div>
        </div>
    );
}
