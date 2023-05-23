[climate](../README.md) / [Modules](../modules.md) / src/utils/h3bin

# Module: src/utils/h3bin

## Table of contents

### Functions

- [h3bin](src_utils_h3bin.md#h3bin)

## Functions

### h3bin

▸ **h3bin**(`data`, `buffer`, `«destructured»`): `Object`

create a hexagonal grid from a list of points

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`number`, `number`, `number`][] |
| `buffer` | `SharedArrayBuffer` \| `ArrayBuffer` |
| `«destructured»` | `Object` |
| › `resolution` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `buffer` | `SharedArrayBuffer` \| `ArrayBuffer` |
| `count` | `number` |
| `resolution` | `number` |
| `type` | ``"h3"`` |

#### Defined in

[src/utils/h3bin.ts:6](https://github.com/dm33tri/climate/blob/a558f70/src/utils/h3bin.ts#L6)
