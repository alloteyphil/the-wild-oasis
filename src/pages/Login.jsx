import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm.jsx";
import Logo from "../ui/Logo.jsx";
import Heading from "../ui/Heading.jsx";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  position: relative;
`;

const LoginDetails = styled.div`
  border: 1px solid white;
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  padding: 10px;
  gap: 50px;
`;

const LoginEmail = styled.p``;

const LoginPassword = styled.p``;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
      <LoginDetails>
        <LoginEmail>Email: wibih77293@fna6.com</LoginEmail>
        <LoginPassword>Password: purple1234</LoginPassword>
      </LoginDetails>
    </LoginLayout>
  );
}

export default Login;
