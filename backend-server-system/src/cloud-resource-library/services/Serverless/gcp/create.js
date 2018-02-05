const Promise = require('bluebird'), helper = require('./../../../helper')

module.exports = (gcp, configuration, resource, gcpRegion, tagName) => {

    if (gcpRegion !== 'us-central1'){
        throw new Error('GCP cloud functions only supports the Iowa region')
    }

    let { authClient, cloudFunctions } = gcp('CloudFunctions')

    let location = `projects/deployments-project/locations/${gcpRegion}`
    
    let functionId = helper.genId()

    return Promise.fromCallback(function (callback) {

        let params = {
            auth: authClient,
            location,
            resource: {
                name: `${location}/functions/${functionId}`, // change name of function from helloWorld
                entryPoint: 'main',
                sourceArchiveUrl: `gs://serverless-core-io-${gcpRegion}/function.js.zip`, // ${gcpRegion}
                httpsTrigger: {},
                availableMemoryMb: 128
            }
        }

        return cloudFunctions.projects.locations.functions.create(params, callback)

    })
    .then(result => {
        return { functionId }
    })

}