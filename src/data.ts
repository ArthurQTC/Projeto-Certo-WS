import { BriseProduct, Project, TeamMember } from './types';

export const products: BriseProduct[] = [
  {
    id: 'geoclad',
    title: 'Geoclad',
    description: 'Solução inovadora que redefine o conceito de fachadas metálicas, dinâmicas e personalizáveis',
    category: 'Fachada',
    imageUrl: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/2025/03/Geoclad_Clube-Artesano-Campinas_Foto-Bebete-Viegas-compressed.jpg'
  },
  {
    id: 'brise-fins',
    title: 'Brise fins',
    description: 'Solução elegante, combinando tecnologia avançada, eficiência energética e excelente resistência para fachadas',
    category: 'Solar',
    imageUrl: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/2025/03/Edificio-ON-Melo-Alves-Foto-Fran-Parente-compressed.jpg'
  },
  {
    id: 'quadrobrise',
    title: 'Quadrobrise',
    description: 'Com eficiência térmica e integração estética, os Quadrobrises trazem abordagem moderna para espaços mais sustentáveis',
    category: 'Solar',
    imageUrl: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/2025/03/Edificio-Figueira-Leopoldo-compressed-1.jpg'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Geoclad - Clube Artesano',
    location: 'Campinas, SP',
    category: 'Comercial',
    imageUrl: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/2025/03/Geoclad_Clube-Artesano-Campinas_Foto-Bebete-Viegas-compressed.jpg'
  },
  {
    id: '2',
    title: 'Edifício ON Melo Alves',
    location: 'São Paulo, SP',
    category: 'Corporativo',
    imageUrl: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/2025/03/Edificio-ON-Melo-Alves-Foto-Fran-Parente-compressed.jpg'
  },
  {
    id: '3',
    title: 'Edifício Figueira Leopoldo',
    location: 'São Paulo, SP',
    category: 'Corporativo',
    imageUrl: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/2025/03/Edificio-Figueira-Leopoldo-compressed-1.jpg'
  },
  {
    id: '4',
    title: 'Cinetic Brise - Hans Donner',
    location: 'Brasília, DF',
    category: 'Comercial',
    imageUrl: 'https://architectural.hunterdouglas.com.br/wp-content/uploads/sites/5/slider/cache/002fa3605aa50e13f996283ea529bcc8/cinetic-brise-by-hunter-douglas-e-hans-donner-1.jpg'
  }
];

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Eliel Oliveira',
    role: 'Diretor Executivo',
    whatsapp: '5561993290027',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
  },
  {
    id: '2',
    name: 'Andrew Soares',
    role: 'Arquiteto',
    instagram: 'arq.andrewsoares',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
  },
  {
    id: '3',
    name: 'Ênio de Lima',
    role: 'Comercial: Goiás',
    whatsapp: '5562992952240',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80'
  },
  {
    id: '4',
    name: 'Alan Amorim',
    role: 'Gerente Comercial',
    whatsapp: '5561992821967',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'
  }
];
