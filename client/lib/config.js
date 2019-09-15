let ls
try {
  const { localStorage } = window
  const key = '__some_random_key_you_are_not_going_to_use__'
  localStorage.setItem(key, key)
  localStorage.removeItem(key)
  ls = localStorage
} catch (e) {
  console.warn('window.localStorage DNE')
}

export default {
  _data: {},
  setItem: function(id, val) {
    ls && ls.setItem(id, JSON.stringify(val))
    this._data[id] = val
    this.visible && this.visible.forceUpdate()
  },
  getItem: function(id) {
    const value = ls && JSON.parse(ls.getItem(id))
    return this._data[id] || value
  },
  removeItem: function(id) {
    ls && ls.removeItem(id)
    return delete this._data[id]
  },
  clear: function() {
    ls && ls.clear()
    return (this._data = {})
  },
}
