import React from "react";
import styled from "styled-components";

const PaginateWrapper = styled.article`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  .paginate {
    cursor: pointer;
  }
  .disabled {
    cursor: not-allowed;
  }
  .pagination-counter {
    font-size: 18px;
  }
`;

const Pagination = (props) => {
const { next, previous, totalItems, currentPage, pageSize , isFilter, startIndex, endIndex  } = props.details
const isNext = () => {
  if(isFilter){
    return endIndex + 1 < totalItems
  }
  return !!next
}
const isPrevious = () => {
  if(isFilter){
    return startIndex !== 0
  }
  return !!previous
}

  return (
    <PaginateWrapper>
      <div
        onClick={props.previousPage}
        className={isPrevious()? "paginate" : "disabled"}
        role="button"
      >
        <svg
          height="64"
          viewBox="0 0 24 24"
          width="64"
          fill={isPrevious()? "#000" : "#d3d3d3"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
          <path d="M0-.5h24v24H0z" fill="none" />
        </svg>
      </div>

      <div className="pagination-counter">
        {currentPage} of {Math.ceil(totalItems/pageSize)}
      </div>
      <div
        onClick={props.nextPage}
        role="button"
        className={isNext()? "paginate" : "disabled"}
      >
        <svg
          height="64"
          fill={isNext()? "#000" : "#d3d3d3"}
          viewBox="0 0 24 24"
          width="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
          <path d="M0-.25h24v24H0z" fill="none" />
        </svg>
      </div>
    </PaginateWrapper>
  );
};

export default Pagination;
