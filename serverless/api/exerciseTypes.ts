import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { okResponse } from "../utils/http";
import dynamoDB from "../utils/db";
import { postHandler } from "../utils/handlers";

const EXERCISE_TYPES_TABLE = process.env.EXERCISE_TYPES_TABLE as string;

const exerciseTypePostHandler = postHandler(EXERCISE_TYPES_TABLE);

module.exports.list = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = {
    TableName: EXERCISE_TYPES_TABLE,
  };
  const result = await dynamoDB.scan(params).promise();
  return okResponse(result.Items);
};

module.exports.create = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return exerciseTypePostHandler(event);
};
