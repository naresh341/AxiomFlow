import ReactPaginate from "react-paginate";
const Paginator = ({ totalRecords, rows, first, onPageChange }) => {
  const pageCount = Math.ceil(totalRecords / rows);
  const forcePage = Math.floor(first / rows);
  return (
    <div className="flex justify-center mt-6">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Previous"
        pageCount={pageCount}
        forcePage={forcePage}
        onPageChange={(e) => onPageChange(e.selected)}
        containerClassName="flex items-center bg-[#F2F4F7] dark:bg-gray-700 p-2 rounded-full gap-2"
        pageClassName="w-10 h-10 flex items-center justify-center rounded-full dark:bg-white dark:text-black shadow-md text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-200"
        activeClassName="!bg-white  !text-black  shadow-md font-bold dark:bg-white dark:text-black"
        previousClassName="px-4 py-2 text-gray-600 dark:text-gray-400 cursor-pointer dark:bg-black dark:text-white  font-semibold rounded-full border-gray-50 shadow-md"
        nextClassName="px-6 py-2 bg-black text-white font-semibold rounded-full cursor-pointer dark:bg-blue-600 dark:text-white hover:bg-gray-800 transition ml-2 shadow-md"
      />
    </div>
  );
};

export default Paginator;
