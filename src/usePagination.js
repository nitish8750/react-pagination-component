import { useState } from "react";
import "./styles.css";

const Pagination = ({
  data,
  pageNumberLimit,
  itemsPerPage,
  onPageChange,
  currentPage
}) => {
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumberLimit);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlepageClick = (event) => {
    onPageChange(Number(event.target.id));
  };

  const renderPageNumbers = pages.map((page) => {
    if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlepageClick}
          className={currentPage === page ? "active" : null}
        >
          {page}
        </li>
      );
    }
    return null;
  });

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <ul className="pageNumbers">
      <li>
        <button disabled={currentPage === pages[0]} onClick={handlePrevious}>
          Previous
        </button>
      </li>
      {renderPageNumbers}
      <li>
        <button
          disabled={currentPage === pages[pages.length - 1]}
          onClick={handleNext}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
