import styled from "@emotion/styled";
import { Button } from "@mui/material";
import PrivateProvider from "../Providers/PrivateProvider";

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flext;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <PrivateProvider>
      <HomeContainer>
        <h1 style={{ marginBottom: "1rem" }}>Welcome User</h1>
        <Button type="button" color="error" onClick={() => handleSignOut()}>
          Sign Out
        </Button>
      </HomeContainer>
    </PrivateProvider>
  );
}

export default Home;
