export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock user database
const mockUsers = [
  {
    id: '1',
    email: 'admin@company.com',
    password: 'admin123',
    name: 'John Doe',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'manager@company.com',
    password: 'manager123',
    name: 'Jane Smith',
    role: 'manager' as const,
  },
  {
    id: '3',
    email: 'user@company.com',
    password: 'user123',
    name: 'Bob Johnson',
    role: 'user' as const,
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

  async register(email: string, password: string, name: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user' as const,
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