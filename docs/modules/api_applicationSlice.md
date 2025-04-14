[sketch-drawing-widget](../README.md) / [Exports](../modules.md) / api/applicationSlice

# Module: api/applicationSlice

## Table of contents

### Variables

- [applicationSlice](api_applicationSlice.md#applicationslice)

### Functions

- [default](api_applicationSlice.md#default)
- [editSketch](api_applicationSlice.md#editsketch)

## Variables

### applicationSlice

• `Const` **applicationSlice**: `Slice`\<`applicationSliceType`, \{ `editSketch`: (`state`: `WritableDraft`\<`applicationSliceType`\>, `action`: \{ `payload`: `undefined` \| [`SketchData`](../interfaces/components_sketch_form_types.SketchData.md) ; `type`: `string` }) => `void` }, `"counter"`, `"counter"`, `SliceSelectors`\<`applicationSliceType`\>\>

#### Defined in

[src/api/applicationSlice.ts:12](https://github.com/miksrv/sketch-drawing-widget/blob/05a5c65ac52878acf28f48ea54a925a1b67bf73f/src/api/applicationSlice.ts#L12)

## Functions

### default

▸ **default**(`state`, `action`): `applicationSliceType`

#### Parameters

| Name     | Type                                  |
| :------- | :------------------------------------ |
| `state`  | `undefined` \| `applicationSliceType` |
| `action` | `UnknownAction`                       |

#### Returns

`applicationSliceType`

#### Defined in

node_modules/@reduxjs/toolkit/dist/index.d.ts:1498

---

### editSketch

▸ **editSketch**(`payload?`): `Object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`.
Calling it without an argument will return a PayloadAction with a payload of `undefined`.

#### Parameters

| Name       | Type                                                                     |
| :--------- | :----------------------------------------------------------------------- |
| `payload?` | [`SketchData`](../interfaces/components_sketch_form_types.SketchData.md) |

#### Returns

`Object`

| Name      | Type                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------- |
| `payload` | `undefined` \| [`SketchData`](../interfaces/components_sketch_form_types.SketchData.md) |
| `type`    | `"counter/editSketch"`                                                                  |

#### Defined in

[src/api/applicationSlice.ts:22](https://github.com/miksrv/sketch-drawing-widget/blob/05a5c65ac52878acf28f48ea54a925a1b67bf73f/src/api/applicationSlice.ts#L22)
