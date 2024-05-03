import { useUser } from "../userContext";

export const UserMenu = () => {
  const { username } = useUser();

  return (
    <div>
      <p>Welcome, {username}!</p>
      <button>Log out</button>
    </div>
  );
};
