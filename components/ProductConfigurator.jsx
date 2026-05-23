import React, { useState } from 'react';
import { Button } from './ui/button';
import { products, deviceOptions, timeOptions, whatsappConfig } from '../mockData';
import { ShoppingCart, Check } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ProductConfigurator = () => {
  const { toast } = useToast();
  const [selectedBrand, setSelectedBrand] = useState('kaspersky');
  const [selectedVersion, setSelectedVersion] = useState(products.kaspersky.versions[0].id);
  const [selectedDevices, setSelectedDevices] = useState(1);
  const [selectedTime, setSelectedTime] = useState(1);

  const calculatePrice = () => {
    const brand = products[selectedBrand];
    const version = brand.versions.find(v => v.id === selectedVersion);
    const deviceMultiplier = deviceOptions.find(d => d.value === selectedDevices).multiplier;
    const timeMultiplier = timeOptions.find(t => t.value === selectedTime).multiplier;
    
    return Math.round(version.basePrice * deviceMultiplier * timeMultiplier);
  };

  const handleGetLicense = () => {
    const brand = products[selectedBrand];
    const version = brand.versions.find(v => v.id === selectedVersion);
    const deviceLabel = deviceOptions.find(d => d.value === selectedDevices).label;
    const timeLabel = timeOptions.find(t => t.value === selectedTime).label;
    const totalPrice = calculatePrice();
    
    // Construir mensaje de WhatsApp con los detalles del producto
    const message = `Hola! Estoy interesado en adquirir:%0A%0A` +
      `🛡️ *${brand.name} - ${version.name}*%0A` +
      `📱 ${deviceLabel}%0A` +
      `📅 ${timeLabel}%0A` +
      `💰 Precio Total: $${totalPrice.toLocaleString('es-CL')} CLP%0A%0A` +
      `¿Podrían darme más información sobre este producto?`;

    // Abrir WhatsApp con el mensaje pre-escrito
    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Mostrar confirmación al usuario
    toast({
      title: '¡Redirigiendo a WhatsApp!',
      description: `${brand.name} ${version.name} - ${deviceLabel}, ${timeLabel} - $${totalPrice.toLocaleString('es-CL')}`,
    });
  };

  const brands = [
    { key: 'kaspersky', name: 'Kaspersky', logo: products.kaspersky.logo },
    { key: 'eset', name: 'ESET', logo: products.eset.logo },
    { key: 'mcafee', name: 'McAfee', logo: products.mcafee.logo }
  ];

  return (
    <section id="shop" className="py-32" style={{ backgroundColor: '#000000', borderTop: '1px solid #333333' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl text-white mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400', letterSpacing: '0.02em' }}>
            Tienda Hogar
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '300', color: '#A0A0A0', letterSpacing: '0.02em' }}>
            Configure su solución de seguridad ideal con licencias digitales de entrega inmediata
          </p>
        </div>

        {/* Large Dark Container */}
        <div className="max-w-6xl mx-auto rounded-2xl p-12 shadow-2xl" style={{ backgroundColor: '#0A0A0A', border: '1px solid #222222' }}>
          
          {/* Brand Selection - Horizontal Row */}
          <div className="mb-12">
            <label className="block text-lg text-white mb-8 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '300', letterSpacing: '0.02em' }}>
              Seleccione la Marca
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brands.map((brand) => (
                <div
                  key={brand.key}
                  onClick={() => {
                    setSelectedBrand(brand.key);
                    setSelectedVersion(products[brand.key].versions[0].id);
                  }}
                  className="group cursor-pointer transition-all duration-300"
                  style={{
                    padding: '3rem 2rem',
                    borderRadius: '16px',
                    backgroundColor: '#1A1A1A',
                    border: selectedBrand === brand.key ? '2px solid #1121F0' : '2px solid transparent',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(17, 33, 240, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex flex-col items-center justify-center" style={{ minHeight: '180px' }}>
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      style={{
                        height: '80px',
                        width: 'auto',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        marginBottom: '24px'
                      }}
                    />
                    <p className="text-white text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '300', letterSpacing: '0.02em', fontSize: '16px' }}>
                      {brand.name}
                    </p>
                  </div>
                  {selectedBrand === brand.key && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: '#1121F0' }}>
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Version Selection */}
          <div className="mb-10">
            <label className="block text-lg text-white mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '300', letterSpacing: '0.02em' }}>
              Versión del Producto
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products[selectedBrand].versions.map((version) => (
                <button
                  key={version.id}
                  onClick={() => setSelectedVersion(version.id)}
                  className="p-6 rounded-lg border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: selectedVersion === version.id ? '#1121F0' : '#333333',
                    backgroundColor: selectedVersion === version.id ? 'rgba(17, 33, 240, 0.1)' : '#0D0D0D'
                  }}
                >
                  <div className="text-base mb-1" style={{
                    color: selectedVersion === version.id ? '#1121F0' : '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
                  }}>
                    {version.name}
                  </div>
                  <div className="text-sm" style={{ color: '#A0A0A0', fontFamily: 'Inter, sans-serif', fontWeight: '300' }}>
                    Desde ${version.basePrice.toLocaleString('es-CL')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Device Selection */}
          <div className="mb-10">
            <label className="block text-lg text-white mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '300', letterSpacing: '0.02em' }}>
              Número de Dispositivos
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {deviceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDevices(option.value)}
                  className="p-6 rounded-lg border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: selectedDevices === option.value ? '#1121F0' : '#333333',
                    backgroundColor: selectedDevices === option.value ? 'rgba(17, 33, 240, 0.1)' : '#0D0D0D',
                    color: selectedDevices === option.value ? '#1121F0' : '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-10">
            <label className="block text-lg text-white mb-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '300', letterSpacing: '0.02em' }}>
              Duración de la Licencia
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedTime(option.value)}
                  className="p-6 rounded-lg border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: selectedTime === option.value ? '#1121F0' : '#333333',
                    backgroundColor: selectedTime === option.value ? 'rgba(17, 33, 240, 0.1)' : '#0D0D0D',
                    color: selectedTime === option.value ? '#1121F0' : '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '300',
                    letterSpacing: '0.02em'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Display & CTA */}
          <div className="pt-8" style={{ borderTop: '1px solid #333333' }}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-sm mb-1" style={{ color: '#A0A0A0', fontFamily: 'Inter, sans-serif', fontWeight: '300' }}>Precio Total</div>
                <div className="text-4xl text-white" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
                  ${calculatePrice().toLocaleString('es-CL')}
                  <span className="text-lg ml-2" style={{ color: '#A0A0A0' }}>CLP</span>
                </div>
              </div>
              <Button
                size="lg"
                onClick={handleGetLicense}
                className="text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                style={{ backgroundColor: '#1121F0', fontFamily: 'Inter, sans-serif', fontWeight: '300', letterSpacing: '0.02em' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0D1AB8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1121F0'}
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Obtener Licencia Ahora
              </Button>
            </div>
            <p className="text-sm mt-4 text-center sm:text-left" style={{ color: '#A0A0A0', fontFamily: 'Inter, sans-serif', fontWeight: '300' }}>
              Entrega inmediata por correo electrónico • Activación en minutos • Soporte incluido
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
