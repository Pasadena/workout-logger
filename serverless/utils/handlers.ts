import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

import { okResponse } from "../utils/http";
import dynamoDB, { withItemParameters } from "./db";

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
      console.log("cannot create workout", err);
      throw err;
    }
  };
}
