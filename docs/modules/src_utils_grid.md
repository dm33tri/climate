[climate](../README.md) / [Modules](../modules.md) / src/utils/grid

# Module: src/utils/grid

## Table of contents

### Functions

- [gridBin](src_utils_grid.md#gridbin)

## Functions

### gridBin

▸ **gridBin**(`data`, `buffer`, `«destructured»`): `Object`

convert array of [lon, lat, value] to binary grid

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
| `type` | ``"grid"`` |

#### Defined in

[src/utils/grid.ts:4](https://github.com/dm33tri/climate/blob/a558f70/src/utils/grid.ts#L4)
