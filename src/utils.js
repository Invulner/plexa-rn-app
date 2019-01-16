const getInitials = (name) => {
  let initials = name.split(/\s/).reduce((acc, cur) => acc += cur.slice(0,1), '')
  return initials
}

export default {
  getInitials
}
