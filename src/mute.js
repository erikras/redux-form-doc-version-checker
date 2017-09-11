import cookies from 'js-cookie'

const key = 'reduxFormDocCheckMute'

export function isMuted() {
  return !!cookies.get(key)
}

export function mute(days) {
  cookies.set(key, true, { expires: days, path: '/' })
}
