"use strict";
import * as AWS from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { okResponse } from "../utils/http";
import dynamoDB, { byIdParameters, withItemParameters } from "../utils/db";
import { deleteHandler, postHandler } from "../utils/handlers";

const WORKOUTS_TABLE = process.env.WORKOUTS_TABLE as string;

const byId = byIdParameters(WORKOUTS_TABLE);
const withItem = withItemParameters(WORKOUTS_TABLE);

const addServerData = (workout: any) => {
  workout.date = format(new Date(), "dd.MM.yyyy");
  workout.exercises.forEach((exercise) => {
    exercise.id = uuidv4();
  });
  return workout;
};

const workoutPostHandler = postHandler(WORKOUTS_TABLE, addServerData);
const workoutDeleteHandler = deleteHandler(WORKOUTS_TABLE);

module.exports.list = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const params = {
      TableName: WORKOUTS_TABLE,
    };
    const result = await dynamoDB.scan(params).promise();
    return okResponse(result.Items);
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
    const result = await dynamoDB.get(byId(id)).promise();
    return okResponse(result.Item);
  } catch (err) {
    console.log("cannot load workouts", err);
    throw err;
  }
};

module.exports.create = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return workoutPostHandler(event);
};

module.exports.update = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const workout = JSON.parse(event.body as string);
    await dynamoDB.put(withItem(workout)).promise();
    return okResponse(workout);
  } catch (err) {
    console.log("cannot update workout", err);
    throw err;
  }
};

module.exports.delete = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return workoutDeleteHandler(event);
};
