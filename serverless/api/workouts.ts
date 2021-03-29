"use strict";
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "localhost",
  endpoint: "http://localhost:8000",
});

module.exports.list = async (event, context, callback) => {
  try {
    const params = {
      TableName: process.env.WORKOUTS_TABLE,
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

module.exports.item = async (event) => {
  try {
    const params = {
      TableName: process.env.WORKOUTS_TABLE,
      Key: {
        id: event.pathParameters.id,
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

module.exports.create = async (event) => {
  try {
    const workout = JSON.parse(event.body);
    workout.id = uuidv4();
    workout.date = format(new Date(), "dd.MM.yyyy");
    workout.exercises.forEach((exercise) => {
      exercise.id = uuidv4();
    });
    const params = {
      TableName: process.env.WORKOUTS_TABLE,
      Item: workout,
    };
    const result = await dynamoDB.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(workout),
    };
  } catch (err) {
    console.log("cannot load workouts", err);
    throw err;
  }
};
