const fs = require('fs')
const join = require('path').join

export const readJson = (filePath: string, callback: (json: object) => void): void => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      callback({})
    } else {
      callback(JSON.parse(data))
    }
  })
}
