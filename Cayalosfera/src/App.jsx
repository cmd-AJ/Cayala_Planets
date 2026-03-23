import './App.css'
import ARScene from './components/ARScene'
import { GameProvider } from './components/Gamecontext'
import UIOverlay from './components/Overlay'
import InfoButton from './components/Infobutton'

function App() {


  const mindFilePath = "src/assets/Planets.mind";

  // 2. THE ARRAY OF MODELS
  // The order here MUST match the order inside the .mind file
  const animalModels = [
    "/modelos/jupiter.glb",    // Index 0
    "/modelos/earth.glb",   // Index 1
    "/modelos/mars.glb",    // Index 2
    "/modelos/mercury.glb",   // Index 3
    "/modelos/neptune.glb",     // Index 5
    "/modelos/saturn.glb",      // Index 4
    "/modelos/sun.glb",        // Index 4
    "/modelos/uranus.glb",    // Index 6

  ];

  return (





    <div className="App">
      <InfoButton></InfoButton>
      <GameProvider>
        <div className="App" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <ARScene path={mindFilePath} animalPaths={animalModels} />
          <UIOverlay />
        </div>
      </GameProvider>
    </div>
  )
}

export default App
