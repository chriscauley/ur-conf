import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";


export const TalkQuery = (props) => (
  <Query query={gql`{
    talks {
      title,
      datetime,
    }
  }`}>
    {(talk_query) => {
      if (talk_query.loading) return <p>Loading...</p>;
      if (talk_query.error) {
        return <p>An unknown error has occurred</p>
      }
      const children = (Array.isArray(props.children)?props.children:[props.children]);
      return children.map( (child,i) => (
        React.cloneElement(child, {talk_query, key:i})
      ));
    } }
  </Query>
)