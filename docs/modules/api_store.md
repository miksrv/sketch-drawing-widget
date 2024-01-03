[sketch-drawing-widget](../README.md) / [Exports](../modules.md) / api/store

# Module: api/store

## Table of contents

### Type Aliases

- [AppDispatch](api_store.md#appdispatch)
- [RootState](api_store.md#rootstate)

### Variables

- [store](api_store.md#store)

## Type Aliases

### AppDispatch

Ƭ **AppDispatch**: typeof `store.dispatch`

#### Defined in

[src/api/store.ts:15](https://github.com/miksrv/sketch-drawing-widget/blob/c680a9e/src/api/store.ts#L15)

___

### RootState

Ƭ **RootState**: `ReturnType`\<typeof `store.getState`\>

#### Defined in

[src/api/store.ts:14](https://github.com/miksrv/sketch-drawing-widget/blob/c680a9e/src/api/store.ts#L14)

## Variables

### store

• `Const` **store**: `EnhancedStore`\<\{ `api`: `CombinedState`\<\{ `sketchCreate`: `MutationDefinition`\<[`RequestPostSketch`](../interfaces/api_types.RequestPostSketch.md), `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, `void`, ``"api"``\> ; `sketchDelete`: `MutationDefinition`\<`string`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, `void`, ``"api"``\> ; `sketchGetList`: `QueryDefinition`\<`void`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, [`ResponseGetList`](../interfaces/api_types.ResponseGetList.md), ``"api"``\> ; `sketchModify`: `MutationDefinition`\<`any`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, `void`, ``"api"``\>  }, ``"Sketch"``, ``"api"``\> = API.reducer; `application`: `applicationSliceType` = applicationSlice }, `UnknownAction`, `Tuple`\<[`StoreEnhancer`\<\{ `dispatch`: `ThunkDispatch`\<\{ `api`: `CombinedState`\<\{ `sketchCreate`: `MutationDefinition`\<[`RequestPostSketch`](../interfaces/api_types.RequestPostSketch.md), `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, `void`, ``"api"``\> ; `sketchDelete`: `MutationDefinition`\<`string`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, `void`, ``"api"``\> ; `sketchGetList`: `QueryDefinition`\<`void`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, [`ResponseGetList`](../interfaces/api_types.ResponseGetList.md), ``"api"``\> ; `sketchModify`: `MutationDefinition`\<`any`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, `void`, ``"api"``\>  }, ``"Sketch"``, ``"api"``\> = API.reducer; `application`: `applicationSliceType` = applicationSlice }, `undefined`, `UnknownAction`\>  }, {}\>, `StoreEnhancer`\<{}, {}\>]\>\>

#### Defined in

[src/api/store.ts:6](https://github.com/miksrv/sketch-drawing-widget/blob/c680a9e/src/api/store.ts#L6)
