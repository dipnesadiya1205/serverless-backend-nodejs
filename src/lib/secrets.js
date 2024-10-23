const AWS = require("@aws-sdk/client-ssm");

const AWS_REGION = process.env.AWS_REGION || "ap-south-1";
const STAGE = process.env.STAGE || "prod";

// Configure AWS SDK for SSM
const ssm = new AWS.SSM({ region: AWS_REGION });

const getDatabaseUrl = async () => {
  const DATABASE_URL_SSM_PARAM = `/serverless-framework/${STAGE}/database-url`;
  const paramStoreData = await ssm.getParameter({
    Name: DATABASE_URL_SSM_PARAM,
    WithDecryption: true,
  });

  // neonConfig.fetchConnectionCache = true;
  return paramStoreData.Parameter.Value || process.env.DATABASE_URL;
};

module.exports.getDatabaseUrl = getDatabaseUrl;
