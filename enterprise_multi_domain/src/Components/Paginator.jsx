import ReactPaginate from "react-paginate";
const Paginator = ({ totalRecords, rows, first, onPageChange }) => {
  const pageCount = Math.ceil(totalRecords / rows);
  const forcePage = Math.floor(first / rows);
  return (
    <div className="flex justify-center mt-4 sm:mt-6 w-full overflow-x-auto custom-scrollbar py-2">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Previous"
        pageCount={pageCount}
        forcePage={forcePage}
        onPageChange={(e) => onPageChange(e.selected)}
        containerClassName="flex items-center flex-wrap justify-center bg-[#F2F4F7] dark:bg-gray-700 p-1.5 sm:p-2 rounded-full gap-1 sm:gap-2 text-xs sm:text-sm max-w-full"
        pageClassName="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full dark:bg-white dark:text-black shadow-md text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-200"
        activeClassName="!bg-white !text-black shadow-md font-bold dark:bg-white dark:text-black"
        previousClassName="px-2.5 sm:px-4 py-1.5 sm:py-2 text-gray-600 dark:text-gray-400 cursor-pointer dark:bg-black dark:text-white font-semibold rounded-full border-gray-50 shadow-md"
        nextClassName="px-3 sm:px-6 py-1.5 sm:py-2 bg-black text-white font-semibold rounded-full cursor-pointer dark:bg-blue-600 dark:text-white hover:bg-gray-800 transition shadow-md"
      />
    </div>
  );
};

export default Paginator;
