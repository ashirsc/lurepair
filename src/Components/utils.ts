export function makeid(length: 6) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const sleep = async (millis: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, millis);
  });
};
