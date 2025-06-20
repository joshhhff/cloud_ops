// Mock data for ERP system
export const kpiData = {
  totalRevenue: 2847650,
  totalOrders: 1247,
  activeCustomers: 892,
  inventoryValue: 567890,
  monthlyGrowth: 12.5,
  quarterlyGrowth: 8.3,
};

export const revenueData = [
  { month: 'Jan', revenue: 245000, orders: 102 },
  { month: 'Feb', revenue: 267000, orders: 115 },
  { month: 'Mar', revenue: 298000, orders: 128 },
  { month: 'Apr', revenue: 312000, orders: 134 },
  { month: 'May', revenue: 289000, orders: 121 },
  { month: 'Jun', revenue: 356000, orders: 149 },
];

export const topProducts = [
  { id: 1, name: 'Professional Software License', revenue: 125000, units: 250 },
  { id: 2, name: 'Enterprise Server Package', revenue: 98000, units: 49 },
  { id: 3, name: 'Cloud Storage Premium', revenue: 87500, units: 175 },
  { id: 4, name: 'Security Suite Pro', revenue: 76000, units: 152 },
  { id: 5, name: 'Analytics Dashboard', revenue: 65000, units: 130 },
];

export const recentTransactions = [
  { id: 'TXN-2024-001', customer: 'Acme Corporation', amount: 15750, status: 'Completed', date: '2024-01-15' },
  { id: 'TXN-2024-002', customer: 'Tech Solutions Inc', amount: 28900, status: 'Pending', date: '2024-01-14' },
  { id: 'TXN-2024-003', customer: 'Global Enterprises', amount: 45000, status: 'Completed', date: '2024-01-13' },
  { id: 'TXN-2024-004', customer: 'Innovation Labs', amount: 12300, status: 'Processing', date: '2024-01-12' },
  { id: 'TXN-2024-005', customer: 'Digital Dynamics', amount: 33750, status: 'Completed', date: '2024-01-11' },
];

export const inventoryItems = [
  { id: 'INV-001', name: 'Professional Software License', stock: 150, reorderLevel: 50, unitCost: 450, category: 'Software' },
  { id: 'INV-002', name: 'Enterprise Server Package', stock: 25, reorderLevel: 10, unitCost: 1800, category: 'Hardware' },
  { id: 'INV-003', name: 'Cloud Storage Premium', stock: 200, reorderLevel: 75, unitCost: 125, category: 'Services' },
  { id: 'INV-004', name: 'Security Suite Pro', stock: 80, reorderLevel: 30, unitCost: 350, category: 'Software' },
  { id: 'INV-005', name: 'Analytics Dashboard', stock: 120, reorderLevel: 40, unitCost: 275, category: 'Software' },
];

export const customers = [
  { id: 'CUST-001', name: 'Acme Corporation', email: 'contact@acme.com', phone: '+1-555-0123', totalOrders: 25, totalValue: 125000, status: 'Active' },
  { id: 'CUST-002', name: 'Tech Solutions Inc', email: 'info@techsolutions.com', phone: '+1-555-0124', totalOrders: 18, totalValue: 98000, status: 'Active' },
  { id: 'CUST-003', name: 'Global Enterprises', email: 'sales@global.com', phone: '+1-555-0125', totalOrders: 32, totalValue: 187500, status: 'Active' },
  { id: 'CUST-004', name: 'Innovation Labs', email: 'hello@innovation.com', phone: '+1-555-0126', totalOrders: 12, totalValue: 67800, status: 'Inactive' },
  { id: 'CUST-005', name: 'Digital Dynamics', email: 'team@digital.com', phone: '+1-555-0127', totalOrders: 28, totalValue: 145000, status: 'Active' },
];

export const salesData = [
  { id: 1, docnumber: 'SALE-001', customer: 'Acme Corporation', memo: 'Demo Order 1', total: 2250, date: '2024-01-15', status: 'Completed' },
  { id: 2, docnumber: 'SALE-002', customer: 'Tech Solutions Inc', memo: 'Demo Order 2', total: 3600, date: '2024-01-14', status: 'Pending' },
  { id: 3, docnumber: 'SALE-003', customer: 'Global Enterprises', memo: 'Demo Order 3', total: 1250, date: '2024-01-13', status: 'Completed' },
  { id: 4, docnumber: 'SALE-004', customer: 'Innovation Labs', memo: 'Demo Order 4', total: 1050, date: '2024-01-12', status: 'Processing' },
  { id: 5, docnumber: 'SALE-005', customer: 'Digital Dynamics', memo: 'Demo Order 5', total: 2200, date: '2024-01-11', status: 'Completed' },
];