// Importamos React
import React from 'react';

// Importamos el componente MainLayout
import MainLayout from '../components/MainLayout';

// Definimos _app como una función que acepta un objeto de propiedades
function MyApp({ Component, pageProps }) {
  // Retornamos la aplicación envuelta en el layout principal
  return (
    <MainLayout isLoggedIn={false}>
      {/* Renderizamos el componente principal (Component) con sus props */}
      <Component {...pageProps} />
    </MainLayout>
  );
}

// Exportamos MyApp
export default MyApp;



