import { useEffect, useMemo, useState } from "react";
import Pagination from "./usePagination";

const Datatable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { columnsData, rowsData } = props;
  const [filteredData, setFilteredData] = useState(rowsData);
  const [searchVal, setSearchVal] = useState("");
  const tableHeaders = (
    <tr>
      {columnsData.map((col) => (
        <th>{col} </th>
      ))}
    </tr>
  );

  const currentTableData = useMemo(() => {
    const firstPageIdx = (currentPage - 1) * itemsPerPage;
    const lastPageIdx = firstPageIdx + itemsPerPage;
    return filteredData.slice(firstPageIdx, lastPageIdx);
  }, [currentPage, filteredData]);

  const sortTableData = (key) =>
    rowsData.sort((obj1, obj2) => {
      return obj1[key]
        .toString()
        .toLowerCase()
        .localeCompare(obj2[key].toString().toLowerCase(), "en", {
          numeric: true
        });
    });

  useEffect(() => {
    sortTableData("first_name");
  }, [rowsData]);

  const tableBody = currentTableData.map((row) => {
    return (
      <tr>
        {columnsData.map((col) => (
          <td>{row[col]}</td>
        ))}
      </tr>
    );
  });

  const searchChangeHandler = (e) => {
    let resultData = rowsData.filter(
      (data) => data.first_name.indexOf(e.target.value) > -1
    );
    setSearchVal(e.target.value);
    setFilteredData(resultData);
  };

  return (
    <>
      <input type="text" value={searchVal} onChange={searchChangeHandler} />
      <table className="table table-bordered table-hover">
        <thead>{tableHeaders}</thead>
        <tbody>{tableBody}</tbody>
      </table>
      <Pagination
        data={filteredData}
        pageNumberLimit={10}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Datatable;
