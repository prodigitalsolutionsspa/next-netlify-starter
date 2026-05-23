import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductConfigurator from '../components/ProductConfigurator';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Cotizador Corporativo | Pro Digital Solutions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Bienvenido a Pro Digital Solutions" />
        
        <p className="description">
          Configura tu solución a la medida y obtén un presupuesto inmediato para tu proyecto.
        </p>

        <div className="grid w-full max-w-4xl mx-auto px-4 my-8">
          <ProductConfigurator />
          <ContactForm />
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          text-align: center;
          color: #4a5568;
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}
