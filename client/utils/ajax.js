import querystring from "querystring";
import cookie from "cookie-parse";

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
      vote,
      talkId,
    }
  }`;
  const url = "/graphql?"+querystring.stringify({query: query});
  return fetch(url).then(r=>r.json())
}



export const post = (url,data) => {
  data.csrfmiddlewaretoken = cookie.parse(document.cookie).csrftoken;

  const formData = new FormData();
  for (let key in data) {
    formData.append(key,data[key]);
  }
  return fetch(url, {
    method: "POST",
    body: formData,
  })
}
