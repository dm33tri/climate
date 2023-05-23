[climate](../README.md) / [Modules](../modules.md) / src/loaders/utils

# Module: src/loaders/utils

## Table of contents

### Functions

- [getGeosProjection](src_loaders_utils.md#getgeosprojection)
- [getValue](src_loaders_utils.md#getvalue)

## Functions

### getGeosProjection

▸ **getGeosProjection**(`file`): `Object`

Extract projection from geostaionary satellite data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `longitudeOfProjectionOrigin` | `number` |
| `perspectivePointHeight` | `number` |
| `projection` | `Converter` |
| `semiMajorAxis` | `number` |
| `semiMinorAxis` | `number` |
| `sweepAngleAxis` | `string` |

#### Defined in

[src/loaders/utils.ts:29](https://github.com/dm33tri/climate/blob/a558f70/src/loaders/utils.ts#L29)

___

### getValue

▸ **getValue**(`file`, `path`): { `fill`: `undefined` ; `offset`: `number` ; `scale`: `number` ; `value`: `Float32Array`  } \| { `fill`: `number` ; `offset`: `number` ; `scale`: `number` ; `value`: `Float32Array`  }

Extract value from HDF5/netCDF4 dataset.

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |
| `path` | `string` |

#### Returns

{ `fill`: `undefined` ; `offset`: `number` ; `scale`: `number` ; `value`: `Float32Array`  } \| { `fill`: `number` ; `offset`: `number` ; `scale`: `number` ; `value`: `Float32Array`  }

#### Defined in

[src/loaders/utils.ts:7](https://github.com/dm33tri/climate/blob/a558f70/src/loaders/utils.ts#L7)
