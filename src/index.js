module.exports = function check(str, bracketsConfig) {
  var arr = [];
  for (var char of str) {
    var sign = {};

    for (var i = 0, l = bracketsConfig.length; i < l; i++) {
      if (char === bracketsConfig[i][0]) {
        sign.value = char;
        sign.opened = true;
        sign.closer = bracketsConfig[i][1];

        if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
          sign.special = i;
        }

      } else if (char === bracketsConfig[i][1]) {
        sign.value = char;
        sign.opened = false;
      }
    }

    if (arr.length !== 0) {
      if (sign.special === arr[arr.length - 1].special && sign.special !== undefined) {
        arr.pop();
        continue;
      }
    }

    if (sign.opened) {
      arr.push(sign);
    } else if (arr.length === 0) {
      return false;
    } else if (sign.value === arr[arr.length - 1].closer) {
      arr.pop();
    } else {
      return false;
    }
  }

  return arr.length === 0;
}