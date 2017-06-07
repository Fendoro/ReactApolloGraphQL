import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetch_song";
import LyricCreate from "./lyric_create";
import LyricList from "./lyric_list";

class SongDetail extends Component {
    render() {
        if (this.props.data.loading) {
            return (
                <div>Loading...</div>
            );
        }
        const { song } = this.props.data;
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        );
    }
}

export default graphql(query, {
    options: (props) => {
        return {
            variables: {
                id: props.params.id
            }
        }
    }
})(SongDetail);