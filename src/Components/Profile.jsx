import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const HideFooter = location.pathname.startsWith("/profile");


  return (
    user && (
      <div>
        <EditProfile user={user} />
        {!HideFooter && <Footer/> }
      </div>
    )
  );
};
export default Profile;