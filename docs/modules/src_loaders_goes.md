[climate](../README.md) / [Modules](../modules.md) / src/loaders/goes

# Module: src/loaders/goes

## Table of contents

### Functions

- [loadGoesData](src_loaders_goes.md#loadgoesdata)

## Functions

### loadGoesData

▸ **loadGoesData**(`path`, `initialVariable?`): `Promise`<{ `data`: [`number`, `number`, `number`][] = result; `max`: `number` ; `min`: `number` ; `variables`: `string`[]  }\>

Load GOES data from S3 bucket.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `initialVariable?` | `string` |

#### Returns

`Promise`<{ `data`: [`number`, `number`, `number`][] = result; `max`: `number` ; `min`: `number` ; `variables`: `string`[]  }\>

#### Defined in

[src/loaders/goes.ts:14](https://github.com/dm33tri/climate/blob/a558f70/src/loaders/goes.ts#L14)
