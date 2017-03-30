A sample alexa skill for asking Gilt what the new sales are

Using Claudia (https://claudiajs.com) chat bot builder, deployed to AWS and accessible from AWS Developer (https://developer.amazon.com) portal for testing ( or on echo device thats registered to your developer account)


### Creating the lambda.

```claudia create --region us-east-1 --api-module bot --profile [YOUR_AWS_ACCOUNT]```

### Updating/ deploying a new version

```claudia update --profile [YOUR_AWS_ACCOUNT]```
