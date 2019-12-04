import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;


    constructor(props) {
        super(props);
        this.state = {
            table: [],
            loading: true,
            name: "",
            patronymic: "",
            surname: "",
            comment: "",
            id: ""
        };
        this.NameChange = this.NameChange.bind(this);
        this.SurnameChange = this.SurnameChange.bind(this);
        this.PatronymicChange = this.PatronymicChange.bind(this);
        this.IdChange = this.IdChange.bind(this);
        this.CommentChange = this.CommentChange.bind(this);
        this.PeopleCreate = this.PeopleCreate.bind(this);
        this.PeopleUpdate = this.PeopleUpdate.bind(this);
        this.PeopleDelete = this.PeopleDelete.bind(this);
    }


    NameChange(event) {
        this.setState({ name: event.target.value });
    }
    SurnameChange(event) {
        this.setState({ surname: event.target.value });
    }
    PatronymicChange(event) {
        this.setState({ patronymic: event.target.value });
    }
    CommentChange(event) {
        this.setState({ comment: event.target.value });
    }
    IdChange(event) {
        this.setState({ id: event.target.value });
    }

    componentDidMount() {
        // Fetch тут
        fetch("People/Index")
            .then((response) => response.json())
            .then((response) => {
                this.setState({ table: response });
                this.setState({ loading: false });
            })

    }

    PeopleCreate() {
        fetch("People/PeopleCreate?Name=" + this.state.name + "&Patronymic=" + this.state.patronymic + "&Surname=" + this.state.surname + "&Comment=" + this.state.comment)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ table: response });
                this.setState({ loading: false });
            })
    }
    PeopleUpdate() {
        fetch("People/PeopleUpdate?Name=" + this.state.name + "&Patronymic=" + this.state.patronymic + "&Surname=" + this.state.surname + "&Comment=" + this.state.comment + "&Id=" + this.state.id)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ table: response });
                this.setState({ loading: false });
            })
    }
    PeopleDelete() {
        fetch("People/PeopleDelete?Id=" + this.state.id)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ table: response });
                this.setState({ loading: false });
            })
    }

    static renderPeoplesTable(state, NameChange, SurnameChange, PatronymicChange, CommentChange, IdChange) {
        return (
            <table className='table table-striped text-light' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Коммент</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" className="form-control bg-secondary text-light" value={state.id} onChange={IdChange} /></td>
                        <td><input type="text" className="form-control bg-secondary text-light" value={state.surname} onChange={SurnameChange} /></td>
                        <td><input type="text" className="form-control bg-secondary text-light" value={state.name} onChange={NameChange} /></td>
                        <td><input type="text" className="form-control bg-secondary text-light" value={state.patronymic} onChange={PatronymicChange} /></td>
                        <td><input type="text" className="form-control bg-secondary text-light" value={state.comment} onChange={CommentChange} /></td>
                    </tr>
                    {state.table.map(tab =>
                        <tr key={tab.idPeoples}>
                            <td>{tab.idPeoples}</td>
                            <td>{tab.surname}</td>
                            <td>{tab.name}</td>
                            <td>{tab.patronymic}</td>
                            <td>{tab.comment}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let WriteTable = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderPeoplesTable(this.state, this.NameChange, this.SurnameChange, this.PatronymicChange, this.CommentChange, this.IdChange);

        return (


            <div >
                <div>
                    <div className="btn-group " >
                        <button className="btn btn-primary" onClick={this.PeopleCreate}>Create</button>
                        <button className="btn btn-success" onClick={this.PeopleUpdate}>Update</button>
                        <button className="btn btn-danger" onClick={this.PeopleDelete}>Delete</button>
                    </div>
                </div>
                <h1 id="tabelLabel" >People table</h1>
                {WriteTable}
            </div>
            //<div>
            //  <h1>Hello, world!</h1>
            //  <p>Welcome to your new single-page application, built with:</p>
            //  <ul>
            //    <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
            //    <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
            //    <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
            //  </ul>
            //  <p>To help you get started, we have also set up:</p>
            //  <ul>
            //    <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
            //    <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
            //    <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
            //  </ul>
            //  <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
            //</div>
        );
    }
}
