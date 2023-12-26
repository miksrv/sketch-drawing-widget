[sketch-drawing-widget](../README.md) / [Exports](../modules.md) / functions/geometry

# Module: functions/geometry

## Table of contents

### Functions

- [decodeCoordinates](functions_geometry.md#decodecoordinates)
- [doLinesIntersect](functions_geometry.md#dolinesintersect)
- [doSegmentsIntersect](functions_geometry.md#dosegmentsintersect)
- [encodeCoordinates](functions_geometry.md#encodecoordinates)
- [transformPoints](functions_geometry.md#transformpoints)

## Functions

### decodeCoordinates

▸ **decodeCoordinates**(`encodedString`): [`Point2D`](../interfaces/functions_types.Point2D.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `encodedString` | `string` |

#### Returns

[`Point2D`](../interfaces/functions_types.Point2D.md)[]

#### Defined in

[src/functions/geometry.tsx:83](https://github.com/miksrv/sketch-drawing-widget/blob/2552fb8/src/functions/geometry.tsx#L83)

___

### doLinesIntersect

▸ **doLinesIntersect**(`lines`): `boolean`

Checks if lines intersect in two-dimensional space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lines` | [`Point2D`](../interfaces/functions_types.Point2D.md)[] | Array of points representing lines in the format [x1, y1, x2, y2, ...]. |

#### Returns

`boolean`

Returns true if at least two lines intersect; otherwise, returns false.

#### Defined in

[src/functions/geometry.tsx:9](https://github.com/miksrv/sketch-drawing-widget/blob/2552fb8/src/functions/geometry.tsx#L9)

___

### doSegmentsIntersect

▸ **doSegmentsIntersect**(`seg1Start`, `seg1End`, `seg2Start`, `seg2End`): `boolean`

Checks if two line segments intersect.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seg1Start` | [`Point2D`](../interfaces/functions_types.Point2D.md) | Starting point of the first line segment. |
| `seg1End` | [`Point2D`](../interfaces/functions_types.Point2D.md) | Ending point of the first line segment. |
| `seg2Start` | [`Point2D`](../interfaces/functions_types.Point2D.md) | Starting point of the second line segment. |
| `seg2End` | [`Point2D`](../interfaces/functions_types.Point2D.md) | Ending point of the second line segment. |

#### Returns

`boolean`

Returns true if the line segments intersect; otherwise, returns false.

#### Defined in

[src/functions/geometry.tsx:40](https://github.com/miksrv/sketch-drawing-widget/blob/2552fb8/src/functions/geometry.tsx#L40)

___

### encodeCoordinates

▸ **encodeCoordinates**(`coordinates`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `coordinates` | [`Point2D`](../interfaces/functions_types.Point2D.md)[] |

#### Returns

`string`

#### Defined in

[src/functions/geometry.tsx:80](https://github.com/miksrv/sketch-drawing-widget/blob/2552fb8/src/functions/geometry.tsx#L80)

___

### transformPoints

▸ **transformPoints**(`points`): \{ `x`: `number` = 10; `y`: `number`  }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`Point2D`](../interfaces/functions_types.Point2D.md)[] |

#### Returns

\{ `x`: `number` = 10; `y`: `number`  }[]

#### Defined in

[src/functions/geometry.tsx:96](https://github.com/miksrv/sketch-drawing-widget/blob/2552fb8/src/functions/geometry.tsx#L96)
