import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { okResponse } from "../utils/http";
import dynamoDB from "../utils/db";
import { deleteHandler, postHandler } from "../utils/handlers";

const EXERCISE_TYPES_TABLE = process.env.EXERCISE_TYPES_TABLE as string;

const exerciseTypePostHandler = postHandler(EXERCISE_TYPES_TABLE);
const exerciseTypeDeleteHandler = deleteHandler(EXERCISE_TYPES_TABLE);

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

module.exports.search = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const searchTerm = event.pathParameters?.name;
  const params = {
    TableName: EXERCISE_TYPES_TABLE,
  };
  const result = await dynamoDB.scan(params).promise(); // TODO: replace with query at some point
  return okResponse(
    result.Items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};

module.exports.remove = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return exerciseTypeDeleteHandler(event);
};
