export const productsData = {
  categories: [
    {
      id: 'web-development',
      name: 'Desarrollo Web',
      options: [
        { id: 'landing-page', name: 'Landing Page Corporativa', price: 250000 },
        { id: 'ecommerce', name: 'Tienda Online / E-commerce', price: 450000 },
        { id: 'custom-system', name: 'Sistema Web a Medida', price: 850000 }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Digital',
      options: [
        { id: 'rrss-basic', name: 'Gestión Redes Sociales (Básico)', price: 180000 },
        { id: 'rrss-pro', name: 'Gestión Redes Sociales (Full)', price: 320000 },
        { id: 'ads-campaign', name: 'Campaña Google & Meta Ads', price: 150000 }
      ]
    }
  ],
  addons: [
    { id: 'seo', name: 'Optimización SEO Avanzada', price: 75000 },
    { id: 'maintenance', name: 'Soporte y Mantenimiento Mensual', price: 45000 },
    { id: 'branding', name: 'Diseño de Identidad Corporativa', price: 120000 }
  ]
};
