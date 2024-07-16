import ReactPaginate from "react-paginate";

type Props = {
  handlePagination: (value: number) => void;
  total: number;
  activePage: number;
};

const Pagination = (props: Props) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={(e) => props.handlePagination(e.selected + 1)}
      pageRangeDisplayed={3}
      pageCount={props.total}
      previousLabel="< previous"
      pageLinkClassName="border rounded-md bg-gray-300 font-bold flex justify-center items-center w-[40px] h-full text-xs"
      previousLinkClassName="text-xs flex justify-center items-center py-2 px-5 border-primary-500 border-[1px] text-[#053DF4] rounded-md font-bold mr-2"
      nextLinkClassName="text-xs flex justify-center items-center py-2 px-5 border-primary-500 border-[1px] text-[#053DF4] rounded-md font-bold ml-2"
      breakClassName="text-off-gray"
      containerClassName="flex"
      forcePage={props.activePage - 1}
      activeLinkClassName="text-white font-bold rounded-md flex justify-center items-center px-3 border bg-primary-500"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
