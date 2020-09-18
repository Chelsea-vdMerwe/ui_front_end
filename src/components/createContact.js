import React, { Component } from 'react'
import axios from 'axios'
import { Button, Paper } from '@material-ui/core';

export default class CreateContact extends Component{

    
    constructor(props) {
        super(props);

        this.onChangeContactFullname = this.onChangeContactFullname.bind(this);
        this.onChangeContactAddress = this.onChangeContactAddress.bind(this);
        this.onChangeContactMobilePhone = this.onChangeContactMobilePhone.bind(this);
        this.onChangeContactTelephone = this.onChangeContactTelephone.bind(this);
        this.onChangeContactCity = this.onChangeContactCity.bind(this);
        this.onChangeContactPostalCode = this.onChangeContactPostalCode.bind(this);
        this.onChangeContactCountry = this.onChangeContactCountry.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            contact_fullname : '',
            contact_address : '',
            contact_mobile_phone : '',
            contact_telephone: '',
            contact_city: '',
            contact_postal_code: '',
            contact_country: ''
            }
    }

    onChangeContactFullname(e) {
        this.setState({
            contact_fullname: e.target.value
        });
    } 
    
    onChangeContactMobilePhone(e) {
        this.setState({
            contact_mobile_phone : e.target.value
        });
    }

    onChangeContactAddress(e) {
        this.setState({
            contact_address : e.target.value
        });
    }

    onChangeContactTelephone(e) {
        this.setState({
            contact_telephone : e.target.value
        });
    }

    onChangeContactCity(e) {
        this.setState({
            contact_city : e.target.value
        });
    }

    onChangeContactPostalCode(e) {
        this.setState({
            contact_postal_code : e.target.value
        });
    }

    onChangeContactCountry(e){
        this.setState({
            contact_country : e.target.value
        });
    }

    
    onSubmit(e) {
        e.preventDefault();
        
        const newContact = {
            contact_fullname : this.state.contact_fullname,
            contact_address : this.state.contact_address,
            contact_mobile_phone : this.state.contact_mobile_phone,
            contact_telephone : this.state.contact_telephone,
            contact_city : this.state.contact_city,
            contact_postal_code : this.state.contact_postal_code,
            contact_country : this.state.contact_country
        }

        axios.post('http://localhost:5000/contacts/add', newContact)
        .then(res => console.log(res.data));

        this.setState({
           
            contact_fullname : '',
            contact_address : '',
            contact_mobile_phone : '',
            contact_telephone : '',
            contact_city: '',
            contact_postal_code : '',
            contact_country: ''
            
        })
    }

    render() {

        const TableStyle ={
            marginTop : 20,
            marginLeft : 40,
            marginRight: 50
        }
        
        const marginTop = {
            paddingTop : 20,
            marginLeft: 20
        }        
        
        return(
          <Paper>
            <div className="col-sm-3"  style={TableStyle}>
                <h3>Create new Contact</h3>
                 <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Full name: </label> 
                        <input type="text"
                                className="form-control"
                                value={this.state.contact_fullname}
                                onChange={this.onChangeContactFullname}
                                />
                                <label>Address: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.contact_address}
                                onChange={this.onChangeContactAddress}
                                />
                                <label>Mobile Phone: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.contact_mobile_phone}
                                onChange={this.onChangeContactMobilePhone}
                                />
                                <label>Telephone: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.contact_telephone}
                                onChange={this.onChangeContactTelephone}
                                />
                                <label>City: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.contact_city}
                                onChange={this.onChangeContactCity}
                                />
                                <label>Postal Code: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.contact_postal_code}
                                onChange={this.onChangeContactPostalCode}
                                />
                                <label>Country: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.contact_country}
                                onChange={this.onChangeContactCountry}
                                />
                    </div>
                    <div className="form-group" style={{paddingBottom : 20}}>
                        <Button variant ="outlined" color="primary" type="submit" value="Create Contact" >
                            Create Contact
                       </Button>
                       <Button  variant="outlined" 
                                color="secondary"  
                                type="button" 
                                value="Cancel"  
                                style={{marginLeft : 20}}
                                onClick={() =>  {this.props.history.push('/')}}>
                            Cancel
                       </Button >
                    </div>
                 </form>
             </div>
          </Paper>
        )
    }
}