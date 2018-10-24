import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";


export const LoginRequired = (props) => (
  <Query query={gql`{
    user {
      id,
      talkvoteSet { id }
    }
  }`}>
    {(auth) => {

      if (auth.loading) return <p>Loading...</p>;
      if (auth.error) {
        if (auth.error.message.indexOf("AnonymousUser") !== -1) {
          return <p>Not Logged In</p>;
        }
        throw auth.error
      }
      return (Array.isArray(props.children)?props.children:[props.children]).map( (child,i) => (
        React.cloneElement(child, {auth, key:i})
      ));
    } }
  </Query>
)