import * as core from '@actions/core'
import request from 'request'

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url')
    core.debug(`Posting to ${url} ...`)

    const artifactName: string = core.getInput('artifact_name')

    // post artifactName as application/json to url
    const options = {
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({artifactName})
    }

    request(
      options,
      (
        error: {message: string | Error},
        response: {statusCode: unknown; statusMessage: unknown},
        body: unknown
      ) => {
        if (error) {
          core.setFailed(error.message)
        } else {
          core.debug(
            `Response: ${response.statusCode} ${response.statusMessage}`
          )
          core.debug(`Body: ${body}`)
        }
      }
    )
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
