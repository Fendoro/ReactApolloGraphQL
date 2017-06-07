import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";

import query from "../queries/fetch_songs";

class SongCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ""
        }
    }

    formSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{
                query
            }]
        }).then(() => {
            hashHistory.push("/");
        });
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a New Song</h3>
                <form onSubmit={this.formSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input
                        value={this.state.title}
                        onChange={event => this.setState({
                            title: event.target.value
                        })} />
                    <button
                        className="btn waves-effect waves-light"
                        action="submit">Create
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        );
    }
}
const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title){
            id
        }
    }
`;

export default graphql(mutation)(SongCreate);