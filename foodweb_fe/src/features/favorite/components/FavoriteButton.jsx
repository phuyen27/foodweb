import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addFavorite,
  removeFavorite
} from "../favoriteSlice";

function FavoriteButton({ foodId }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth?.user);

  const favoriteList = useSelector(
    state => state.favorite.favoriteList
  ) || [];

  const isFavorite = favoriteList.some(
    f => String(f?.id || f) === String(foodId)
  );

  const handleToggle = () => {

    if (!user) {
      navigate("/login");
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(foodId));
    } else {
      dispatch(addFavorite(foodId));
    }

  };

  return (
    <FaHeart
      color={isFavorite ? "red" : "gray"}
      style={{ cursor: "pointer" }}
      onClick={handleToggle}
    />
  );
}

export default FavoriteButton;