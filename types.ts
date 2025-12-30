export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  image: string;
  category: 'group' | 'private' | 'virtual' | 'childcare';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'apparel' | 'equipment';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface BookingState {
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  userName: string;
  userEmail: string;
  intention: string; // The "vibe" or request
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down';
}

export interface AIResponse {
  mantra: string;
  recommendedClassType: string;
  reasoning: string;
}
