import React, { createContext, useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { DINO_IDS, ACcumulatorGIFS } from '../config';
import { registerUser, updateDinoOnServer, getDinosFromServer } from '../api';
import felicidadesImg from '/src/assets/overlay/Felicidades.png';


const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Replaces localStorage 'dataId' logic mostly
  const [foundDinos, setFoundDinos] = useState([]); // Replaces 'found' array
  const [loading, setLoading] = useState(true);

  // Check LocalStorage on boot
  useEffect(() => {
    const checkUser = async () => {
      const storedId = localStorage.getItem('dataId');
      if (storedId) {
        setUser({ _id: storedId });
        // Sync with server
        try {
          const data = await getDinosFromServer(storedId);
          if (data.success) {
            // Convert server object {dino_1: true} to array ['dino_1']
            const foundList = Object.keys(data.dinos).filter(key => data.dinos[key]);
            setFoundDinos(foundList);
          }
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  // --- ACTIONS ---

  const handleLogout = () => {
    localStorage.removeItem('dataId');
    setUser(null);
    setFoundDinos([]);
  }


  const handleRegister = async (formData) => {
    try {
      Swal.fire({ title: 'Cargando...', didOpen: () => Swal.showLoading(),  customClass: {
          container: 'my-swal-container',
          popup: 'swal-custom-popup',
          title: 'my-swal-title',
          confirmButton: 'my-swal-button',
      } });
      const data = await registerUser(formData);

      if (data.success) {
        localStorage.setItem('dataId', data.usuario._id);
        setUser(data.usuario);
         Swal.fire({
          title: '<span style="color: #ffffff">¡</span>ÉXITO<span style="color: #ffffff">!</span>',
          icon:'success',
          confirmButtonText: 'Usuario registrado',
          customClass: {
          container: 'my-swal-container',
          popup: 'swal-custom-popup',
          title: 'my-swal-title',
          confirmButton: 'my-swal-button',
      }
        });
      } else {
         Swal.fire({
          title: '<span style="color: #ffffff">¡</span>Ha occurrido un error<span style="color: #ffffff">!</span>',
          icon:'error',
          confirmButtonText: error.message,
          customClass: {
          container: 'my-swal-container',
          popup: 'swal-custom-popup',
          title: 'my-swal-title',
          confirmButton: 'my-swal-button',
      }
        });
      }
    } catch (error) {
       Swal.fire({
          title: '<span style="color: #ffffff">¡</span>Error Vuelva a Intentarlo<span style="color: #ffffff">!</span>',
          icon:'error',
          confirmButtonText: "Regresar",
          customClass: {
          container: 'my-swal-container',
          popup: 'swal-custom-popup',
          title: 'my-swal-title',
          confirmButton: 'my-swal-button',
      }
        });
    }
  };

  const handleDinoFound = async (index) => {
    const dinoId = DINO_IDS[index];

    // 1. If already found, ignore
    if (foundDinos.includes(dinoId)) return;

    // 2. Update Local State
    const newFoundList = [...foundDinos, dinoId];
    setFoundDinos(newFoundList);

    console.log(ACcumulatorGIFS[newFoundList.length-1])


    setTimeout(() => {
        // 3. Alert UI
        Swal.fire({
            background: `url(${ACcumulatorGIFS[newFoundList.length - 1]})`,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            customClass: {
                container: 'my-swal-container',
                popup: 'swal-custom-popupgifs',
                confirmButton: 'my-swal-buttongifs',
            }
        });
    }, 3000); // 3000 milliseconds = 3 seconds


    // 4. Update Server
    if (user?._id) {
      await updateDinoOnServer(user._id, dinoId);
    }

    // 5. Check Win Condition
    if (newFoundList.length === 8) {
      setTimeout(() => {
        Swal.fire({
          background: `url(${felicidadesImg})`,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          customClass: {
            container: 'my-swal-container',
            popup: 'swal-custom-popupgifs',
            confirmButton: 'my-swal-buttongifs',
          },  // <-- close customClass here
        }).then((result) => {  // <-- chain .then() on Swal.fire()
          if (result.isConfirmed) {
            window.open('/files/CUPONERA_CAYALOSFERA.pdf', '_blank');
          }
        });
      }, 4000);

    }
  };

  return (
    <GameContext.Provider value={{
      user,
      foundDinos,
      handleRegister,
      handleDinoFound,
      handleLogout,
      loading
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);