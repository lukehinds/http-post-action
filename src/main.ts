import * as core from '@actions/core'
import * as fs from 'fs'
import * as request from 'request'
import FormData from 'form-data'

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url')
    core.debug(`Posting to ${url} ...`)

    const artifactName: string = core.getInput('artifact_name')
    const form = new FormData()

    // form append with multipart/form-data header
    form.append('file', fs.createReadStream(artifactName), {
      filename: artifactName,
      contentType: 'multipart/form-data'
    })

    const response = request.post({
      url,
      body: form,
      // use header with 'Content-Type', 'multipart/form-data'
      headers: form.getHeaders()
    })

    core.debug(`Response: ${response.body}`)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
