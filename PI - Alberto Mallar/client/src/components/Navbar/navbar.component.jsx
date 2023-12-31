import { Link } from 'react-router-dom';
import './navbar.styles.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getByName, 
  getGames, 
  getGenres, 
  filterByGenres, 
  gamesOrder, 
  gamesOrigin, 
  ratingOrder 
} from '../../Redux/Actions';



function Navbar() {

  

  const dispatch = useDispatch()

  const genres = useSelector(state => state.filteredGenres)

  console.log(genres)
  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  const [search, setSearch] = useState([]);


  const inputSearchHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setSearch(value);
  }


  const searchButtonHandler = (event) => {
    event.preventDefault();
    dispatch(getByName(search))
    setSearch('');
  }
  const homeLinkHandler = () => {
    dispatch(getGames());
  };

  const filterHandler = (e) => {
    const { value } = e.target;
    dispatch(filterByGenres(value));
  }

  const filterOrigin = (e) => {
    const { value } = e.target;
    dispatch(gamesOrigin(value))
    //window.location.reload();
  }

  const orderHandler = (e) => {
    const { value } = e.target;
    dispatch(gamesOrder(value))
  }

  const ratingHandler = (e) => {
    const { value } = e.target;
    dispatch(ratingOrder(value))
  }

  return (
    <div className="searchBarContainer">
      <Link to='/home' onClick={homeLinkHandler} className='linksContainer'>HOME</Link>
      <Link to='/create' className='linksContainer'>POST GAME</Link>
      <div className='filterContainer'>

        <select className='selectContainer' name='Genres' onChange={filterHandler}>
          <optgroup label="Géneros">
            <option value='AllGenres'>Géneros</option>
            {genres?.map(genre => (
              <option value={genre} key={genre.id}>{genre}</option>
            ))}
          </optgroup>
        </select>

      </div>
      <div className='filterContainer'>
        <h4> </h4>

        <select className='selectContainer' onChange={orderHandler}>
          <optgroup label='Orden'>
            <option value='Default'>Orden</option>
          </optgroup>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

      </div>
      <div className='filterContainer'>

        <select className='selectContainer' name='Rating' onChange={ratingHandler}>
          <optgroup label="Rating">
            <option value='Default'>Rating</option>
            <option value='menor'>Menor Rating</option>
            <option value='mayor'>Mayor Rating</option>
          </optgroup>
        </select>

      </div>
      <div className='filterContainer'>

        <select className='selectContainer' name='Origen' onChange={filterOrigin}>
          <optgroup label="Origen">
            <option value='All'>All</option>
            <option value='api'>API</option>
            <option value='db'>DB</option>
          </optgroup>
        </select>

      </div>
      <form onSubmit={searchButtonHandler}>
        <input className='selectContainer' placeholder="VideoGame 🔍" type='search' value={search} onChange={inputSearchHandler} />
        <button className='buttonContainer' type='Submit' >Buscar</button>
      </form>
    </div>
  );
}

export default Navbar;