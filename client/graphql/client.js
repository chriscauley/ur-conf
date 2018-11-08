import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import cookie from 'cookie'

export const Client = (uri = '/graphql') => {
  const httpLink = createHttpLink({
    uri: uri,
  })
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      'X-CSRFToken': cookie.parse(document.cookie).csrftoken,
    },
  }))

  return new ApolloClient({
    uri: uri,
    connectToDevTools: true,
    ssrMode: false, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({ addTypename: false }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })
}
