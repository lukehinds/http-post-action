import * as core from '@actions/core'
import * as fs from 'fs'
// import http
// import request
import * as request from 'request'

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url')
    core.debug(`Posting to ${url} ...`)
    // access the artifact named "slsa-provenance" and upload it to the server
    const artifact_name: string = core.getInput('artifact_name')
    // json parse the artifact
    // const artifact = JSON.parse(fs.readFileSync(artifact_name, 'utf8'))
    // load the artifact as form data
    const artifact = fs.readFileSync(artifact_name, 'utf8')
    const options = {
      url,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      formData: {
        artifact: fs.createReadStream(artifact)
      }
    }
    request.post(options, (error: any, res: any, body: any) => {
      if (error) {
        core.setFailed(error)
      }
      core.debug(`statusCode: ${res.statusCode}`)
      core.debug(body)
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
