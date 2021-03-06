const uuid = require('uuid'),
      getTag = require('./../getTag')

module.exports = ({ fingerprint, req }, cloudLibrary, database) => {

    return getTag({ fingerprint, req }, cloudLibrary, database)
            .then(tag => cloudLibrary(tag.configuration)('deploy', tag.title, {
                  uploads: { ...req.files },
                  ...req.body
            }))
}

