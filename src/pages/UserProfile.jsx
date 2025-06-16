import { useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";

const UserProfilePage = () => {
  const { id } = useParams();
  return <UserProfile id={id} />;
};

export default UserProfilePage;
