import querystring from "querystring";

export const loadData = () => {
  const query = `{
    talks {
      id,
      title,
      authors { id }
    },
    authors {
      id,
      name,
      contactInfo,
    }
    talkvotes {
      id
    }
  }`;
  const url = "/graphql?"+querystring.stringify({query: query});
  return fetch(url).then(r=>r.json())
}
