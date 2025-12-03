import { useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { addToFavorites, removeFromFavorites, setFavorites } from '../../redux/features/favorites/favoriteSlice.js'
import {
  addFavoritesToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from '../../utils/localStorage.js';
const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites) || []
  const isFavorites = favorites.some((p)=> p._id === product._id)

  useEffect(() => {
    const getFavoriteFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(getFavoriteFromLocalStorage))
  }, [dispatch])
  
const toggleFavorites = () => {
  if (isFavorites) {
    dispatch(removeFromFavorites(product));
    // remove the product from the localStorage as well
    removeFavoriteFromLocalStorage(product._id);
  } else {
    dispatch(addToFavorites(product));
    // add the product to localStorage as well
    addFavoritesToLocalStorage(product);
  }
};
  return (
    <div
      onClick={toggleFavorites}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavorites ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
}

export default HeartIcon