import { useState } from 'react';
import StripeContainer from './components/StripeContainer';
import spatula from './assets/spatula.jpg';
import './App.css';

function App() {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="App">
      <h1>Espátula</h1>
      {
        showItem ? <StripeContainer /> : (
          <>
            <h3>R$ 1.10</h3>
            <img src={spatula} alt="Espátula" />
            <button onClick={() => setShowItem(true)}>Comprar</button>
          </>
        )
      }
    </div>
  );
}

export default App;
