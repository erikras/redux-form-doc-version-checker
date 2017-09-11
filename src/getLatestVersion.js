import cookies from 'js-cookie'
import extract from './extract'

const key = 'reduxFormLatestVersion'

export default function getLatestVersion() {
  const fromCookie = cookies.get(key)
  return fromCookie
    ? Promise.resolve(fromCookie)
    : new Promise(resolve => {
        fetch(
          'https://api.github.com/repos/erikras/redux-form/tags'
        ).then(response => {
          response.json().then(tags => {
            tags.some(({ name }) => {
              const latest = extract.tag(name)
              if (latest) {
                resolve(latest)
                cookies.set(key, latest, { expires: 1, path: '/' })
                return true
              } else {
                return false
              }
            })
          })
        })
      })
}
