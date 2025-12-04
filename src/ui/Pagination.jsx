import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constant.js";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.2rem;
    align-items: stretch;
  }
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
    font-size: 1.2rem;
  }

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? "#312e81" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? "#ffffff" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  box-shadow: var(--shadow-sm);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.2s ease-in-out;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;

    span {
      display: none;
    }
  }

  &:hover:not(:disabled) {
    background-color: #312e81;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(49, 46, 129, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    background-color: #3730a3;
    box-shadow: var(--shadow-sm);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
