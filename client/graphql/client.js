import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import cookie from 'cookie'

export const httpLink = createHttpLink({
  uri: '/graphql',
})

export const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-CSRFToken': cookie.parse(document.cookie).csrftoken,
    },
  }
})

export const client = new ApolloClient({
  uri: '/graphql',
  connectToDevTools: true,
  ssrMode: false, // Disables forceFetch on the server (so queries are only run once)
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false }),
})
