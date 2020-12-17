import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => {
  const onClick = () => {
    isLoggedInVar(false);
  };
  return (
    <div>
      <h1>Logged in</h1>
      <button onClick={onClick}>Logout</button>
    </div>
  );
};
