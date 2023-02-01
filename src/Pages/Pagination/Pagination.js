import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ infoPerPage, totalInfo, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalInfo / infoPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='flex gap-5 justify-center'>
        
        {pageNumbers.map(number => (
          <li key={number} className='font-semibold border-2'>
            <Link onClick={(event) => paginate(number)} to='#' className='p-2'>
              {number}
            </Link>
          </li>
        ))}
        
      </ul>
    </nav>
  );
};

export default Pagination;