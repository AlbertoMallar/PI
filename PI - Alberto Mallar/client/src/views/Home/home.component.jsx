
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../../Redux/Actions'
import Navbar from '../../components/Navbar/navbar.component';
import Cards from '../../components/Cards/cards.component';
import Load from '../Loading/Loading';


import './home.styles.css';


function Home() {

  const videogames = useSelector(state => state.videogames);
  const [loading, setLoading] = useState(false)


  const dispatch = useDispatch()

  //cuando entro a home que se haga el dispatch

  useEffect( () => {}, [])

  useEffect(() => {
    // Verificar si el estado videogames está vacío
    if (videogames.length === 0) {
      setLoading(true)
      dispatch(getGames())
        .then(() => setLoading(false))
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }


  }, [dispatch, videogames]);


  return (
    <div> {loading ? (<Load />) : (
    <div className='homeContainer'>
      <h2 className='homeText'> Metal Games Home </h2>
      <Navbar />
      <Cards />

    </div>)}
    </div>
  );
}

export default Home;