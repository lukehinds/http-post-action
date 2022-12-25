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
    form.append('my_field', 'my value')
    form.append('my_buffer', Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
    form.append('my_file', fs.createReadStream(artifactName))

    const response = request.post({
      url,
      body: form,
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
