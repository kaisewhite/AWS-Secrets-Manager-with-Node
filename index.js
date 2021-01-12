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

exports.handler = async (event) => {
  const config = await AWSSecretsManager("SecretName").then((data) => {
    return JSON.parse(data);
  });
  console.log(config);
};
