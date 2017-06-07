import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import "./style/style.css";
import SongList from "./components/song_list";
import App from "./components/app";
import SongCreate from "./components/song_create";
import SongDetail from "./components/song_detail";

const client = new ApolloClient({
  dataIdFromObject: obj => obj.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
