import * as pckg from './../../../package.json'
const electron = require('electron')
const fs = require('fs')
const path = require('path')

export function createLocalStore () {
  const { version, name, author, email } = pckg
  return new LocalStore('ivTimer', { status: 'create', version, name, author, email })
}

export default class LocalStore {
  constructor (filename, data) {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData'
    )
    console.log(userDataPath)
    this.path = path.join(userDataPath, filename + '.json')
    this.data = parseDataFile(this.path, data)
  }

  get (key) {
    return this.data[key]
  }

  set (key, val) {
    this.data[key] = val
    fs.writeFileSync(this.path, JSON.stringify(this.data), err => {
      if (err) {
        console.log(err)
      }
    })
  }
}

function parseDataFile (filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch (error) {
    return defaults
  }
}
