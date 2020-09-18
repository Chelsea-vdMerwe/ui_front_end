import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Contact = props => (
    <tr>
        <td>{props.contact.contact_fullname}</td>
        <td>{props.contact.contact_address}</td>
        <td>{props.contact.contact_mobile_phone}</td>
        <td>{props.contact.contact_telephone}</td>
        <td>{props.contact.contact_city}</td>
        <td>{props.contact.contact_postal_code}</td>
        <td>{props.contact.contact_city}</td>
        <td>
            <Link to={"/edit/"+ props.contact._id}>Edit</Link>
        </td>
    </tr>
)

export default class ContactList extends Component{


    constructor(props){
        super(props);
        this.state = {contacts : []};
    }

    //to retrieve data from the db
    componentDidMount(){
        axios.get('http://localhost:5000/contacts/')
        .then(response => {
            this.setState({contacts: response.data})
        } )
        .catch(function (error){
            console.log(error);
        })

    }

    componentDidUpdate(){
        axios.get('http://localhost:5000/contacts/')
        .then(response => {
            this.setState({contacts: response.data})
        } )
        .catch(function (error){
            console.log(error);
        })

    }

    contactList(){
        return this.state.contacts.map(function(currentContact, i){
            return <Contact contact={currentContact} key={i} />
        });
    }

    render() {

        
        return(
            <table className ="table table-striped" 
                   style={{marginTop : 20}}
                   sortBy={this.sortBy}>
                <thead>
                    <tr>
                        <th>
                            Full name
                        </th>
                        <th>
                            Address
                        </th>
                        <th>
                            Mobile Phone
                        </th>
                        <th>
                            Telephone
                        </th>
                        <th>
                            City
                        </th>
                        <th>
                            Postal Code
                        </th>
                        <th>
                            Country
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.contactList() }
                </tbody>

            </table>
        )
    }
}