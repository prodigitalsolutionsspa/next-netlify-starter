import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes integrar el envío a tu correo o API si lo deseas
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto my-10 p-6 bg-green-50 border border-green-200 rounded-xl text-center shadow-sm">
        <h3 className="text-xl font-bold text-green-800 mb-2">¡Mensaje Recibido!</h3>
        <p className="text-green-600">Nos pondremos en contacto contigo a la brevedad.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white border border-gray-100 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contacto Corporativo</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Tu nombre o empresa"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="ejemplo@prodigital.cl"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="+56 9 1234 5678"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje o Requerimiento</label>
          <textarea
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Cuéntanos en qué te podemos ayudar..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition shadow-sm hover:shadow-md"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}
