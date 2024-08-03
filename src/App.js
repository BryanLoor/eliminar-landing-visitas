import React, { useEffect, useState } from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import './App.css';

const QRPage = () => {
  const [qrDataVisitaImage, setQrDataVisitaImage] = useState(null);
  const { id_visita } = useParams(); // Obtain the route parameter


  useEffect(() => {
    const fetchVisitData = async () => {
      const url = 'https://rr3m17qf-5000.use2.devtunnels.ms/visitas/getQRVisita'; 
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "id_visita": id_visita })
        });

        if (!response.ok) {
          console.log('Error in the request:', response);
          return; // Salir si hay un error en la respuesta
        }

        const data = await response.json();
        setQrDataVisitaImage(data.data.qr_image); // Asegurarse de que la respuesta contenga la imagen QR
      } catch (error) {
        console.log('Error fetching the visit data:', error);
      }
    };

    fetchVisitData();
  }, [id_visita]);

  return (
    <div className="App">
      <header className="App-header fade-in">
        <div className='title-container'>
          <h1>Bienvenido al Centro Cristiano de Guayaquil</h1>
          <h2>Tu lugar te espera!</h2>
        </div>
        <img src={`${process.env.PUBLIC_URL}/scan_qr.png`} alt="Banner" className="App-banner slide-in" />
      </header>
      <main className="App-body fade-in">
        {qrDataVisitaImage ? (
          <div>
            <div className="QRCode-container slide-in">
              <img src={`data:image/png;base64,${qrDataVisitaImage}`} alt="QR Code" className='QrCode' />
              <div>
                <h1>Este código QR contiene la información de tu visita</h1>
                <span>Por favor preséntelo a un guardia de la garita para el proceso de verificación y así poder entrar a las instalaciones</span>
              </div>
            </div>
            <div className="info_descarga fade-in">
              <p>Para mejor experiencia</p>
              <p>Descargue la app de ccg</p> 
              <a href="https://play.google.com/store">
                <img src={`${process.env.PUBLIC_URL}/play_store.png`} alt="Play Store" className="playstore-icon" style={{ width: "70px" }} />
              </a>
            </div>
          </div>
        ) : (
          <div>
            <p>Cargando el código QR de la visita...</p>
            <iframe src="https://giphy.com/embed/rLzDYazQXFAhlmU0xx" title='QR' width="200" height="200"  className="giphy-embed" allowFullScreen></iframe>
            </div>
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/:id_visita" element={<QRPage />} />
    </Routes>
  );
};

export default App;
