import React, { useEffect, useState, useMemo} from "react";
import TableHeader from './DataTable/Header/headerIndex'
import Pagination from './DataTable/Pagination/pageIndex'
import Search from './DataTable/Search/searchIndex';
import axios from 'axios'
import { Button, Paper} from "@material-ui/core";

const TableStyle ={
    marginTop : 20,
    marginLeft : 50,
    marginRight: 50
}

const marginTop = {
    paddingTop : 20,
    marginLeft: 20
}

const SortedTable = () => {
    const [contacts, setContacts] = useState([]);
    //const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 50;

    const headers = [
        { name: " ", field: "id", sortable: false },
        { name: "Full name" , field: "contact_fullname", sortable: true, filter : true},
        { name: "Address", field: "contact_address", sortable: true },
        { name: "Mobile Phone", field: "contact_mobile_phone", sortable: false },
        { name: "Telephone", field: "contact_telephone", sortable: false },
        { name: "City", field: "contact_city", sortable: true },
        { name: "Postal Code", field: "contact_postal_code", sortable: false },
        { name: "Country", field: "contact_country", sortable: false },
        { name: " ", field: null}

    ];
    
    const URL = 'http://localhost:5000/contacts/';


        useEffect(() => {
            getData()
        }, [])

        const getData = async () => {

            const response = await axios.get(URL)
            setContacts(response.data)
        }
    
        const removeData = (id) => {
            
            if ( window.confirm(
                'Do you want to delete this contact this contact permanently?'
            )){

            axios.post('http://localhost:5000/contacts/delete/id').then(res => {
                const del = contacts.filter(contact => id !== contact.id)
                setContacts(del)
            })
            window.location.reload()
            }
        }
    
    const contactsData = useMemo(() => {

        let theseContacts = contacts;

        if (search) {
            theseContacts = theseContacts.filter(
                contact =>
                    contact.contact_fullname.toLowerCase().includes(search.toLowerCase()) ||
                    contact.contact_address.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(theseContacts.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            theseContacts = theseContacts.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return theseContacts.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [contacts, currentPage, search, sorting]);

    return (
        <div style={TableStyle}>
        <Paper>
            <div>
                <h4 style={marginTop}>
                     Phonebook Details
                </h4>
                <div>
                    <br/>
                </div>
            </div>
            <div>
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6 d-flex ">
                            <Search
                                onSearch={(value) => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        </div>
                        <div>
                            <br/>
                        </div>
                        <div className="col-md-6 d-flex ">
                            <h7 style={{marginBottom : 10}}>Or sort by clicking Fullname or Address below:</h7>
                        </div>
                    <table className="table table-striped">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                            {contactsData.map(contact => (
                                <tr>
                                    <th scope="row" key={contact.id}>
                                        {contact.id}
                                    </th>
                                    <td>{contact.contact_fullname}</td>
                                    <td>{contact.contact_address}</td>
                                    <td>0{contact.contact_mobile_phone}</td>
                                    <td>0{contact.contact_telephone}</td>
                                    <td>{contact.contact_city}</td>
                                    <td>{contact.contact_postal_code}</td>
                                    <td>{contact.contact_country}</td>
                                    <td>
                                    <Button variant ="outlined" color="primary" href = {'/edit/' + contact.id}>Edit</Button> |
                                    <Button variant="outlined" color="secondary" className='button' onClick={() => removeData(contact.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="container">
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                </div>
            </div>
            </Paper>
        </div>
    );
}

export default SortedTable

