[sketch-drawing-widget](../README.md) / [Exports](../modules.md) / api/api

# Module: api/api

## Table of contents

### Variables

- [API](api_api.md#api)

### Functions

- [getRunningQueriesThunk](api_api.md#getrunningqueriesthunk)

## Variables

### API

• `Const` **API**: `Api`\<`BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, \{ `sketchCreate`: `MutationDefinition`\<[`RequestPostSketch`](../interfaces/api_types.RequestPostSketch.md), `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, `void`, ``"api"``\> ; `sketchDelete`: `MutationDefinition`\<`string`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, `void`, ``"api"``\> ; `sketchGetList`: `QueryDefinition`\<`void`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, [`ResponseGetList`](../interfaces/api_types.ResponseGetList.md), ``"api"``\> ; `sketchModify`: `MutationDefinition`\<`any`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, ``"Sketch"``, `void`, ``"api"``\>  }, ``"api"``, ``"Sketch"``, typeof `coreModuleName` \| typeof `reactHooksModuleName`\>

#### Defined in

[src/api/api.ts:5](https://github.com/miksrv/sketch-drawing-widget/blob/c680a9e/src/api/api.ts#L5)

## Functions

### getRunningQueriesThunk

▸ **getRunningQueriesThunk**(): `ThunkWithReturnValue`\<`QueryActionCreatorResult`\<`any`\>[]\>

A thunk that (if dispatched) will return all running queries.

Useful for SSR scenarios to await all running queries triggered in any way,
including via hook calls or manually dispatching `initiate` actions.

See https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering for details.

#### Returns

`ThunkWithReturnValue`\<`QueryActionCreatorResult`\<`any`\>[]\>

#### Defined in

node_modules/@reduxjs/toolkit/dist/query/core/module.d.ts:123
