import React, { Component } from 'react';
import './App.css';
import { request } from 'http';

interface Props {}
interface State {
  employee: Array<any>
}
export class App extends React.Component<Props, State> {
  userId = 'ADDC403C803F4FA0BB4ECD8778CF16FF';
  password: any = '74129DF';
  url = "http://challenge.schema.rocks/swagger/docs/v1";

  private _options = {
    url: this.url + '?userId=' + this.userId,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: {
      'grant_type': 'password',
      'username': this.userId,
      'password': this.password
    }
  };
  public get options() {
    return this._options;
  }
  public set options(value) {
    this._options = value;
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      employee: []
    };
  }

  componentDidMount() {
    fetch(this._options.url)
      .then(results => { 
        return results.json(); 
      })
      .then(data => {
          let employees = data.results;
          employees.map((emp: any) => {
            return(
              <tr>
                <td>{emp['Name']} {emp.Surname}</td>
              </tr>
            )
          })
          this.setState({employee: employees});
        })
  }

  render() {
    
    return (
      <div className="App">
        <header className="container-fluid">
        <table>
            <thead>
              <th>Id</th>
              <th>Name</th>
              <th>Surname</th>
            </thead>

            <tbody>
              <tr>
              {this.state.employee}
              </tr>
            </tbody>
          </table>
        </header>
      </div>
    )     
    
  }

}

export default App;