
import React, { Component } from 'react';

class AdminDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.renderAdminDashboard = this.renderAdminDashboard.bind(this);
  }
  componentDidMount() {
    this.renderAdminDashboard();
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  deleteUser(event) {
    event.preventDefault();
    const target = event.target;
    const id = target.id;

    fetch('http://localhost:8050/users',
      {
        method: 'DELETE'
      })
      .then(response => {
        this.renderAdminDashboard();
      })
  }
  componentWillMount(){
  }


  renderAdminDashboard() {
    fetch('http://localhost:8050/users',
      {
        method: 'GET'
      })
      .then(results => { //results is a an object
        results.json() //results.json is a Promise Object
          .then((data) => {  //Once you get the Promise done you can extract the data
            this.setState({
              list: data
            })
            console.log(data)
          })
     })
  }
  render() {
    
    return (
      

      <div className="col-lg-12">
        <h1>Admin Dashboard</h1>
        <div className="table-responsive dash">
          <table className="table table-striped table-responsive">
            <thead className="thead-inverse">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>School</th>
                <th>Shirt Size</th>
              </tr>
            </thead>
            <tbody>
              {/* Begin loop */} 
              {this.state.list.map((list, index) => {(
                <tr key={list._id}>
                  <td  key={list._id}>{index+1}</td>
                  <td  key={list._id}>{list.name}</td>
                  <td  key={list._id}>{list.email}</td>
                  <td  key={list._id}>{list.school}</td>
                  <td  key={list._id}>{list.size}</td>
                  <td>
                    <button id={list._id} onClick={this.deleteUser} className="btn btn-danger">Delete User</button>
                  </td>
                </tr>
              )}
            )}
              {/* end Loop */}
            </tbody>
          </table>

       
        </div>
      </div>
    )
  }
}

export default AdminDashboard;


