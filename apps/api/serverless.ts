import functions from "@lambdas/index";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "poc-true-id",
  frameworkVersion: "3",
  package: {
    individually: true,
  },
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-southeast-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: false,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      TABLE_NAME_SHOPPING: "${self:custom.tableNames.shopping}",
      STAGE: "${self:custom.stage}",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:DescribeTable",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: [
          {
            "Fn::GetAtt": ["ShoppingDynamoTable", "Arn"],
          },
        ],
      },
    ],
  },
  resources: {
    Resources: {
      ShoppingDynamoTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:custom.tableNames.shopping}",
          AttributeDefinitions: [
            {
              AttributeName: "pk",
              AttributeType: "S",
            },
            {
              AttributeName: "sk",
              AttributeType: "S",
            },
            {
              AttributeName: "GSI1PK",
              AttributeType: "S",
            },
            // {
            //   AttributeName: 'GSI1SK',
            //   AttributeType: 'S',
            // },
          ],
          KeySchema: [
            {
              AttributeName: "pk",
              KeyType: "HASH",
            },
            {
              AttributeName: "sk",
              KeyType: "RANGE",
            },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "GSI1",
              ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
              },
              KeySchema: [
                {
                  AttributeName: "GSI1PK",
                  KeyType: "HASH",
                },
                {
                  AttributeName: "sk",
                  KeyType: "RANGE"
                }
              ],
              Projection: {
                ProjectionType: "ALL",
              },
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
  custom: {
    stage: "${opt:stage, self:provider.stage}",
    tableNames: {
      shopping: "${self:custom.stage}-shopping",
    },
    dynamodb: {
      stages: ["dev"],
      start: {
        migrate: true,
        port: 8002,
        inMemory: true,
        heapInitial: "200m",
        healMax: "1g",
        seed: false,
        convertEmptyValues: true,
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: {
        "require.resolve": undefined,
      },
      watch: {
        pattern: ["src/**/*.ts"],
        ignore: ["temp/**/*"],
      },
      platform: "node",
      concurrency: 10,
    },
  },
  functions,
};

module.exports = serverlessConfiguration;
