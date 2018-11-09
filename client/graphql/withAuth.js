import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import cookie from 'cookie'

const rootQuery = gql`
  {
    user {
      id
      username
      email
      userachievementSet {
        achievement {
          title
          description
          className
          order
          id
        }
      }
    }
    talkvotes {
      vote
      talkId
    }
    talkattendances {
      talkId
    }
  }
`

export const withAuth = graphql(rootQuery, {
  props: ({ data }) => {
    return {
      auth: {
        ...data,
        logout: () => {
          return fetch('/api/logout/', { method: 'GET' }).then(data.refetch)
        },
        login: ({ formData }) => {
          return fetch('/api/login/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-CSRFToken': cookie.parse(document.cookie).csrftoken,
            },
            body: JSON.stringify(formData),
          }).then(raw => {
            if (raw.status === 200) {
              data.refetch()
              return 'Success'
            } else {
              throw 'Wrong username or password'
            }
          })
        },
      },
    }
  },
  options: {
    fetchPolicy: 'cache-first',
  },
})
