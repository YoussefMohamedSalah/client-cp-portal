import { filterData } from "utils/FilterData";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

interface Props {
  data: any[];
  terms?: string[];
  classNameContainer?: Boolean;
  onSearchFilter: (filtered: any[]) => void;
}

const TableSearch: React.FC<Props> = ({ data, terms, classNameContainer, onSearchFilter }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<any[]>([...data] || []);
  const [searchValue, setSearchValue] = useState<string>();
  const [selectedTerm, setSelectedTerm] = useState<string>(terms ? terms[0]! : "name");

  const handleClearFilters = () => {
    setSearchValue("");
    setSelectedTerm(terms ? terms[0]! : "name");
    onSearchFilter(originalData);
  };

  useEffect(() => {
    if (!initialized) {
      setOriginalData([...data]);
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (originalData && searchValue) {
      let filtered = filterData(originalData, selectedTerm, searchValue);
      onSearchFilter(filtered);
    } else if (!searchValue || searchValue?.length! === 0) {
      onSearchFilter(originalData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, selectedTerm]);

  return (
    <>
      <div
        style={{ maxWidth: "40rem" }}
        className={
          classNameContainer
            ? "order-0 col-lg-7 col-md-6 col-sm-6 col-12 mb-0 mb-md-0"
            : "order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-2"
        }>
        <div className="input-group flex-nowrap input-group-lg">
          <button type="button" className="input-group-text" id="addon-wrapping">
            <i className="fa fa-search" />
          </button>
          <input
            type="search"
            className="form-control fs-6"
            placeholder={selectedTerm ? `Search by ${selectedTerm}` : "Search"}
            aria-label="search"
            aria-describedby="addon-wrapping"
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          />
          {terms && (
            <button type="button" className="input-group-text fs-6" id="addon-wrapping">
              <div>
                <Dropdown className="hide-toggle">
                  <Dropdown.Toggle as="a" className="nav-link text-muted">
                    <i className="icofont-filter" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu shadow border-0">
                    {terms?.map((term, index) => (
                      <li key={index}>
                        <span className="dropdown-item" onClick={() => setSelectedTerm(`${term?.toLowerCase()!}`)}>
                          {term?.toUpperCase()!}
                        </span>
                      </li>
                    ))}
                    <li>
                      <span className="dropdown-item bg-danger-subtle" onClick={() => handleClearFilters()}>
                        Clear Filter
                      </span>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default TableSearch;
