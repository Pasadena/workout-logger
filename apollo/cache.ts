import { ApolloCache, DocumentNode, Reference } from "@apollo/client";
import { ReadFieldFunction } from "@apollo/client/cache/core/types/common";

export function appendToCache<CacheType, T>(
  cache: ApolloCache<CacheType>,
  field: string,
  data: T,
  fragment: DocumentNode
) {
  cache.modify({
    fields: {
      [field]: (existingRefs: Reference[] = []) => {
        const newRef = cache.writeFragment({
          data: data,
          fragment: fragment,
        });
        return existingRefs.concat([newRef]);
      },
    },
  });
}

export function evictFromCache(
  cache: ApolloCache<unknown>,
  field: string,
  id: string
) {
  cache.modify({
    fields: {
      [field]: (
        existingRefs: Reference[] = [],
        { readField }: { readField: ReadFieldFunction }
      ) => {
        return existingRefs.filter(
          (ref: Reference) => id !== readField("id", ref)
        );
      },
    },
  });
}
