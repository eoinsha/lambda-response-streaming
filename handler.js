export const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'This is a non-streaming handler',
        input: event
      },
      null,
      2
    )
  }
}
