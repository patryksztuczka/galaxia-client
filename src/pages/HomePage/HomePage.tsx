import { supabase } from "../../supabaseClient";

const HomePage = () => {
  const { auth } = supabase;

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div>
      HomePage
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default HomePage;
