export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  companyId?: string;
  employeeId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CompanyRegistrationData {
  companyName: string;
  companyEmail: string;
  companyPhone?: string;
  companyAddress?: string;
  companyCity?: string;
  companyState?: string;
  companyZip?: string;
  companyCountry?: string;
  industry?: string;
  companySize?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle: string;
  password: string;
  confirmPassword: string;
}

// Mock user database
const mockUsers = [
  {
    id: '1',
    email: 'admin@company.com',
    password: 'admin123',
    name: 'John Doe',
    role: 'admin' as const,
    companyId: 'COMP-001',
    employeeId: 'EMP-001',
  },
  {
    id: '2',
    email: 'manager@company.com',
    password: 'manager123',
    name: 'Jane Smith',
    role: 'manager' as const,
    companyId: 'COMP-001',
    employeeId: 'EMP-002',
  },
  {
    id: '3',
    email: 'user@company.com',
    password: 'user123',
    name: 'Bob Johnson',
    role: 'user' as const,
    companyId: 'COMP-001',
    employeeId: 'EMP-003',
  },
];

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    // Store in localStorage
    localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('auth_token', 'mock_jwt_token_' + user.id);
    
    return userWithoutPassword;
  },

  async register(email: string, password: string, name: string, companyData?: CompanyRegistrationData): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    // Generate IDs
    const userId = Date.now().toString();
    const companyId = 'COMP-' + Date.now().toString().slice(-3);
    const employeeId = 'EMP-' + Date.now().toString().slice(-3);
    
    // Create company record (in a real app, this would be saved to database)
    if (companyData) {
      const company = {
        id: companyId,
        name: companyData.companyName,
        email: companyData.companyEmail,
        phone: companyData.companyPhone,
        address: {
          street: companyData.companyAddress,
          city: companyData.companyCity,
          state: companyData.companyState,
          zipCode: companyData.companyZip,
          country: companyData.companyCountry,
        },
        industry: companyData.industry,
        size: companyData.companySize,
        createdDate: new Date().toISOString(),
        ownerId: userId,
      };
      
      // Store company data (in localStorage for demo)
      localStorage.setItem('company_data', JSON.stringify(company));
    }
    
    const newUser = {
      id: userId,
      email,
      name,
      role: 'admin' as const, // First user is always admin
      companyId,
      employeeId,
    };
    
    // Store in localStorage
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    localStorage.setItem('auth_token', 'mock_jwt_token_' + newUser.id);
    
    return newUser;
  },

  logout(): void {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');
    
    if (!userStr || !token) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  },
};