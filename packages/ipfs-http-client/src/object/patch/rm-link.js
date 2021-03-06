'use strict'

const { Buffer } = require('buffer')
const CID = require('cids')
const configure = require('../../lib/configure')

module.exports = configure(api => {
  return async (cid, dLink, options = {}) => {
    const searchParams = new URLSearchParams(options)
    searchParams.append('arg', `${Buffer.isBuffer(cid) ? new CID(cid) : cid}`)
    searchParams.append('arg', dLink.Name || dLink.name || null)

    const { Hash } = await (await api.post('object/patch/rm-link', {
      timeout: options.timeout,
      signal: options.signal,
      searchParams
    })).json()

    return new CID(Hash)
  }
})
