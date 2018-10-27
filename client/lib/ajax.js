import querystring from 'querystring'
import cookie from 'cookie-parse'

export const loadData = () => {
  const query = `{
    talks {
      id,
      title,
      authors { id },
      roomId,
      timeslotId,
    },
    authors {
      id,
      name,
      contactInfo,
    },
    talkvotes {
      vote,
      talkId,
    },
    rooms {
      id,
      name,
    },
    timeslots {
      id,
      datetime,
    }
  }`
  const url = '/graphql?' + querystring.stringify({ query: query })
  return fetch(url).then(r => r.json())
}

export const post = (url, formData) =>
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': cookie.parse(document.cookie).csrftoken,
    },
    body: JSON.stringify(formData),
  })
