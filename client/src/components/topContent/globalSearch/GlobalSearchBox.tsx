import React, { useState, useRef, useEffect } from "react";
import { Search01Icon, Settings01Icon, Calendar04Icon } from 'hugeicons-react';
import { Button, Modal, Dropdown, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import FlexBox from "src/components/common/FlexBox";
import SearchBoxInput from "src/components/common/SearchBoxInput";
import moment from "moment";
import { coreApi } from "src/utils/api";
import { useToggle, useRouter } from "src/hooks";
import SearchMenu from "./SearchMenu";
import SearchInitialItems from "./SearchInitialItems";
import SearchResultItems from "./SearchResultItems";

const initialEntities = {
    "Bill": false,
    "Customer": false,
    "Tariff": false,
}

const GlobalSearchBox = () => {
    const [ value, setValue ] = useState("");
    const [ entities, setEntities ] = useState(initialEntities);
    const [ searchResult, setSearchResult ] = useState();
    const [ addons, setAddons ] = useState();
    const [ showModel, setModal ] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === "k") {
                setModal(!showModel);
                event.preventDefault();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            return window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    const handleSearch = async (value, entities) => {
        setValue(value);
        const activeEntities = Object.keys(entities).filter(e => entities[e] === true);
        const entitiesLookingFor = activeEntities;
        if (value) {
            await coreApi({
                    url: `/cng/search/${value}`,
                    method: "get",
                    params: {
                        "entities": entitiesLookingFor.toString()
                    }
                })
                .then(res => setSearchResult(res.data))
                .catch(error => console.log(error));
        }
    }

    const handleAddons = async () => {
        const todayTariff = await coreApi.get("/cng/tariffs/search/findTodayTariff");
        setAddons({...addons, todayTariffId: todayTariff.data.id });
    }

    return (
        <div id="global-search">
            <Button
                size="sm"
                variant="none"
                className="button-search"
                aria-label="Search"
                onClick={() => setModal(true)}
            >
                <span className="button-container">
                    <Search01Icon size="20" className="button-icon" />
                    <span className="button-placeholder">Search</span>
                </span>
                <span className="button-keys">
                    <code className="button-key">CTRL</code>
                    <code className="button-key">K</code>
                </span>
            </Button>
            <Modal
                show={showModel}
                onHide={() => setModal(false)}
                onExited={() => {
                    setEntities(initialEntities)
                    setValue("")
                }}
                onEnter={handleAddons}
                className="search-modal"
                size="md"
                contentClassName="search-modal-content"
            >
                <Modal.Header className="p-0">
                    <div className="search-container w-100">
                        <Search01Icon size={20} className="search-icon"/>
                        <SearchBoxInput
                            id="global-search-input"
                            className="search-input border-0"
                            placeholder="Search"
                            value={value}
                            onChange={(val) => handleSearch(val, entities)}
                            autoComplete="off"
                            autoFocus
                            type="text"
                        />
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <Dropdown.Menu show className="w-100 m-0 rounded-0 position-static border-0">
                        <div className="mb-2">
                            <Dropdown.Header>
                                <div className="mb-0  text-md">What are you looking for?</div>
                            </Dropdown.Header>
                            <Dropdown.ItemText>
                                <ListGroup
                                    horizontal
                                    className="list-group-pills"
                                >
                                    {Object.keys(entities)?.map(entity =>
                                        <ListGroup.Item
                                            active={entities?.[entity]}
                                            onClick={() => {
                                                const nextVal = !entities?.[entity];
                                                const nextEntities = { ...entities, [entity]: nextVal };
                                                setEntities(nextEntities);
                                                handleSearch(value, nextEntities)
                                            }}>
                                            {entity}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Dropdown.ItemText>
                        </div>
                        {!value ? <SearchInitialItems
                                className="rounded-top-0"
                                addons={addons}
                                closeMenu={() => setModal(false)}
                            />
                        :   <SearchResultItems
                                searchResult={searchResult}
                                closeMenu={() => setModal(false)}
                            />
                        }
                    </Dropdown.Menu>
                </Modal.Body>
                <Modal.Footer>
                    <span className="close-des">
                        <kdb className="button-key border">Esc</kdb>
                        <span> to Close</span>
                    </span>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default GlobalSearchBox;