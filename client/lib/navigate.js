import { navigate } from '@reach/router'

export default (...args) => {
  const el = document.querySelector('[role="group"]')
  el && el.scrollTo(0, 0)
  navigate(...args)
}
