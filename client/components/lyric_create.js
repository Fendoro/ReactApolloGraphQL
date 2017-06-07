import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import query from "../queries/fetch_song";

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        }
    }

    formSubmit(event) {
        event.preventDefault();
        const { songId } = this.props;
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: songId
            }
        }).then(() => {
            this.setState({
                content: ""
            })
        });
    }

    render() {
        return (
            <form onSubmit={this.formSubmit.bind(this)}>
                <label htmlFor="">Add a Lyric</label>
                <input
                    value={this.state.content}
                    onChange={event => this.setState({
                        content: event.target.value
                    })} />
                <button
                    className="btn waves-effect waves-light"
                    action="submit">Add
                        <i className="material-icons right">send</i>
                </button>
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;


export default graphql(mutation)(LyricCreate);