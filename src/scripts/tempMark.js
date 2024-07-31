export function tempMark(deg) {
  if (deg < 0) return deg + '\u00B0'
  else return '+' + deg + '\u00B0'
}
