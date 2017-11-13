const cloudResource = require('./cloud-resource-library')

const resource = (configuration) => {
    return cloudResource(configuration)
}

const tag = (configuration) => (tagName) => {
    return {
        lock, // true/false, is this tag locked
        sessionVariables // update the session variables for this tag
    }
}

const projectOperations = (configuration) => (operation) => {
    return {
        resource, // creates a new tag using the `config.core-io.json` file
        tag // gets reference to a particular tag version of the project
    }[operation](configuration)
}

module.exports = (projectConfiguration) => {

    // authenticate the user using configuration.project
    let isAuthenticated = true;

    let cloudAccessCredentials = require('./../test-credentials.json') // {aws:{}, gcp:{}}

    return isAuthenticated ? projectOperations({projectConfiguration, cloudAccessCredentials}) : Error('Not authenticated to access this project')
}
// (/* project config */)()