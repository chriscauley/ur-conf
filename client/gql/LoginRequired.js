import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const auth_query = gql`{
  user {
    id,
    talkvoteSet { id }
  }
}`


export const LoginRequired = (props) => (
  <Query query={auth_query}>
    {(auth) => {
      if (auth.loading) return <p>Loading...</p>;
      if (auth.error) {
        if (auth.error.message.indexOf("AnonymousUser") !== -1) {
          return props.no_auth || (<p>Not Logged In</p>);
        }
        throw auth.error
      }
      const children = (Array.isArray(props.children)?props.children:[props.children]);
      return children.map( (child,i) => (
        React.cloneElement(child, {auth, key:i})
      ));
    } }
  </Query>
)