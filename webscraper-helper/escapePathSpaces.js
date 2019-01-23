function replacePathSpaces(path) {
  // escapes spaces
  return path.replace(/(\s+)/g, "\\$1");
}
module.exports = replacePathSpaces;
