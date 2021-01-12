# How To Access AWS Secrets Manager With NodeJS & Lambda

This is the answer to “where to keep credentials for lambda functions
I will use a simple lambda as an example. Code examples tested on Node.js 12.x.

First we will import the required libaries and then create an async function called **AWSSecretsManager**

```
var AWS = require("aws-sdk");
var client = new AWS.SecretsManager({
  region: "us-gov-west-1",
});

const AWSSecretsManager = async (secretName) => {
  const response = await client.getSecretValue({ SecretId: secretName }).promise();

  if ("SecretString" in response) {
    return response.SecretString;
  } else {
    return Buffer.from(response.SecretBinary, "base64").toString("ascii");
  }
};
```

Now, in your handler function you'll call the function above and pass in the name of the secret

```
exports.handler = async (event) => {
    const config = await AWSSecretsManager("SecretName").then(data => {return JSON.parse(data)})
    console.log(config)
};
```
