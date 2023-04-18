# Lambda Response Streaming Example

This repository contains an example implementation of Lambda Response Streaming, a feature announced by AWS in [this blog post](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-response-streaming/).

## Overview

Lambda Response Streaming allows you to send partial responses to callers as the responses become available. This can improve performance for web and mobile applications. You can also use response streaming to build functions that return larger payloads and perform long-running operations while reporting incremental progress.

## Project Structure

The example project is built using the Serverless Framework and contains two functions:

- `hello`: a function that uses the default `BUFFERED` invoke mode to return a simple response.
- `helloStream`: a function that uses the new `RESPONSE_STREAM` invoke mode and uses `streamifyResponse()` to return a streaming response.

The `serverless.yml` file in the root directory of the project contains the configuration for the two functions and a CloudFront distribution that is showcase using a Lambda Function URL as a streaming origin.

## Running the Example

To run the example, follow these steps:

1. Install the dependencies:

```
cd <repository>
npm install

```

1. Deploy the functions:

```
sls deploy

```

Once the deployment is finished, it should output all the generated URLs for HTTP API, REST API and Function URLs.
HTTP API and REST API do not support streaming with Lambda, so they are only included for comparison. The non-streaming function 

```
endpoints:
  GET - https://zq4uc9h4q3.execute-api.eu-west-1.amazonaws.com/dev/rest-api
  GET - https://zq4uc9h4q3.execute-api.eu-west-1.amazonaws.com/dev/rest-api-stream
  GET - https://k80gj7fj01.execute-api.eu-west-1.amazonaws.com/http-api
  GET - https://k80gj7fj01.execute-api.eu-west-1.amazonaws.com/http-api-stream
  hello: https://b3kuz8j4abscf6gtauc56xne2ii0jnkml.lambda-url.eu-west-1.on.aws/
  helloStream: https://p1kzc6yfwq2mls72rehpjncwue0grtmy.lambda-url.eu-west-1.on.aws/
```

To get the CloudFormation distribution URL, you can inpsect the CloudFormation outputs.
```bash
aws cloudformation describe-stacks --stack-name streamz-dev --query "Stacks[0].Outputs[?OutputKey=='CloudFrontUrl'].OutputValue" --output text
```
