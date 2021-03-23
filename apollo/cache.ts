import { ApolloCache, DocumentNode, Reference } from "@apollo/client";

export function appendToCache<CacheType, T>(
  cache: ApolloCache<CacheType>,
  field: string,
  data: T,
  fragment: DocumentNode
) {
  cache.modify({
    fields: {
      [field]: (existingRefs: Reference[]) => {
        const newRef = cache.writeFragment({
          data: data,
          fragment: fragment,
        });
        return existingRefs.concat([newRef]);
      },
    },
  });
}
