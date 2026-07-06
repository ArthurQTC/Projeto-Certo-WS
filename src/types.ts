export interface BriseProduct {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  category: 'Solar' | 'Fachada' | 'Interno' | 'Cobertura';
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: 'Residencial' | 'Comercial' | 'Corporativo' | 'Industrial';
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  whatsapp?: string;
  instagram?: string;
  whatsappUrl?: string;
}
