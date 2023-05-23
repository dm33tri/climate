[climate](../README.md) / [Modules](../modules.md) / src/loaders/era5

# Module: src/loaders/era5

## Table of contents

### Functions

- [loadEra5Data](src_loaders_era5.md#loadera5data)

## Functions

### loadEra5Data

▸ **loadEra5Data**(`path`, `initialVariable?`): `Promise`<{ `data`: [`number`, `number`, `number`][] ; `max`: `number` ; `min`: `number` ; `variables`: `string`[]  }\>

Load ERA5 data from the CDS API using proxy worker.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `initialVariable?` | `string` |

#### Returns

`Promise`<{ `data`: [`number`, `number`, `number`][] ; `max`: `number` ; `min`: `number` ; `variables`: `string`[]  }\>

#### Defined in

[src/loaders/era5.ts:7](https://github.com/dm33tri/climate/blob/a558f70/src/loaders/era5.ts#L7)
