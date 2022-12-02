import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserProfileQuery } from "../api/user.js";

function Navbar() {
  const navigate = useNavigate();
  const { data: profile } = useUserProfileQuery();

  const onHeader = () => {
    navigate("/");
  };

  const onLogIn = () => {
    navigate("log-in");
  };

  const onAddEmployee = () => {
    navigate("/manager/add-employee");
  };

  const onAddSchedule = () => {
    navigate("/manager/add-schedule");
  };

  const onProfile = () => {
    navigate("/profile");
  };

  return (
    <Container>
      <Header onClick={onHeader}>Visit Booking</Header>

      <ButtonContainer>
        {profile?.role === "manager" && (
          <>
            <Button onClick={onAddEmployee}>Add Employee</Button>
            <Button onClick={onAddSchedule}>Add Schedule</Button>
          </>
        )}

        {profile && <Button onClick={onProfile}>Profile</Button>}
        {!profile && <Button onClick={onLogIn}>Log In</Button>}
      </ButtonContainer>
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.primary};
`;

const Header = styled.div`
  height: 100%;
  width: fit-content;
  padding: 0 10px;

  display: flex;
  align-items: center;

  font-size: 24px;
  font-weight: 900;
  color: white;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  height: 100%;
  width: fit-content;
  padding: 0 30px;

  box-sizing: border-box;
  border-left: 2px dashed ${(props) => props.theme.secondary};

  display: flex;
  align-items: center;

  font-size: 18px;
  font-weight: 500;
  color: white;
  cursor: pointer;

  &:hover {
    backdrop-filter: brightness(50%);
  }
`;
