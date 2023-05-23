[climate](../README.md) / [Modules](../modules.md) / src/utils/layer

# Module: src/utils/layer

## Table of contents

### Functions

- [getDeckGlLayer](src_utils_layer.md#getdeckgllayer)
- [getParams](src_utils_layer.md#getparams)

## Functions

### getDeckGlLayer

▸ **getDeckGlLayer**(`dataset`, `layerSettings`): `DeckGLLayer` \| `undefined`

instantiate a deck.gl layer to render a dataset

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataset` | [`Dataset`](src_atoms_dataset.md#dataset) |
| `layerSettings` | [`LayerSettings`](src_atoms_layer.md#layersettings) |

#### Returns

`DeckGLLayer` \| `undefined`

#### Defined in

[src/utils/layer.ts:65](https://github.com/dm33tri/climate/blob/a558f70/src/utils/layer.ts#L65)

___

### getParams

▸ **getParams**(`layer`, `date`): [`DatasetParams`](src_atoms_dataset.md#datasetparams) \| `undefined`

calculate parameters to pass to the loader

#### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | `Partial`<[`LayerSettings`](src_atoms_layer.md#layersettings)\> |
| `date` | `Dayjs` |

#### Returns

[`DatasetParams`](src_atoms_dataset.md#datasetparams) \| `undefined`

#### Defined in

[src/utils/layer.ts:16](https://github.com/dm33tri/climate/blob/a558f70/src/utils/layer.ts#L16)
