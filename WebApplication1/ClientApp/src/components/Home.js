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
            id: "",
            isEdit: false,
            editId: ""
        };
        this.NameChange = this.NameChange.bind(this);
        this.SurnameChange = this.SurnameChange.bind(this);
        this.PatronymicChange = this.PatronymicChange.bind(this);
        this.IdChange = this.IdChange.bind(this);
        this.CommentChange = this.CommentChange.bind(this);
        this.PeopleCreate = this.PeopleCreate.bind(this);
        this.PeopleUpdate = this.PeopleUpdate.bind(this);
        this.PeopleDelete = this.PeopleDelete.bind(this);
        this.DeleteProb = this.DeleteProb.bind(this);
        this.UpdateProb = this.UpdateProb.bind(this);
        this.UpdateStop = this.UpdateStop.bind(this);
    }

    ClearInput(){
    this.setState({ surname: "" });
    this.setState({ name: "" });
    this.setState({ patronymic: "" });
    this.setState({ comment: "" }); }

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

    DeleteProb(event) {
        fetch("People/PeopleDelete?Id=" + event.target.value)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ table: response });
                this.setState({ loading: false });
            })
    }

    UpdateProb(idpeople,surname,name,patronymic,comment) {
        this.setState({ isEdit: true });
        this.setState({ editId: idpeople });
        this.setState({ surname: surname });
        this.setState({ name: name });
        this.setState({ patronymic: patronymic });
        this.setState({ comment: comment });
    }

    UpdateStop() {
        this.ClearInput();
        this.setState({ isEdit: false });
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
                this.ClearInput();
                this.setState({ isEdit: false });
            })
    }
    PeopleUpdate(event) {
        fetch("People/PeopleUpdate?Name=" + this.state.name + "&Patronymic=" + this.state.patronymic + "&Surname=" + this.state.surname + "&Comment=" + this.state.comment + "&Id=" + event.target.value)
            .then((response) => response.json())
            .then((response) => {
                this.setState({ table: response });
                this.setState({ loading: false });
                this.setState({ isEdit: false });
                this.ClearInput();
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

    static renderPeoplesTable(state, NameChange, SurnameChange, PatronymicChange, CommentChange, IdChange, DeleteProb, UpdateProb, UpdateStop, PeopleUpdate, PeopleCreate) {
        return (
            <table className='table table-striped text-light' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Коммент</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" className="form-control bg-secondary text-light" value={state.surname} onChange={SurnameChange} /></td>
                        <td><input type="text" className="form-control bg-secondary text-light" value={state.name} onChange={NameChange} /></td>
                        <td><input type="text" className="form-control bg-secondary text-light" value={state.patronymic} onChange={PatronymicChange} /></td>
                        <td><input type="text" className="form-control bg-secondary text-light" value={state.comment} onChange={CommentChange} /></td>
                        <td><button className="btn btn-primary" onClick={PeopleCreate}>&#10010;</button></td>
                    </tr>
                    {state.table.map(tab =>
                        <tr key={tab.idPeoples}>
                            <td>{state.isEdit && state.editId == tab.idPeoples ? <input type="text" className="form-control bg-secondary text-light" value={state.surname} onChange={SurnameChange} /> : <span>{tab.surname}</span>}</td>
                            <td>{state.isEdit && state.editId == tab.idPeoples ? <input type="text" className="form-control bg-secondary text-light" value={state.name} onChange={NameChange} /> : <span>{tab.name}</span>}</td>
                            <td>{state.isEdit && state.editId == tab.idPeoples ? <input type="text" className="form-control bg-secondary text-light" value={state.patronymic} onChange={PatronymicChange} /> : <span>{tab.patronymic}</span>}</td>
                            <td>{state.isEdit && state.editId == tab.idPeoples ? <input type="text" className="form-control bg-secondary text-light" value={state.comment} onChange={CommentChange} /> : <span>{tab.comment}</span>}</td>
                            <td>
                                <div>
                                    {state.isEdit && state.editId == tab.idPeoples ?
                                        <div className="btn-group"><button className="btn btn-success" value={tab.idPeoples} onClick={PeopleUpdate}>&#10148;</button>
                                            <button className="btn btn-warning" onClick={UpdateStop}>&#10008;</button></div>
                                        : <div className="btn-group"><button className="btn btn-info" onClick={UpdateProb.bind(this, tab.idPeoples, tab.surname, tab.name, tab.patronymic, tab.comment)}>&#10001;</button>
                                            <button value={tab.idPeoples} className="btn btn-danger" onClick={DeleteProb}>&#10008;</button></div>}
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let WriteTable = this.state.loading
            ? <p><em>Loading...</em></p>
            : Home.renderPeoplesTable(this.state, this.NameChange, this.SurnameChange, this.PatronymicChange, this.CommentChange, this.IdChange, this.DeleteProb, this.UpdateProb, this.UpdateStop, this.PeopleUpdate, this.PeopleCreate);

        return (


            <div >
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
