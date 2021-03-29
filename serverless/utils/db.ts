export const byIdParameters = (tableName: string) => (id: string) => ({
  TableName: tableName,
  Key: {
    id,
  },
});

export const withItemParameters = (tableName: string) => (item: any) => ({
  TableName: tableName,
  Item: item,
});
