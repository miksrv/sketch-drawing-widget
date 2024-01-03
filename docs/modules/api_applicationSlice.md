[sketch-drawing-widget](../README.md) / [Exports](../modules.md) / api/applicationSlice

# Module: api/applicationSlice

## Table of contents

### Namespaces

- [editSketch](api_applicationSlice.editSketch.md)

### Variables

- [applicationSlice](api_applicationSlice.md#applicationslice)

### Functions

- [default](api_applicationSlice.md#default)
- [editSketch](api_applicationSlice.md#editsketch)

## Variables

### applicationSlice

• `Const` **applicationSlice**: `Slice`\<`applicationSliceType`, \{ `editSketch`: (`state`: `WritableDraft`\<`applicationSliceType`\>, `action`: \{ `payload`: `undefined` \| [`SketchData`](../interfaces/components_sketch_form_types.SketchData.md) ; `type`: `string`  }) => `void`  }, ``"counter"``, ``"counter"``, `SliceSelectors`\<`applicationSliceType`\>\>

#### Defined in

[src/api/applicationSlice.ts:12](https://github.com/miksrv/sketch-drawing-widget/blob/c680a9e/src/api/applicationSlice.ts#L12)

## Functions

### default

▸ **default**(`state`, `action`): `applicationSliceType`

A *reducer* is a function that accepts
an accumulation and a value and returns a new accumulation. They are used
to reduce a collection of values down to a single value

Reducers are not unique to Redux—they are a fundamental concept in
functional programming.  Even most non-functional languages, like
JavaScript, have a built-in API for reducing. In JavaScript, it's
`Array.prototype.reduce()`.

In Redux, the accumulated value is the state object, and the values being
accumulated are actions. Reducers calculate a new state given the previous
state and an action. They must be *pure functions*—functions that return
the exact same output for given inputs. They should also be free of
side-effects. This is what enables exciting features like hot reloading and
time travel.

Reducers are the most important concept in Redux.

*Do not put API calls into reducers.*

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `undefined` \| `applicationSliceType` |
| `action` | `UnknownAction` |

#### Returns

`applicationSliceType`

#### Defined in

node_modules/redux/dist/redux.d.ts:91

___

### editSketch

▸ **editSketch**(`payload?`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`.
Calling it without an argument will return a PayloadAction with a payload of `undefined`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload?` | [`SketchData`](../interfaces/components_sketch_form_types.SketchData.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `payload` | `undefined` \| [`SketchData`](../interfaces/components_sketch_form_types.SketchData.md) |
| `type` | ``"counter/editSketch"`` |

#### Defined in

node_modules/@reduxjs/toolkit/dist/createAction.d.ts:94
