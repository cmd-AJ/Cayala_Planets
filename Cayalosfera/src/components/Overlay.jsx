// This is only the register form. THis register form doesnt affect anything of the AR just the UIs

import { useEffect, useRef, useState } from 'react';
import { useGame } from './Gamecontext';
import "./css/overlay.css"
import { DINO_ASSETS } from '../config';
import titleImg from '../assets/overlay/CayalosferaTitle.png';
import logoImg from '../assets/overlay/logo.png';
import coleccionBg from '../assets/overlay/UI.png';


export default function UIOverlay() {
  const { user, handleRegister, foundDinos, handleLogout } = useGame();

  // Local form state
  const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', kids:'', adultos:'' });
  const [showProgress, setShowProgress] = useState(false);
  const [Introduced, isIntroduced] = useState(true);

  

  

  const prevCountRef = useRef(0);


  const handleClick = () => {
  isIntroduced(true); // This hides the overlay
};

  useEffect(() => {
    // Check if the number of found dinos has INCREASED

    // Update our reference for next time
    prevCountRef.current = foundDinos.length;

  }, [foundDinos]); // Runs whenever the foundDinos array changes

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegister(formData);
  };

  // If user is NOT registered, show Register Form
  if (!user) {
    return (
      <>


      

      {Introduced ? (
          <div className={`overlay-container ${!Introduced ? 'hidden' : ''}`}>

            <div style={{ marginTop:"26dvh", backgroundColor: "transparent", width: "100%", height: "65%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>

              <form onSubmit={onSubmit} className='formulario' style={{paddingTop:"4dvh"}}>

            

                <div
                className='masker'
                style={{
                    clipPath: "polygon(18% 0%, 80% 0%, 100% 0, 100% 82%, 82% 100%, 0 100%, 0% 80%, 0% 18%)",
                  }}
                >
                <div className="input-inner">
                 <label className="fake-label">NOMBRE:</label>
                <input
                  className="input-field"
                  value={formData.nombre}
                  onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  style={{
                    clipPath: "polygon(20% 0%, 80% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 80%, 0% 20%)"
                  }}
                />
                </div>
                </div>


                 <div
                className='masker'
                style={{
                    clipPath: "polygon(0 0, 82% 0%, 100% 18%, 100% 80%, 100% 100%, 18% 100%, 0% 82%, 0% 18%)"
                  }}
                >

                <div className="input-inner">
                  <label className="fake-label">CORREO:</label>

                <input
                  type="email"
                  className="input-field"
                  value={formData.correo}
                  onChange={e => setFormData({ ...formData, correo: e.target.value })}
                  required
                style={{
                    clipPath: "polygon(0 0, 80% 0%, 100% 20%, 100% 80%, 100% 100%, 20% 100%, 0% 80%, 0% 20%)"
                  }}

                />
                </div>

                </div>
                
                <div className='masker' style={{
                  clipPath: "polygon(18% 0%, 80% 0%, 100% 0, 100% 82%, 82% 100%, 0 100%, 0% 80%, 0% 18%)"
                }}>
                  <div className="input-inner">
                    <label className="fake-label">TELÉFONO:</label>
                    <input
                      type="tel"
                      className="input-field"
                      value={formData.telefono}
                      onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                      required
                    />
                  </div>
                </div>


                
                 <div
                className='masker'
                style={{
                    clipPath: "polygon(0 0, 82% 0%, 100% 18%, 100% 80%, 100% 100%, 18% 100%, 0% 82%, 0% 18%)"
                  }}
                >

                  <div className="input-inner">
                    <label className="fake-label">¿CUÁNTOS NIÑOS NOS ACOMPAÑAN?</label>

                <input
                  type="number"
                  className="input-field"
                  value={formData.kids}
                  onChange={e => setFormData({ ...formData, kids: e.target.value })}
                  required
                style={{
                    clipPath: "polygon(0 0, 80% 0%, 100% 20%, 100% 80%, 100% 100%, 20% 100%, 0% 80%, 0% 20%)"
                  }}

                />

                </div>
                </div>


                
                 <div
                className='masker'
                style={{
                     clipPath: "polygon(18% 0%, 80% 0%, 100% 0, 100% 82%, 82% 100%, 0 100%, 0% 80%, 0% 18%)"

                  }}
                >

                <div className="input-inner">
                  <label className="fake-label">¿CUÁNTOS ADULTOS NOS ACOMPAÑAN?</label>


                <input
                  type="number"
                  className="input-field"
                  value={formData.adultos}
                  onChange={e => setFormData({ ...formData, adultos: e.target.value })}
                  required
                style={{
                      clipPath: "polygon(18% 0%, 80% 0%, 100% 0, 100% 82%, 82% 100%, 0 100%, 0% 80%, 0% 18%)"

                  }}

                />
                </div>
                </div>


                <div className='jugar-wrapper'>
                <button className='jugar' type="submit">Aceptar</button>
                </div>


              </form>
            </div>
          </div>
        ) : 
        <>
            <div className='introduccion'>

          </div>
          <div className="intro-ui">
              <button className='intro-button' onClick={handleClick} ><b>¡Empezar!</b></button>
          </div>

        </>
        }

        </>

    );
  }

  // If User IS registered, show Game UI buttons
  return (
    <div style={{ position: 'absolute', zIndex: 10, top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>

      {/* HUD Header */}
      <div style={{ pointerEvents: 'auto', padding: 10, paddingLeft:30, display: 'flex', justifyContent: 'space-between' }}>
        <button className='HUDheader' onClick={() => setShowProgress(true)}>
          <img width={100} height={30} src={titleImg}></img>
        </button>
        
      </div>



      {foundDinos.length === 8 && (

        <>
        

          <div style={{fontFamily: 'Cygun', color: 'white' }} className='Aviso'>

          </div>




        <div style={{
          pointerEvents: 'auto',
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}>
          

          <button
            onClick={() => {
              // Replace with your actual cuponera handler
              window.open('/files/CUPONERA_CAYALOSFERA.pdf', '_blank');
            }}
            style={{ padding: '4vw 2vw', fontSize: '0.8rem',
                    backgroundColor:"#E68C00",
                    fontFamily: 'Cygun',
                    color:"white",
                    clipPath: "polygon(18% 0%, 80% 0%, 100% 0, 100% 82%, 82% 100%, 0 100%, 0% 80%, 0% 18%)",

             }}
          >
          ¡Disfruta de tu cuponera!
          </button>
          <span style={{ color: '#E68C00', fontFamily: 'Cygun', fontSize: '1rem' }}>
          </span>
        </div>
        </>

      )}

        <div style={{ pointerEvents: 'auto', padding: 10, display: 'flex', justifyContent: 'space-between' }}>
        {[...Array(8)].map((_, i) => {
          const dinoId = `planeta_${i}`;
          const isFound = foundDinos.includes(dinoId);
          const imageSrc = DINO_ASSETS[dinoId];

          return (
            <div id={dinoId} key={dinoId} >
              <img
                width={40}
                src={imageSrc}
                style={{
                  // If not found, make it gray and slightly transparent
                  filter: isFound ? "none" : "grayscale(100%)",
                  opacity: isFound ? 1 : 0.5,
                  transition: "filter 0.5s ease, opacity 0.5s ease" // Smooth transition when found!
                }}
                alt={dinoId}
              />
            </div>
          );
        })}

      </div>








      {/* Progress Modal */}
      {showProgress && (
        <div style={{
          pointerEvents: 'auto',
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.9)',
          color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>

            <button style={{position:'absolute', top:"1.9%", left:"4%"}} className='HUDheader' onClick={() => setShowProgress(true)}>
          <img width={100} height={30} src={logoImg}></img>
        </button>

            <div style={{ pointerEvents: 'auto', padding: 10, display: 'flex', justifyContent: 'space-between' }}>
        {[...Array(8)].map((_, i) => {
          const dinoId = `planeta_${i}`;
          const isFound = foundDinos.includes(dinoId);
          const imageSrc = DINO_ASSETS[dinoId];

          return (
            <div id={dinoId} key={dinoId} >
              <img
                width={30}
                src={imageSrc}
                style={{
                  // If not found, make it gray and slightly transparent
                  filter: isFound ? "none" : "grayscale(100%)",
                  opacity: isFound ? 1 : 0.5,
                  transition: "filter 0.5s ease, opacity 0.5s ease" // Smooth transition when found!
                }}
                alt={dinoId}
              />
            </div>
          );
        })}

      </div>


          <div style={{ backgroundSize: 'cover', padding: 20, borderRadius: "10px", paddingBottom: "15%" }}>
            <h2 className='titlecoleccion'><span style={{fontFamily:"Cybun", fontWeight:200,color:"#FFCC00"}} ></span>mis planetas<span style={{fontFamily:"Cygun", color:"#FFCC00"}} ></span></h2>

            
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 8, 
                justifyContent: 'center', // Centers the items horizontally
                maxWidth: '260px',       // Limits width so it still looks like a grid (~4 items wide)
                margin: '0 auto'         // Centers the whole container
              }}>
              {[...Array(8)].map((_, i) => {
                // UPDATE 1: Match the ID to your config (animal_0, animal_1...)
                // We use 'i' instead of 'i+1' because your config starts at 0
                const dinoId = `planeta_${i}`;

                const isFound = foundDinos.includes(dinoId);

                // UPDATE 2: Get the specific image for this animal
                const imageSrc = DINO_ASSETS[dinoId];

                return (
                  <div key={i} style={{
                    width: 50, height: 50,
                    // Change background: White if found (to show image clearly), Grey if not
                    background: isFound ? 'white' : '#ddd',
                    border: isFound ? '2px solid #fe6c17' : '2px solid white', // Green border if found
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden' // Keeps the image inside the rounded corners
                  }}>
                    {isFound ? (
                      // SHOW IMAGE IF FOUND
                      <img
                        src={imageSrc}
                        alt="Found"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      // SHOW '?' IF NOT FOUND
                      <span style={{ fontSize: '20px', color: '#666' }}></span>
                    )}
                  </div>
                )
              })}
            </div>

          </div>
          <button className='closer' style={{ marginTop: 20, fontFamily:"Cygun>" }} onClick={() => setShowProgress(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}