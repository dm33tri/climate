[climate](../README.md) / [Modules](../modules.md) / src/atoms/dataset

# Module: src/atoms/dataset

## Table of contents

### Type Aliases

- [Dataset](src_atoms_dataset.md#dataset)
- [DatasetParams](src_atoms_dataset.md#datasetparams)
- [DatasetResult](src_atoms_dataset.md#datasetresult)

### Functions

- [datasets](src_atoms_dataset.md#datasets)

## Type Aliases

### Dataset

Ƭ **Dataset**: [`DatasetParams`](src_atoms_dataset.md#datasetparams) & [`DatasetResult`](src_atoms_dataset.md#datasetresult)

Dataset instance

#### Defined in

[src/atoms/dataset.ts:42](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/dataset.ts#L42)

___

### DatasetParams

Ƭ **DatasetParams**: `Object`

Dataset parameters to load

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `path` | `string` |
| `payload?` | `Record`<`string`, `string` \| `number`\> |
| `source` | ``"GOES-16"`` \| ``"ERA5"`` |
| `type` | ``"h3"`` \| ``"grid"`` \| ``"contour"`` \| ``"raw"`` |
| `variable?` | `string` |

#### Defined in

[src/atoms/dataset.ts:10](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/dataset.ts#L10)

___

### DatasetResult

Ƭ **DatasetResult**: { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `buffer`: `ArrayBuffer` \| `SharedArrayBuffer` ; `count`: `number` ; `key`: `string` ; `type`: ``"h3"`` \| ``"grid"`` \| ``"raw"``  } \| { `features`: `BinaryFeatures` ; `type`: ``"contour"``  }

#### Defined in

[src/atoms/dataset.ts:19](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/dataset.ts#L19)

## Functions

### datasets

▸ **datasets**(`param`): `Atom`<`Promise`<[`DatasetParams`](src_atoms_dataset.md#datasetparams) & { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer` ; `count`: `number` ; `key`: `string` ; `type`: ``"h3"`` \| ``"grid"`` \| ``"raw"``  } & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer`  } \| [`DatasetParams`](src_atoms_dataset.md#datasetparams) & { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `features`: `BinaryFeatures` ; `type`: ``"contour"``  }\>\>

Dataset atom family (dictionary)

#### Parameters

| Name | Type |
| :------ | :------ |
| `param` | [`DatasetParams`](src_atoms_dataset.md#datasetparams) |

#### Returns

`Atom`<`Promise`<[`DatasetParams`](src_atoms_dataset.md#datasetparams) & { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer` ; `count`: `number` ; `key`: `string` ; `type`: ``"h3"`` \| ``"grid"`` \| ``"raw"``  } & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer`  } \| [`DatasetParams`](src_atoms_dataset.md#datasetparams) & { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `features`: `BinaryFeatures` ; `type`: ``"contour"``  }\>\>

#### Defined in

node_modules/jotai/vanilla/utils/atomFamily.d.ts:4
