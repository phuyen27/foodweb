
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavorites } from "../features/favorite/favoriteSlide";

const MainLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth?.user);

  useEffect(() => {
    if (user) {
      dispatch(getFavorites());
    }
  }, [dispatch, user]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;