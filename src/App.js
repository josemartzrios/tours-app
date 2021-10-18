
import { useEffect, useState } from 'react';
import './App.css';

// Components
import Loading from './components/Loading';
import Tour from './components/Tour';
import Tours from './components/Tours';


// API
const url = 'https://course-api.com/react-tours-project'

function App() {

  // Las constantes que guardan mi información
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }

  // Petición fetch a mi API
  const fetchTours = async() => {
    setLoading(true);
    
  

  // Por si surge algún error
  try{
    const response = await fetch(url);
    const tours = await response.json();
    setLoading(false);
    setTours(tours)
  }catch(error){
    setLoading(false)
    console.log(error);
  }

  }

  useEffect(() => {
    fetchTours();
  }, []);

  // Si loading es true que se llame al loading component
  if(loading){
    return (
      <main>
        <Loading/>
      </main>
    );
  }
  // Para refrescar la pag y mostrar todos los proyectos de nuevo
  if(tours.length === 0){
    return <main>
      <div className='title'>
        <h2>No hay tours restantes</h2>
        <button className='btn' onClick={fetchTours}>
          Refrescar
        </button>
      </div>
    </main>
  }
  // En caso de que loading sea false que se llame al tours component
  return <main>
    <Tours tours={tours} removeTour={removeTour}/>
  </main>
}

export default App;
