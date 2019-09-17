import React from 'react'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const loadingWrapper = Component => props => {
  if (props.data.loading) {
    return 'Loading'
  } else if (props.data.error) {
    return 'An unknown error occurred: ' + props.data.error
  } else {
    return <Component {...props} />
  }
}

export default (query, Component) =>
  graphql(gql(query), {})(loadingWrapper(Component))
