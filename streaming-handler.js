const handler = async (event, responseStream, context) => {
  const responseMetadata = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  }

  const rStream = awslambda.HttpResponseStream.from(responseStream, responseMetadata)
  rStream.write('Hello\n')
  for (let i = 0; i < 20; i++) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    rStream.write(`Number ${i}\n`)
  }
  rStream.write('Done :-)')
  rStream.end()
}

module.exports.hello = awslambda.streamifyResponse(handler)
