import { createApi } from "@reduxjs/toolkit/query/react";
import firebase from "firebase";
import {
  ref,
  onValue,
  onChildAdded,
  onChildMoved,
  onChildRemoved,
  onChildChanged,
  off
} from "firebase/database";
import { database } from "./services/firebase";

const eventTypeMapping = {
  value: onValue,
  child_added: onChildAdded,
  child_moved: onChildMoved,
  child_removed: onChildRemoved,
  child_changed: onChildChanged
};

type firebaseSubOptions = {
  query: string;
  eventType: firebase.database.EventType;
  once?: boolean;
  queryOptions?: {
    [methodName: string]: any;
  };
};

export const testApi = createApi({
  baseQuery: () => ({ data: null }),
  endpoints: (builder) => {
    const buildEndpoint = <ReturnType, QueryParams>(
      options: firebaseSubOptions
    ) => {
      const { eventType, query } = options;
      const singleObjectEventType = eventType == "value";
      return builder.query<ReturnType | null, QueryParams>({
        queryFn: (arg: QueryParams) => ({ data: null }),
        async onCacheEntryAdded(
          queryArgs,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
          await cacheDataLoaded;
          const listener = (
            ds: firebase.database.DataSnapshot,
            _type: firebase.database.EventType
          ) => {
            if (singleObjectEventType) {
              updateCachedData((state) => {
                return ds.val() as ReturnType;
              });
            } else if (_type === "child_added") {
              updateCachedData((state) => {
                if (state === null) {
                  return ([ds.val()] as unknown) as ReturnType;
                } else {
                  return ([
                    ...((state as unknown) as any[]),
                    ds.val()
                  ] as unknown) as ReturnType;
                }
              });
            }
          };

          (eventTypeMapping[eventType] as Function)(
            ref(database, query),
            listener
          );
          await cacheEntryRemoved;
          off(ref(database, query), eventType, listener);
        }
      });
    };

    return {
      point1: buildEndpoint<string, void>({
        query: "/TestKey",
        eventType: "value"
      }),
      point2: buildEndpoint<string, void>({
        query: "/someOtherKey",
        eventType: "value"
      })
    };
  }
});

export const { usePoint1Query, usePoint2Query } = testApi;
