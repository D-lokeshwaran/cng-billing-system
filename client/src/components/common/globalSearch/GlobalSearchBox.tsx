import React, { useState } from "react";
import { Search01Icon, Settings01Icon, Calendar04Icon } from 'hugeicons-react';
import { Dropdown, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FlexBox from "src/components/common/FlexBox";
import SearchBoxInput from "src/components/common/SearchBoxInput";
import moment from "moment";
import { coreApi } from "src/utils/api";
import { useToggle, useRouter } from "src/hooks";
import SearchMenu from "./SearchMenu";
import SearchResultItems from "./SearchResultItems";

const SearchBox = React.forwardRef(
    ({ children, onClick, 'aria-expanded': active }, ref) => (
    <div
        id="global-search-container"
        className="p-2 d-flex align-items-center"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <Search01Icon/>
        {children}
    </div>
));

const GlobalSearchBox = () => {
    const [ value, setValue ] = useState("");
    const [ searchResult, setSearchResult ] = useState();
    const [ addons, setAddons ] = useState();
    const [ showMenu, setMenu ] = useState(false);

    const handleSearch = async (value) => {
        setValue(value);
        if (value) {
            await coreApi.get(`/cng/global-search/${value}`)
                .then(res => setSearchResult(res.data))
                .catch(error => console.log(error));
        }
    }

    const handleAddons = async (nextShow: boolean) => {
        if (nextShow == false) {
            const todayTariff = await coreApi.get("/cng/tariffs/search/findTodayTariff");
            setAddons({...addons, todayTariffId: todayTariff.data.id });
        }
    }

    return (
        <Dropdown
            id="global-search"
            onToggle={handleAddons}
        >
            <Dropdown.Toggle as={SearchBox}>
                <SearchBoxInput
                    id="global-search-input"
                    className="border-0"
                    initialValue={value}
                    onChange={handleSearch}
                    autoComplete="off"
                    type="text"
                />
            </Dropdown.Toggle>
            <Dropdown.Menu
                as={SearchMenu}
                style={{ width: "30rem"}}
                value={value}
                addons={addons}
            >
                <SearchResultItems searchResult={searchResult}/>
            </Dropdown.Menu>
        </Dropdown>
    )

}
export default GlobalSearchBox;