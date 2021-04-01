import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

import { okResponse } from "../utils/http";
import dynamoDB, { withItemParameters, byIdParameters } from "./db";

export function postHandler<T>(
  tableName: string,
  bodyTransformer?: (body: T) => T
): (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult> {
  const withItem = withItemParameters(tableName);
  return async (event: APIGatewayProxyEvent) => {
    try {
      if (!event.body) {
        throw new Error("Cannot post without json body!");
      }
      const payload = JSON.parse(event.body as string);
      payload.id = uuidv4();
      const transformedPayload = bodyTransformer
        ? bodyTransformer(payload)
        : payload;
      await dynamoDB.put(withItem(transformedPayload)).promise();
      return okResponse(payload, 201);
    } catch (err) {
      console.log(`Cannot insert data to table ${tableName}`, err);
      throw err;
    }
  };
}

export function deleteHandler(
  tableName: string
): (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult> {
  const byId = byIdParameters(tableName);
  return async (event) => {
    try {
      const id = event.pathParameters?.id;
      if (!id) {
        throw new Error("Id is required for deleting workout");
      }
      await dynamoDB.delete(byId(id)).promise();
      return okResponse(id);
    } catch (err) {
      console.log(`Cannot delete data from table ${tableName}`, err);
      throw err;
    }
  };
}
