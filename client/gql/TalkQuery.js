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
      if (autherror) return <p>Error!</p>;
      return props.children
    } }
  </Query>
)