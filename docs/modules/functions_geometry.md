[sketch-drawing-widget](../README.md) / [Exports](../modules.md) / functions/geometry

# Module: functions/geometry

## Table of contents

### Functions

- [addHookPoints](functions_geometry.md#addhookpoints)
- [addShiftedPoints](functions_geometry.md#addshiftedpoints)
- [calculateFirstVertical](functions_geometry.md#calculatefirstvertical)
- [doLinesIntersect](functions_geometry.md#dolinesintersect)
- [doSegmentsIntersect](functions_geometry.md#dosegmentsintersect)
- [encodeCoordinates](functions_geometry.md#encodecoordinates)

## Functions

### addHookPoints

▸ **addHookPoints**(`points`, `positive?`, `size?`, `isFirst?`): [`Point2D`](../interfaces/functions_types.Point2D.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `points` | [`Point2D`](../interfaces/functions_types.Point2D.md)[] |
| `positive?` | `boolean` |
| `size?` | `number` |
| `isFirst?` | `boolean` |

#### Returns

[`Point2D`](../interfaces/functions_types.Point2D.md)

#### Defined in

[src/functions/geometry.tsx:92](https://github.com/miksrv/sketch-drawing-widget/blob/4e85d9a/src/functions/geometry.tsx#L92)

___

### addShiftedPoints

▸ **addShiftedPoints**(`originalPoints`): \{ `x`: `number` ; `y`: `number` = point.y }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalPoints` | [`Point2D`](../interfaces/functions_types.Point2D.md)[] |

#### Returns

\{ `x`: `number` ; `y`: `number` = point.y }[]

#### Defined in

[src/functions/geometry.tsx:155](https://github.com/miksrv/sketch-drawing-widget/blob/4e85d9a/src/functions/geometry.tsx#L155)

___

### calculateFirstVertical

▸ **calculateFirstVertical**(`originalPoints`): [`Point2D`](../interfaces/functions_types.Point2D.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `originalPoints` | [`Point2D`](../interfaces/functions_types.Point2D.md)[] |

#### Returns

[`Point2D`](../interfaces/functions_types.Point2D.md)[]

#### Defined in

[src/functions/geometry.tsx:121](https://github.com/miksrv/sketch-drawing-widget/blob/4e85d9a/src/functions/geometry.tsx#L121)

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

[src/functions/geometry.tsx:9](https://github.com/miksrv/sketch-drawing-widget/blob/4e85d9a/src/functions/geometry.tsx#L9)

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

[src/functions/geometry.tsx:40](https://github.com/miksrv/sketch-drawing-widget/blob/4e85d9a/src/functions/geometry.tsx#L40)

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

[src/functions/geometry.tsx:76](https://github.com/miksrv/sketch-drawing-widget/blob/4e85d9a/src/functions/geometry.tsx#L76)
