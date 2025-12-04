import styled from "styled-components";
import { HiBars3 } from "react-icons/hi2";
import HeaderMenu from "./HeaderMenu.jsx";
import UserAvatar from "../features/authentication/UserAvatar.jsx";
import ButtonIcon from "./ButtonIcon.jsx";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1024px) {
    padding: 1.2rem 2.4rem;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.6rem;
    gap: 1.6rem;
  }
`;

const MenuButton = styled(ButtonIcon)`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

function Header({ onMenuClick }) {
  return (
    <StyledHeader>
      <MenuButton onClick={onMenuClick}>
        <HiBars3 />
      </MenuButton>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
