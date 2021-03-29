"use strict";
import * as AWS from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const WORKOUTS_TABLE = process.env.WORKOUTS_TABLE as string;

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
});

module.exports.list = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const params = {
      TableName: WORKOUTS_TABLE,
    };
    const result = await dynamoDB.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (err) {
    console.log("cannot load workouts", err);
    throw err;
  }
};

module.exports.item = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;
    if (!id) {
      throw new Error("Id is required for querying single workout");
    }
    const params = {
      TableName: WORKOUTS_TABLE,
      Key: {
        id: event.pathParameters?.id,
      },
    };
    const result = await dynamoDB.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (err) {
    console.log("cannot load workouts", err);
    throw err;
  }
};

module.exports.create = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const workout = JSON.parse(event.body as string);
    workout.id = uuidv4();
    workout.date = format(new Date(), "dd.MM.yyyy");
    workout.exercises.forEach((exercise) => {
      exercise.id = uuidv4();
    });
    const params = {
      TableName: WORKOUTS_TABLE,
      Item: workout,
    };
    await dynamoDB.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(workout),
    };
  } catch (err) {
    console.log("cannot create workout", err);
    throw err;
  }
};

module.exports.update = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const workout = JSON.parse(event.body as string);
    const params = {
      TableName: WORKOUTS_TABLE,
      Item: workout,
    };
    await dynamoDB.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(workout),
    };
  } catch (err) {
    console.log("cannot update workout", err);
    throw err;
  }
};

module.exports.delete = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters?.id;
    if (!id) {
      throw new Error("Id is required for deleting workout");
    }
    const params = {
      TableName: WORKOUTS_TABLE,
      Key: {
        id,
      },
    };
    await dynamoDB.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(id),
    };
  } catch (err) {
    console.log("cannot update workout", err);
    throw err;
  }
};
