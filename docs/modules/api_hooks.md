[sketch-drawing-widget](../README.md) / [Exports](../modules.md) / api/hooks

# Module: api/hooks

## Table of contents

### Functions

-   [useAppDispatch](api_hooks.md#useappdispatch)
-   [useAppSelector](api_hooks.md#useappselector)

## Functions

### useAppDispatch

▸ **useAppDispatch**(): `ThunkDispatch`\<\{ `api`: `CombinedState`\<\{ `sketchCreate`: `MutationDefinition`\<[`RequestPostSketch`](../interfaces/api_types.RequestPostSketch.md), `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> ; `sketchDelete`: `MutationDefinition`\<`string`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> ; `sketchGetList`: `QueryDefinition`\<`void`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, [`ResponseGetList`](../interfaces/api_types.ResponseGetList.md), `"api"`\> ; `sketchModify`: `MutationDefinition`\<`any`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> }, `"Sketch"`, `"api"`\> = API.reducer; `application`: `applicationSliceType` = applicationSlice }, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\>

#### Returns

`ThunkDispatch`\<\{ `api`: `CombinedState`\<\{ `sketchCreate`: `MutationDefinition`\<[`RequestPostSketch`](../interfaces/api_types.RequestPostSketch.md), `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> ; `sketchDelete`: `MutationDefinition`\<`string`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> ; `sketchGetList`: `QueryDefinition`\<`void`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, [`ResponseGetList`](../interfaces/api_types.ResponseGetList.md), `"api"`\> ; `sketchModify`: `MutationDefinition`\<`any`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> }, `"Sketch"`, `"api"`\> = API.reducer; `application`: `applicationSliceType` = applicationSlice }, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\>

#### Defined in

[src/api/hooks.ts:6](https://github.com/miksrv/sketch-drawing-widget/blob/c680a9e/src/api/hooks.ts#L6)

---

### useAppSelector

▸ **useAppSelector**\<`TSelected`\>(`selector`, `equalityFn?`): `TSelected`

#### Type parameters

| Name        |
| :---------- |
| `TSelected` |

#### Parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selector`    | (`state`: \{ `api`: `CombinedState`\<\{ `sketchCreate`: `MutationDefinition`\<[`RequestPostSketch`](../interfaces/api_types.RequestPostSketch.md), `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> ; `sketchDelete`: `MutationDefinition`\<`string`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> ; `sketchGetList`: `QueryDefinition`\<`void`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, [`ResponseGetList`](../interfaces/api_types.ResponseGetList.md), `"api"`\> ; `sketchModify`: `MutationDefinition`\<`any`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> }, `"Sketch"`, `"api"`\> = API.reducer; `application`: `applicationSliceType` = applicationSlice }) => `TSelected` |
| `equalityFn?` | `EqualityFn`\<`NoInfer`\<`TSelected`\>\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

#### Returns

`TSelected`

#### Defined in

node_modules/react-redux/dist/react-redux.d.ts:239

▸ **useAppSelector**\<`Selected`\>(`selector`, `options?`): `Selected`

#### Type parameters

| Name       | Type      |
| :--------- | :-------- |
| `Selected` | `unknown` |

#### Parameters

| Name       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selector` | (`state`: \{ `api`: `CombinedState`\<\{ `sketchCreate`: `MutationDefinition`\<[`RequestPostSketch`](../interfaces/api_types.RequestPostSketch.md), `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> ; `sketchDelete`: `MutationDefinition`\<`string`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> ; `sketchGetList`: `QueryDefinition`\<`void`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, [`ResponseGetList`](../interfaces/api_types.ResponseGetList.md), `"api"`\> ; `sketchModify`: `MutationDefinition`\<`any`, `BaseQueryFn`\<`string` \| `FetchArgs`, `unknown`, `FetchBaseQueryError`, {}, `FetchBaseQueryMeta`\>, `"Sketch"`, `void`, `"api"`\> }, `"Sketch"`, `"api"`\> = API.reducer; `application`: `applicationSliceType` = applicationSlice }) => `Selected` |
| `options?` | `UseSelectorOptions`\<`Selected`\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

#### Returns

`Selected`

#### Defined in

node_modules/react-redux/dist/react-redux.d.ts:240
