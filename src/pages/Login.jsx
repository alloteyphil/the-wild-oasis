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
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem 1.6rem;
    gap: 2.4rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: minmax(0, 40rem);
    padding: 2rem;
  }
`;

const LoginDetails = styled.div`
  border: 2px solid var(--color-brand-600);
  position: absolute;
  top: 0;
  right: 0;
  width: 310px;
  padding: 1.2rem;
  gap: 0.8rem;
  background-color: var(--color-brand-50);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    margin-top: 2rem;
    border-radius: var(--border-radius-md);
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 280px;
    padding: 1rem;
  }
`;

const LoginEmail = styled.p`
  font-size: 1.3rem;
  margin-bottom: 0.6rem;
  color: var(--color-brand-900);
  font-weight: 600;
`;

const LoginPassword = styled.p`
  font-size: 1.3rem;
  color: var(--color-brand-900);
  font-weight: 600;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
      <LoginDetails>
        <LoginEmail>Demo email: wibih77293@fna6.com</LoginEmail>
        <LoginPassword>Demo password: purple1234</LoginPassword>
      </LoginDetails>
    </LoginLayout>
  );
}

export default Login;
