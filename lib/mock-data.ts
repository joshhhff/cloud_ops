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

// Locations/Warehouses
export const locations = [
  { id: 'LOC-001', name: 'Main Warehouse', address: '123 Industrial Blvd, City, State 12345', type: 'Warehouse' },
  { id: 'LOC-002', name: 'East Coast Distribution', address: '456 Commerce St, Boston, MA 02101', type: 'Distribution Center' },
  { id: 'LOC-003', name: 'West Coast Hub', address: '789 Pacific Ave, Los Angeles, CA 90210', type: 'Distribution Center' },
  { id: 'LOC-004', name: 'Retail Store Downtown', address: '321 Main St, Downtown, State 54321', type: 'Retail' },
];

// Zones within locations
export const zones = [
  // Main Warehouse zones
  { id: 'ZONE-001', locationId: 'LOC-001', name: 'Zone A', description: 'Electronics and Software' },
  { id: 'ZONE-002', locationId: 'LOC-001', name: 'Zone B', description: 'Hardware and Equipment' },
  { id: 'ZONE-003', locationId: 'LOC-001', name: 'Zone C', description: 'Accessories and Consumables' },
  
  // East Coast Distribution zones
  { id: 'ZONE-004', locationId: 'LOC-002', name: 'Zone A', description: 'High-value items' },
  { id: 'ZONE-005', locationId: 'LOC-002', name: 'Zone B', description: 'Bulk storage' },
  
  // West Coast Hub zones
  { id: 'ZONE-006', locationId: 'LOC-003', name: 'Zone A', description: 'Fast-moving items' },
  { id: 'ZONE-007', locationId: 'LOC-003', name: 'Zone B', description: 'Slow-moving items' },
  
  // Retail Store zones
  { id: 'ZONE-008', locationId: 'LOC-004', name: 'Sales Floor', description: 'Customer accessible area' },
  { id: 'ZONE-009', locationId: 'LOC-004', name: 'Back Room', description: 'Storage area' },
];

// Aisles within zones
export const aisles = [
  // Zone A - Main Warehouse
  { id: 'AISLE-001', zoneId: 'ZONE-001', name: 'A1', description: 'Software licenses' },
  { id: 'AISLE-002', zoneId: 'ZONE-001', name: 'A2', description: 'Digital products' },
  
  // Zone B - Main Warehouse
  { id: 'AISLE-003', zoneId: 'ZONE-002', name: 'B1', description: 'Servers and hardware' },
  { id: 'AISLE-004', zoneId: 'ZONE-002', name: 'B2', description: 'Networking equipment' },
  
  // Zone C - Main Warehouse
  { id: 'AISLE-005', zoneId: 'ZONE-003', name: 'C1', description: 'Cables and accessories' },
  { id: 'AISLE-006', zoneId: 'ZONE-003', name: 'C2', description: 'Consumables' },
  
  // East Coast Distribution
  { id: 'AISLE-007', zoneId: 'ZONE-004', name: 'A1', description: 'Premium products' },
  { id: 'AISLE-008', zoneId: 'ZONE-005', name: 'B1', description: 'Bulk items' },
  
  // West Coast Hub
  { id: 'AISLE-009', zoneId: 'ZONE-006', name: 'A1', description: 'Popular items' },
  { id: 'AISLE-010', zoneId: 'ZONE-007', name: 'B1', description: 'Specialty items' },
  
  // Retail Store
  { id: 'AISLE-011', zoneId: 'ZONE-008', name: 'Display-1', description: 'Main display area' },
  { id: 'AISLE-012', zoneId: 'ZONE-009', name: 'Storage-1', description: 'Back room storage' },
];

// Bins within aisles
export const bins = [
  // Aisle A1 - Software licenses
  { id: 'BIN-001', aisleId: 'AISLE-001', name: 'A1-01', description: 'Professional licenses' },
  { id: 'BIN-002', aisleId: 'AISLE-001', name: 'A1-02', description: 'Enterprise licenses' },
  { id: 'BIN-003', aisleId: 'AISLE-001', name: 'A1-03', description: 'Security software' },
  
  // Aisle A2 - Digital products
  { id: 'BIN-004', aisleId: 'AISLE-002', name: 'A2-01', description: 'Cloud services' },
  { id: 'BIN-005', aisleId: 'AISLE-002', name: 'A2-02', description: 'Analytics tools' },
  
  // Aisle B1 - Servers and hardware
  { id: 'BIN-006', aisleId: 'AISLE-003', name: 'B1-01', description: 'Server packages' },
  { id: 'BIN-007', aisleId: 'AISLE-003', name: 'B1-02', description: 'Hardware components' },
  
  // Additional bins for other aisles
  { id: 'BIN-008', aisleId: 'AISLE-004', name: 'B2-01', description: 'Network switches' },
  { id: 'BIN-009', aisleId: 'AISLE-005', name: 'C1-01', description: 'Cables' },
  { id: 'BIN-010', aisleId: 'AISLE-006', name: 'C2-01', description: 'Office supplies' },
  { id: 'BIN-011', aisleId: 'AISLE-007', name: 'A1-01', description: 'High-value storage' },
  { id: 'BIN-012', aisleId: 'AISLE-008', name: 'B1-01', description: 'Bulk storage' },
  { id: 'BIN-013', aisleId: 'AISLE-009', name: 'A1-01', description: 'Fast movers' },
  { id: 'BIN-014', aisleId: 'AISLE-010', name: 'B1-01', description: 'Specialty items' },
  { id: 'BIN-015', aisleId: 'AISLE-011', name: 'D1-01', description: 'Display bin' },
  { id: 'BIN-016', aisleId: 'AISLE-012', name: 'S1-01', description: 'Storage bin' },
];

// Enhanced inventory items with detailed information
export const inventoryItems = [
  { 
    id: 'INV-001', 
    name: 'Professional Software License', 
    sku: 'PSL-2024-001',
    description: 'Comprehensive professional software suite with advanced features for enterprise use',
    category: 'Software',
    brand: 'TechCorp',
    unitCost: 450,
    sellingPrice: 650,
    weight: 0,
    dimensions: 'Digital Product',
    supplier: 'TechCorp Solutions',
    supplierSku: 'TC-PSL-001',
    reorderLevel: 50,
    maxStockLevel: 500,
    status: 'Active',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-15'
  },
  { 
    id: 'INV-002', 
    name: 'Enterprise Server Package', 
    sku: 'ESP-2024-002',
    description: 'High-performance server hardware package with enterprise-grade specifications',
    category: 'Hardware',
    brand: 'ServerTech',
    unitCost: 1800,
    sellingPrice: 2500,
    weight: 25.5,
    dimensions: '19" x 24" x 3.5"',
    supplier: 'ServerTech Industries',
    supplierSku: 'ST-ESP-002',
    reorderLevel: 10,
    maxStockLevel: 100,
    status: 'Active',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-14'
  },
  { 
    id: 'INV-003', 
    name: 'Cloud Storage Premium', 
    sku: 'CSP-2024-003',
    description: 'Premium cloud storage service with enhanced security and backup features',
    category: 'Services',
    brand: 'CloudMax',
    unitCost: 125,
    sellingPrice: 200,
    weight: 0,
    dimensions: 'Digital Service',
    supplier: 'CloudMax Services',
    supplierSku: 'CM-CSP-003',
    reorderLevel: 75,
    maxStockLevel: 1000,
    status: 'Active',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-13'
  },
  { 
    id: 'INV-004', 
    name: 'Security Suite Pro', 
    sku: 'SSP-2024-004',
    description: 'Advanced security software suite with real-time threat protection',
    category: 'Software',
    brand: 'SecureGuard',
    unitCost: 350,
    sellingPrice: 500,
    weight: 0,
    dimensions: 'Digital Product',
    supplier: 'SecureGuard Technologies',
    supplierSku: 'SG-SSP-004',
    reorderLevel: 30,
    maxStockLevel: 300,
    status: 'Active',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-12'
  },
  { 
    id: 'INV-005', 
    name: 'Analytics Dashboard', 
    sku: 'AD-2024-005',
    description: 'Comprehensive analytics and reporting dashboard with real-time insights',
    category: 'Software',
    brand: 'DataViz',
    unitCost: 275,
    sellingPrice: 400,
    weight: 0,
    dimensions: 'Digital Product',
    supplier: 'DataViz Solutions',
    supplierSku: 'DV-AD-005',
    reorderLevel: 40,
    maxStockLevel: 400,
    status: 'Active',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-11'
  },
];

// Enhanced stock levels by bin location for each inventory item
export const stockLevels = [
  // Professional Software License - distributed across multiple bins
  { 
    itemId: 'INV-001', 
    locationId: 'LOC-001',
    zoneId: 'ZONE-001',
    aisleId: 'AISLE-001',
    binId: 'BIN-001',
    quantity: 50, 
    quarantine: 3, 
    available: 47, 
    preferredLevel: 60,
    onOrder: 15,
    isActive: true
  },
  { 
    itemId: 'INV-001', 
    locationId: 'LOC-001',
    zoneId: 'ZONE-001',
    aisleId: 'AISLE-001',
    binId: 'BIN-002',
    quantity: 35, 
    quarantine: 2, 
    available: 33, 
    preferredLevel: 40,
    onOrder: 10,
    isActive: true
  },
  { 
    itemId: 'INV-001', 
    locationId: 'LOC-002',
    zoneId: 'ZONE-004',
    aisleId: 'AISLE-007',
    binId: 'BIN-011',
    quantity: 45, 
    quarantine: 2, 
    available: 43, 
    preferredLevel: 60,
    onOrder: 15,
    isActive: true
  },
  
  // Enterprise Server Package
  { 
    itemId: 'INV-002', 
    locationId: 'LOC-001',
    zoneId: 'ZONE-002',
    aisleId: 'AISLE-003',
    binId: 'BIN-006',
    quantity: 15, 
    quarantine: 2, 
    available: 13, 
    preferredLevel: 20,
    onOrder: 5,
    isActive: true
  },
  { 
    itemId: 'INV-002', 
    locationId: 'LOC-002',
    zoneId: 'ZONE-004',
    aisleId: 'AISLE-007',
    binId: 'BIN-011',
    quantity: 8, 
    quarantine: 1, 
    available: 7, 
    preferredLevel: 12,
    onOrder: 4,
    isActive: true
  },
  
  // Cloud Storage Premium
  { 
    itemId: 'INV-003', 
    locationId: 'LOC-001',
    zoneId: 'ZONE-001',
    aisleId: 'AISLE-002',
    binId: 'BIN-004',
    quantity: 120, 
    quarantine: 10, 
    available: 110, 
    preferredLevel: 150,
    onOrder: 30,
    isActive: true
  },
  { 
    itemId: 'INV-003', 
    locationId: 'LOC-002',
    zoneId: 'ZONE-005',
    aisleId: 'AISLE-008',
    binId: 'BIN-012',
    quantity: 50, 
    quarantine: 5, 
    available: 45, 
    preferredLevel: 75,
    onOrder: 25,
    isActive: true
  },
  
  // Security Suite Pro
  { 
    itemId: 'INV-004', 
    locationId: 'LOC-001',
    zoneId: 'ZONE-001',
    aisleId: 'AISLE-001',
    binId: 'BIN-003',
    quantity: 50, 
    quarantine: 3, 
    available: 47, 
    preferredLevel: 60,
    onOrder: 10,
    isActive: true
  },
  { 
    itemId: 'INV-004', 
    locationId: 'LOC-002',
    zoneId: 'ZONE-004',
    aisleId: 'AISLE-007',
    binId: 'BIN-011',
    quantity: 20, 
    quarantine: 1, 
    available: 19, 
    preferredLevel: 30,
    onOrder: 10,
    isActive: true
  },
  
  // Analytics Dashboard
  { 
    itemId: 'INV-005', 
    locationId: 'LOC-001',
    zoneId: 'ZONE-001',
    aisleId: 'AISLE-002',
    binId: 'BIN-005',
    quantity: 70, 
    quarantine: 5, 
    available: 65, 
    preferredLevel: 80,
    onOrder: 10,
    isActive: true
  },
  { 
    itemId: 'INV-005', 
    locationId: 'LOC-002',
    zoneId: 'ZONE-004',
    aisleId: 'AISLE-007',
    binId: 'BIN-011',
    quantity: 35, 
    quarantine: 2, 
    available: 33, 
    preferredLevel: 50,
    onOrder: 15,
    isActive: true
  },
];

// Stock adjustment history
export const stockAdjustments = [
  {
    id: 'ADJ-001',
    itemId: 'INV-001',
    locationId: 'LOC-001',
    zoneId: 'ZONE-001',
    aisleId: 'AISLE-001',
    binId: 'BIN-001',
    type: 'Increase',
    quantity: 50,
    reason: 'New stock received',
    reference: 'PO-2024-001',
    adjustedBy: 'John Doe',
    date: '2024-01-15',
    notes: 'Received new shipment from supplier'
  },
  {
    id: 'ADJ-002',
    itemId: 'INV-002',
    locationId: 'LOC-002',
    zoneId: 'ZONE-004',
    aisleId: 'AISLE-007',
    binId: 'BIN-011',
    type: 'Decrease',
    quantity: 2,
    reason: 'Damaged goods',
    reference: 'DMG-2024-001',
    adjustedBy: 'Jane Smith',
    date: '2024-01-14',
    notes: 'Items damaged during transport'
  },
  {
    id: 'ADJ-003',
    itemId: 'INV-003',
    locationId: 'LOC-001',
    zoneId: 'ZONE-001',
    aisleId: 'AISLE-002',
    binId: 'BIN-004',
    type: 'Transfer',
    quantity: 25,
    reason: 'Location transfer',
    reference: 'TRF-2024-001',
    adjustedBy: 'Bob Johnson',
    date: '2024-01-13',
    notes: 'Transferred to East Coast Distribution'
  },
];

export const customers = [
  { id: 'CUST-001', name: 'Acme Corporation', email: 'contact@acme.com', phone: '+1-555-0123', totalOrders: 25, totalValue: 125000, status: 'Active' },
  { id: 'CUST-002', name: 'Tech Solutions Inc', email: 'info@techsolutions.com', phone: '+1-555-0124', totalOrders: 18, totalValue: 98000, status: 'Active' },
  { id: 'CUST-003', name: 'Global Enterprises', email: 'sales@global.com', phone: '+1-555-0125', totalOrders: 32, totalValue: 187500, status: 'Active' },
  { id: 'CUST-004', name: 'Innovation Labs', email: 'hello@innovation.com', phone: '+1-555-0126', totalOrders: 12, totalValue: 67800, status: 'Inactive' },
  { id: 'CUST-005', name: 'Digital Dynamics', email: 'team@digital.com', phone: '+1-555-0127', totalOrders: 28, totalValue: 145000, status: 'Active' },
];

// Enhanced sales orders with comprehensive information
export const salesOrders = [
  {
    id: 'SO-2024-001',
    orderNumber: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'Acme Corporation',
    orderDate: '2024-01-15',
    status: 'Confirmed',
    priority: 'Standard',
    locationId: 'LOC-001',
    
    // Billing Information
    billingAddress: {
      company: 'Acme Corporation',
      contactName: 'John Smith',
      email: 'john.smith@acme.com',
      phone: '+1-555-0123',
      street: '123 Business Ave',
      city: 'Business City',
      state: 'BC',
      zipCode: '12345',
      country: 'USA'
    },
    
    // Shipping Information
    shippingAddress: {
      company: 'Acme Corporation - Warehouse',
      contactName: 'Jane Doe',
      email: 'jane.doe@acme.com',
      phone: '+1-555-0124',
      street: '456 Warehouse St',
      city: 'Warehouse City',
      state: 'WC',
      zipCode: '54321',
      country: 'USA'
    },
    
    // Order Items
    items: [
      {
        id: 'SOI-001',
        itemId: 'INV-001',
        itemName: 'Professional Software License',
        sku: 'PSL-2024-001',
        quantity: 5,
        unitPrice: 650,
        totalPrice: 3250,
        notes: 'Latest version required'
      },
      {
        id: 'SOI-002',
        itemId: 'INV-004',
        itemName: 'Security Suite Pro',
        sku: 'SSP-2024-004',
        quantity: 2,
        unitPrice: 500,
        totalPrice: 1000,
        notes: 'Include installation guide'
      }
    ],
    
    // Financial Information
    subtotal: 4250,
    taxRate: 0.08,
    taxAmount: 340,
    shippingCost: 50,
    discount: 0,
    totalAmount: 4640,
    
    // Additional Information
    paymentTerms: 'Net 30',
    shippingMethod: 'Standard Ground',
    expectedDeliveryDate: '2024-01-22',
    notes: 'Rush order for Q1 deployment',
    salesRepId: 'EMP-003',
    createdBy: 'EMP-003',
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-15'
  },
  {
    id: 'SO-2024-002',
    orderNumber: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Tech Solutions Inc',
    orderDate: '2024-01-14',
    status: 'Processing',
    priority: 'High',
    locationId: 'LOC-002',
    
    billingAddress: {
      company: 'Tech Solutions Inc',
      contactName: 'Mike Johnson',
      email: 'mike@techsolutions.com',
      phone: '+1-555-0125',
      street: '789 Tech Blvd',
      city: 'Tech City',
      state: 'TC',
      zipCode: '67890',
      country: 'USA'
    },
    
    shippingAddress: {
      company: 'Tech Solutions Inc',
      contactName: 'Mike Johnson',
      email: 'mike@techsolutions.com',
      phone: '+1-555-0125',
      street: '789 Tech Blvd',
      city: 'Tech City',
      state: 'TC',
      zipCode: '67890',
      country: 'USA'
    },
    
    items: [
      {
        id: 'SOI-003',
        itemId: 'INV-002',
        itemName: 'Enterprise Server Package',
        sku: 'ESP-2024-002',
        quantity: 1,
        unitPrice: 2500,
        totalPrice: 2500,
        notes: 'Include 3-year warranty'
      },
      {
        id: 'SOI-004',
        itemId: 'INV-003',
        itemName: 'Cloud Storage Premium',
        sku: 'CSP-2024-003',
        quantity: 10,
        unitPrice: 200,
        totalPrice: 2000,
        notes: 'Annual subscription'
      }
    ],
    
    subtotal: 4500,
    taxRate: 0.08,
    taxAmount: 360,
    shippingCost: 100,
    discount: 200,
    totalAmount: 4760,
    
    paymentTerms: 'Net 15',
    shippingMethod: 'Express',
    expectedDeliveryDate: '2024-01-18',
    notes: 'Expedited processing required',
    salesRepId: 'EMP-003',
    createdBy: 'EMP-003',
    createdDate: '2024-01-14',
    lastUpdated: '2024-01-14'
  }
];

// Shipments for order fulfillment
export const shipments = [
  {
    id: 'SHIP-2024-001',
    shipmentNumber: 'SH-001',
    salesOrderId: 'SO-2024-001',
    orderNumber: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'Acme Corporation',
    status: 'In Transit',
    priority: 'Standard',
    
    // Shipping Details
    shippingMethod: 'Standard Ground',
    carrier: 'FedEx',
    trackingNumber: 'FX123456789',
    estimatedDeliveryDate: '2024-01-22',
    actualShipDate: '2024-01-16',
    actualDeliveryDate: null,
    
    // Location Information
    originLocationId: 'LOC-001',
    originLocationName: 'Main Warehouse',
    
    // Shipping Address
    shippingAddress: {
      company: 'Acme Corporation - Warehouse',
      contactName: 'Jane Doe',
      email: 'jane.doe@acme.com',
      phone: '+1-555-0124',
      street: '456 Warehouse St',
      city: 'Warehouse City',
      state: 'WC',
      zipCode: '54321',
      country: 'USA'
    },
    
    // Shipment Items
    items: [
      {
        id: 'SHI-001',
        orderItemId: 'SOI-001',
        itemId: 'INV-001',
        itemName: 'Professional Software License',
        sku: 'PSL-2024-001',
        quantityShipped: 5,
        binLocation: 'BIN-001',
        serialNumbers: ['PSL-001', 'PSL-002', 'PSL-003', 'PSL-004', 'PSL-005']
      },
      {
        id: 'SHI-002',
        orderItemId: 'SOI-002',
        itemId: 'INV-004',
        itemName: 'Security Suite Pro',
        sku: 'SSP-2024-004',
        quantityShipped: 2,
        binLocation: 'BIN-003',
        serialNumbers: ['SSP-001', 'SSP-002']
      }
    ],
    
    // Financial Information
    shippingCost: 50,
    weight: 2.5,
    dimensions: '12x8x4 inches',
    
    // Status History
    statusHistory: [
      { status: 'Warehouse Processing', date: '2024-01-15', time: '10:00 AM', notes: 'Order received in warehouse' },
      { status: 'Pending Transit', date: '2024-01-16', time: '08:00 AM', notes: 'Package prepared for shipment' },
      { status: 'In Transit', date: '2024-01-16', time: '02:00 PM', notes: 'Package picked up by carrier' }
    ],
    
    // Additional Information
    notes: 'Handle with care - software licenses',
    packedBy: 'EMP-004',
    shippedBy: 'EMP-004',
    createdDate: '2024-01-15',
    lastUpdated: '2024-01-16'
  },
  {
    id: 'SHIP-2024-002',
    shipmentNumber: 'SH-002',
    salesOrderId: 'SO-2024-002',
    orderNumber: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Tech Solutions Inc',
    status: 'Warehouse Processing',
    priority: 'High',
    
    shippingMethod: 'Express',
    carrier: 'UPS',
    trackingNumber: null,
    estimatedDeliveryDate: '2024-01-18',
    actualShipDate: null,
    actualDeliveryDate: null,
    
    originLocationId: 'LOC-002',
    originLocationName: 'East Coast Distribution',
    
    shippingAddress: {
      company: 'Tech Solutions Inc',
      contactName: 'Mike Johnson',
      email: 'mike@techsolutions.com',
      phone: '+1-555-0125',
      street: '789 Tech Blvd',
      city: 'Tech City',
      state: 'TC',
      zipCode: '67890',
      country: 'USA'
    },
    
    items: [
      {
        id: 'SHI-003',
        orderItemId: 'SOI-003',
        itemId: 'INV-002',
        itemName: 'Enterprise Server Package',
        sku: 'ESP-2024-002',
        quantityShipped: 1,
        binLocation: 'BIN-011',
        serialNumbers: ['ESP-001']
      },
      {
        id: 'SHI-004',
        orderItemId: 'SOI-004',
        itemId: 'INV-003',
        itemName: 'Cloud Storage Premium',
        sku: 'CSP-2024-003',
        quantityShipped: 10,
        binLocation: 'BIN-012',
        serialNumbers: []
      }
    ],
    
    shippingCost: 100,
    weight: 28.0,
    dimensions: '24x20x8 inches',
    
    statusHistory: [
      { status: 'Warehouse Processing', date: '2024-01-14', time: '03:00 PM', notes: 'Order received in warehouse' }
    ],
    
    notes: 'Fragile - server equipment',
    packedBy: null,
    shippedBy: null,
    createdDate: '2024-01-14',
    lastUpdated: '2024-01-14'
  }
];

export const salesData = [
  { id: 'SALE-001', customer: 'Acme Corporation', product: 'Professional Software License', quantity: 5, unitPrice: 450, total: 2250, date: '2024-01-15', status: 'Completed' },
  { id: 'SALE-002', customer: 'Tech Solutions Inc', product: 'Enterprise Server Package', quantity: 2, unitPrice: 1800, total: 3600, date: '2024-01-14', status: 'Pending' },
  { id: 'SALE-003', customer: 'Global Enterprises', product: 'Cloud Storage Premium', quantity: 10, unitPrice: 125, total: 1250, date: '2024-01-13', status: 'Completed' },
  { id: 'SALE-004', customer: 'Innovation Labs', product: 'Security Suite Pro', quantity: 3, unitPrice: 350, total: 1050, date: '2024-01-12', status: 'Processing' },
  { id: 'SALE-005', customer: 'Digital Dynamics', product: 'Analytics Dashboard', quantity: 8, unitPrice: 275, total: 2200, date: '2024-01-11', status: 'Completed' },
];

// Departments
export const departments = [
  { id: 'DEPT-001', name: 'Administration', description: 'Administrative and executive functions' },
  { id: 'DEPT-002', name: 'Sales', description: 'Sales and business development' },
  { id: 'DEPT-003', name: 'Operations', description: 'Operations and logistics' },
  { id: 'DEPT-004', name: 'Finance', description: 'Finance and accounting' },
  { id: 'DEPT-005', name: 'IT', description: 'Information technology and systems' },
  { id: 'DEPT-006', name: 'HR', description: 'Human resources and people operations' },
  { id: 'DEPT-007', name: 'Marketing', description: 'Marketing and communications' },
];

// System Roles with Permissions
export const systemRoles = [
  {
    id: 'ROLE-001',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: [
      'dashboard.view',
      'accounting.view', 'accounting.create', 'accounting.edit', 'accounting.delete',
      'inventory.view', 'inventory.create', 'inventory.edit', 'inventory.delete',
      'sales.view', 'sales.create', 'sales.edit', 'sales.delete',
      'customers.view', 'customers.create', 'customers.edit', 'customers.delete',
      'reports.view', 'reports.generate', 'reports.export',
      'employees.view', 'employees.create', 'employees.edit', 'employees.delete',
      'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
      'settings.view', 'settings.edit',
      'system.admin'
    ],
    isSystem: true,
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'ROLE-002',
    name: 'Manager',
    description: 'Management level access with most permissions',
    permissions: [
      'dashboard.view',
      'accounting.view', 'accounting.create', 'accounting.edit',
      'inventory.view', 'inventory.create', 'inventory.edit',
      'sales.view', 'sales.create', 'sales.edit',
      'customers.view', 'customers.create', 'customers.edit',
      'reports.view', 'reports.generate', 'reports.export',
      'employees.view', 'employees.create', 'employees.edit',
      'settings.view'
    ],
    isSystem: true,
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'ROLE-003',
    name: 'Employee',
    description: 'Standard employee access with basic permissions',
    permissions: [
      'dashboard.view',
      'accounting.view',
      'inventory.view',
      'sales.view', 'sales.create',
      'customers.view',
      'reports.view'
    ],
    isSystem: true,
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'ROLE-004',
    name: 'Sales Representative',
    description: 'Sales-focused role with customer and sales management',
    permissions: [
      'dashboard.view',
      'sales.view', 'sales.create', 'sales.edit',
      'customers.view', 'customers.create', 'customers.edit',
      'inventory.view',
      'reports.view'
    ],
    isSystem: false,
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-01'
  },
  {
    id: 'ROLE-005',
    name: 'Warehouse Manager',
    description: 'Inventory and warehouse management focused role',
    permissions: [
      'dashboard.view',
      'inventory.view', 'inventory.create', 'inventory.edit',
      'sales.view',
      'reports.view', 'reports.generate'
    ],
    isSystem: false,
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-01'
  }
];

// Employees (includes both system users and non-system employees)
export const employees = [
  {
    id: 'EMP-001',
    employeeId: 'E001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@company.com',
    phone: '+1-555-0101',
    jobTitle: 'Chief Executive Officer',
    department: 'DEPT-001',
    location: 'LOC-001',
    managerId: null,
    systemRoleId: 'ROLE-001',
    hasSystemAccess: true,
    status: 'Active',
    hireDate: '2023-01-15',
    salary: 150000,
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1-555-0102'
    },
    address: {
      street: '123 Executive Lane',
      city: 'Business City',
      state: 'BC',
      zipCode: '12345',
      country: 'USA'
    },
    notes: 'Company founder and CEO',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-15'
  },
  {
    id: 'EMP-002',
    employeeId: 'E002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'manager@company.com',
    phone: '+1-555-0103',
    jobTitle: 'Operations Manager',
    department: 'DEPT-003',
    location: 'LOC-001',
    managerId: 'EMP-001',
    systemRoleId: 'ROLE-002',
    hasSystemAccess: true,
    status: 'Active',
    hireDate: '2023-03-01',
    salary: 85000,
    emergencyContact: {
      name: 'Robert Smith',
      relationship: 'Spouse',
      phone: '+1-555-0104'
    },
    address: {
      street: '456 Manager Street',
      city: 'Business City',
      state: 'BC',
      zipCode: '12346',
      country: 'USA'
    },
    notes: 'Responsible for daily operations',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-14'
  },
  {
    id: 'EMP-003',
    employeeId: 'E003',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'user@company.com',
    phone: '+1-555-0105',
    jobTitle: 'Sales Representative',
    department: 'DEPT-002',
    location: 'LOC-002',
    managerId: 'EMP-002',
    systemRoleId: 'ROLE-004',
    hasSystemAccess: true,
    status: 'Active',
    hireDate: '2023-06-15',
    salary: 55000,
    emergencyContact: {
      name: 'Mary Johnson',
      relationship: 'Mother',
      phone: '+1-555-0106'
    },
    address: {
      street: '789 Sales Avenue',
      city: 'Sales City',
      state: 'SC',
      zipCode: '54321',
      country: 'USA'
    },
    notes: 'Top performing sales representative',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-13'
  },
  {
    id: 'EMP-004',
    employeeId: 'E004',
    firstName: 'Alice',
    lastName: 'Wilson',
    email: 'alice.wilson@company.com',
    phone: '+1-555-0107',
    jobTitle: 'Warehouse Supervisor',
    department: 'DEPT-003',
    location: 'LOC-001',
    managerId: 'EMP-002',
    systemRoleId: 'ROLE-005',
    hasSystemAccess: true,
    status: 'Active',
    hireDate: '2023-08-01',
    salary: 48000,
    emergencyContact: {
      name: 'Tom Wilson',
      relationship: 'Spouse',
      phone: '+1-555-0108'
    },
    address: {
      street: '321 Warehouse Road',
      city: 'Business City',
      state: 'BC',
      zipCode: '12347',
      country: 'USA'
    },
    notes: 'Manages main warehouse operations',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-12'
  },
  {
    id: 'EMP-005',
    employeeId: 'E005',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@company.com',
    phone: '+1-555-0109',
    jobTitle: 'Accountant',
    department: 'DEPT-004',
    location: 'LOC-001',
    managerId: 'EMP-001',
    systemRoleId: null,
    hasSystemAccess: false,
    status: 'Active',
    hireDate: '2023-09-15',
    salary: 52000,
    emergencyContact: {
      name: 'Lucy Brown',
      relationship: 'Sister',
      phone: '+1-555-0110'
    },
    address: {
      street: '654 Finance Street',
      city: 'Business City',
      state: 'BC',
      zipCode: '12348',
      country: 'USA'
    },
    notes: 'Handles accounts payable and receivable',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-11'
  },
  {
    id: 'EMP-006',
    employeeId: 'E006',
    firstName: 'Diana',
    lastName: 'Prince',
    email: 'diana.prince@company.com',
    phone: '+1-555-0111',
    jobTitle: 'Marketing Coordinator',
    department: 'DEPT-007',
    location: 'LOC-001',
    managerId: 'EMP-001',
    systemRoleId: null,
    hasSystemAccess: false,
    status: 'Active',
    hireDate: '2023-11-01',
    salary: 45000,
    emergencyContact: {
      name: 'Steve Prince',
      relationship: 'Spouse',
      phone: '+1-555-0112'
    },
    address: {
      street: '987 Marketing Boulevard',
      city: 'Business City',
      state: 'BC',
      zipCode: '12349',
      country: 'USA'
    },
    notes: 'Manages social media and marketing campaigns',
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-10'
  }
];

// Helper functions
export const getItemById = (id: string) => inventoryItems.find(item => item.id === id);
export const getLocationById = (id: string) => locations.find(location => location.id === id);
export const getZoneById = (id: string) => zones.find(zone => zone.id === id);
export const getAisleById = (id: string) => aisles.find(aisle => aisle.id === id);
export const getBinById = (id: string) => bins.find(bin => bin.id === id);

export const getZonesByLocation = (locationId: string) => zones.filter(zone => zone.locationId === locationId);
export const getAislesByZone = (zoneId: string) => aisles.filter(aisle => aisle.zoneId === zoneId);
export const getBinsByAisle = (aisleId: string) => bins.filter(bin => bin.aisleId === aisleId);

export const getStockByItemAndLocation = (itemId: string, locationId: string) => 
  stockLevels.filter(stock => stock.itemId === itemId && stock.locationId === locationId);
export const getStockByItem = (itemId: string) => 
  stockLevels.filter(stock => stock.itemId === itemId);
export const getStockByBin = (itemId: string, binId: string) => 
  stockLevels.find(stock => stock.itemId === itemId && stock.binId === binId);
export const getAdjustmentsByItem = (itemId: string) => 
  stockAdjustments.filter(adj => adj.itemId === itemId);

// Sales helper functions
export const getSalesOrderById = (id: string) => salesOrders.find(order => order.id === id);
export const getCustomerById = (id: string) => customers.find(customer => customer.id === id);
export const getShipmentById = (id: string) => shipments.find(shipment => shipment.id === id);
export const getShipmentsByOrder = (salesOrderId: string) => 
  shipments.filter(shipment => shipment.salesOrderId === salesOrderId);

// Employee helper functions
export const getEmployeeById = (id: string) => employees.find(emp => emp.id === id);
export const getDepartmentById = (id: string) => departments.find(dept => dept.id === id);
export const getSystemRoleById = (id: string) => systemRoles.find(role => role.id === id);
export const getEmployeesByDepartment = (departmentId: string) => 
  employees.filter(emp => emp.department === departmentId);
export const getEmployeesByManager = (managerId: string) => 
  employees.filter(emp => emp.managerId === managerId);
export const getSystemUsers = () => employees.filter(emp => emp.hasSystemAccess);
export const getActiveEmployees = () => employees.filter(emp => emp.status === 'Active');