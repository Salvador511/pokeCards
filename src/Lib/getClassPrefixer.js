const getClassPrefixer = rawPrefix => {
  const prefix = rawPrefix.replace(/\W+/g, '')
  return new Proxy({}, {
    get: (target, prop) => {
      target[prop] ??= `${prefix}-${prop}`
      return target[prop]
    }
  })
}

export default getClassPrefixer

// const encrypt = ({ text, steps }) =>{
//   const encryptedText = text.split('').map(char => {
//       const charCode = char.charCodeAt(0)
//       if (char >= 'A' && char <= 'Z') {
//         return String.fromCharCode(((charCode - 65 + steps + 26) % 26) + 65)
//       }else if (char >= 'a' && char <= 'z') {
//         return String.fromCharCode(((charCode - 97 + steps + 26) % 26) + 97)
//       }
//       return char
//     }).join('')
//   return encryptedText
// }

// console.log(encrypt({ text: 'z', steps: 2 }))