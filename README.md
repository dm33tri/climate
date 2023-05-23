
<a name="readmemd"></a>

climate / [Modules](#modulesmd)

[Docs]()


<a name="modulesmd"></a>

[climate](#readmemd) / Modules

# climate

## Table of contents

### Modules

- [src](#modulessrcmd)
- [src/atoms/dataset](#modulessrc_atoms_datasetmd)
- [src/atoms/datetime](#modulessrc_atoms_datetimemd)
- [src/atoms/layer](#modulessrc_atoms_layermd)
- [src/atoms/ui](#modulessrc_atoms_uimd)
- [src/components/AddLayerButton](#modulessrc_components_addlayerbuttonmd)
- [src/components/EditLayerButton](#modulessrc_components_editlayerbuttonmd)
- [src/components/Layer](#modulessrc_components_layermd)
- [src/components/Layout](#modulessrc_components_layoutmd)
- [src/components/Map](#modulessrc_components_mapmd)
- [src/components/Palette](#modulessrc_components_palettemd)
- [src/components/Side](#modulessrc_components_sidemd)
- [src/loaders/era5](#modulessrc_loaders_era5md)
- [src/loaders/goes](#modulessrc_loaders_goesmd)
- [src/loaders/modis](#modulessrc_loaders_modismd)
- [src/loaders/utils](#modulessrc_loaders_utilsmd)
- [src/utils/colors](#modulessrc_utils_colorsmd)
- [src/utils/contour](#modulessrc_utils_contourmd)
- [src/utils/grid](#modulessrc_utils_gridmd)
- [src/utils/h3bin](#modulessrc_utils_h3binmd)
- [src/utils/layer](#modulessrc_utils_layermd)
- [src/worker](#modulessrc_workermd)
- [src/worker/worker](#modulessrc_worker_workermd)

# Modules


<a name="modulessrcmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src

## Module: src

### Table of contents

#### Functions

- [Root](#root)

### Functions

#### Root

▸ **Root**(): `Element`

Root component

##### Returns

`Element`

##### Defined in

[src/index.tsx:15](https://github.com/dm33tri/climate/blob/a558f70/src/index.tsx#L15)


<a name="modulessrc_atoms_datasetmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/atoms/dataset

## Module: src/atoms/dataset

### Table of contents

#### Type Aliases

- [Dataset](#dataset)
- [DatasetParams](#datasetparams)
- [DatasetResult](#datasetresult)

#### Functions

- [datasets](#datasets)

### Type Aliases

#### Dataset

Ƭ **Dataset**: [`DatasetParams`](#datasetparams) & [`DatasetResult`](#datasetresult)

Dataset instance

##### Defined in

[src/atoms/dataset.ts:42](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/dataset.ts#L42)

___

#### DatasetParams

Ƭ **DatasetParams**: `Object`

Dataset parameters to load

##### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `path` | `string` |
| `payload?` | `Record`<`string`, `string` \| `number`\> |
| `source` | ``"GOES-16"`` \| ``"ERA5"`` |
| `type` | ``"h3"`` \| ``"grid"`` \| ``"contour"`` \| ``"raw"`` |
| `variable?` | `string` |

##### Defined in

[src/atoms/dataset.ts:10](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/dataset.ts#L10)

___

#### DatasetResult

Ƭ **DatasetResult**: { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `buffer`: `ArrayBuffer` \| `SharedArrayBuffer` ; `count`: `number` ; `key`: `string` ; `type`: ``"h3"`` \| ``"grid"`` \| ``"raw"``  } \| { `features`: `BinaryFeatures` ; `type`: ``"contour"``  }

##### Defined in

[src/atoms/dataset.ts:19](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/dataset.ts#L19)

### Functions

#### datasets

▸ **datasets**(`param`): `Atom`<`Promise`<[`DatasetParams`](#datasetparams) & { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer` ; `count`: `number` ; `key`: `string` ; `type`: ``"h3"`` \| ``"grid"`` \| ``"raw"``  } & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer`  } \| [`DatasetParams`](#datasetparams) & { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `features`: `BinaryFeatures` ; `type`: ``"contour"``  }\>\>

Dataset atom family (dictionary)

##### Parameters

| Name | Type |
| :------ | :------ |
| `param` | [`DatasetParams`](#datasetparams) |

##### Returns

`Atom`<`Promise`<[`DatasetParams`](#datasetparams) & { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer` ; `count`: `number` ; `key`: `string` ; `type`: ``"h3"`` \| ``"grid"`` \| ``"raw"``  } & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer`  } \| [`DatasetParams`](#datasetparams) & { `availableDates?`: `Date`[] ; `date`: `Date` ; `key`: `string` ; `max`: `number` ; `min`: `number` ; `variables?`: `string`[]  } & { `features`: `BinaryFeatures` ; `type`: ``"contour"``  }\>\>

##### Defined in

node_modules/jotai/vanilla/utils/atomFamily.d.ts:4


<a name="modulessrc_atoms_datetimemd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/atoms/datetime

## Module: src/atoms/datetime

### Table of contents

#### Variables

- [datetime](#datetime)

### Variables

#### datetime

• `Const` **datetime**: `WritableAtom`<`Dayjs`, [date: Dayjs], `void`\>

Global date and time

##### Defined in

[src/atoms/datetime.ts:10](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/datetime.ts#L10)


<a name="modulessrc_atoms_layermd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/atoms/layer

## Module: src/atoms/layer

### Table of contents

#### Type Aliases

- [Add](#add)
- [Edit](#edit)
- [Init](#init)
- [Layer](#layer)
- [LayerSettings](#layersettings)
- [Remove](#remove)
- [Update](#update)

#### Variables

- [default](#default)
- [edit](#edit-1)
- [layers](#layers)

### Type Aliases

#### Add

Ƭ **Add**: `Object`

Action to add a new layer

##### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | ``"add"`` |
| `layer` | [`LayerSettings`](#layersettings) |

##### Defined in

[src/atoms/layer.ts:52](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L52)

___

#### Edit

Ƭ **Edit**: `Object`

Action to edit a layer

##### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | ``"edit"`` |
| `layer` | `Partial`<[`LayerSettings`](#layersettings)\> & `Pick`<[`LayerSettings`](#layersettings), ``"key"``\> |

##### Defined in

[src/atoms/layer.ts:60](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L60)

___

#### Init

Ƭ **Init**: `Object`

Action to initialize layer settings on startup

##### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | ``"init"`` |

##### Defined in

[src/atoms/layer.ts:45](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L45)

___

#### Layer

Ƭ **Layer**: [`LayerSettings`](#layersettings) & { `dataset?`: [`Dataset`](#dataset) ; `layer?`: `DeckGLLayer` ; `state`: ``"loading"`` \| ``"loaded"`` \| ``"error"``  }

Layer instance

##### Defined in

[src/atoms/layer.ts:31](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L31)

___

#### LayerSettings

Ƭ **LayerSettings**: `Object`

Layer settings

##### Type declaration

| Name | Type |
| :------ | :------ |
| `day?` | `string` |
| `key` | `string` |
| `month?` | `string` |
| `name` | `string` |
| `opacity` | `number` |
| `palette` | `string` |
| `product` | `string` |
| `time?` | `string` |
| `type` | ``"h3"`` \| ``"grid"`` \| ``"contour"`` \| ``"raw"`` |
| `variable?` | `string` |
| `visible` | `boolean` |
| `year?` | `string` |

##### Defined in

[src/atoms/layer.ts:12](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L12)

___

#### Remove

Ƭ **Remove**: `Object`

Action to remove a layer

##### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | ``"remove"`` |
| `layer` | `Partial`<[`LayerSettings`](#layersettings)\> & `Pick`<[`LayerSettings`](#layersettings), ``"key"``\> |

##### Defined in

[src/atoms/layer.ts:68](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L68)

___

#### Update

Ƭ **Update**: [`Init`](#init) \| [`Add`](#add) \| [`Edit`](#edit) \| [`Remove`](#remove)

Layer settings update action payload

##### Defined in

[src/atoms/layer.ts:76](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L76)

### Variables

#### default

• **default**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `edit` | `PrimitiveAtom`<``null`` \| `Partial`<[`LayerSettings`](#layersettings)\>\> & `WithInitialValue`<``null`` \| `Partial`<[`LayerSettings`](#layersettings)\>\> |
| `layers` | `WritableAtom`<[`Layer`](#layer)[], [update: Update], `void`\> |

##### Defined in

[src/atoms/layer.ts:220](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L220)

___

#### edit

• `Const` **edit**: `PrimitiveAtom`<``null`` \| `Partial`<[`LayerSettings`](#layersettings)\>\> & `WithInitialValue`<``null`` \| `Partial`<[`LayerSettings`](#layersettings)\>\>

Layer settings being edited or created

##### Defined in

[src/atoms/layer.ts:166](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L166)

___

#### layers

• `Const` **layers**: `WritableAtom`<[`Layer`](#layer)[], [update: Update], `void`\>

Layer settings array atom

##### Defined in

[src/atoms/layer.ts:171](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L171)


<a name="modulessrc_atoms_uimd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/atoms/ui

## Module: src/atoms/ui

### Table of contents

#### Variables

- [default](#default)
- [projection](#projection)

### Variables

#### default

• **default**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `projection` | `WritableAtom`<``"mercator"`` \| ``"globe"``, [`SetStateActionWithReset`<``"mercator"`` \| ``"globe"``\>], `void`\> |

##### Defined in

[src/atoms/ui.ts:11](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/ui.ts#L11)

___

#### projection

• `Const` **projection**: `WritableAtom`<``"mercator"`` \| ``"globe"``, [`SetStateActionWithReset`<``"mercator"`` \| ``"globe"``\>], `void`\>

Projection of the map

##### Defined in

[src/atoms/ui.ts:6](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/ui.ts#L6)


<a name="modulessrc_components_addlayerbuttonmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/components/AddLayerButton

## Module: src/components/AddLayerButton

### Table of contents

#### Functions

- [AddLayerButton](#addlayerbutton)

### Functions

#### AddLayerButton

▸ **AddLayerButton**(): `Element`

Renders a button to add a new layer.

##### Returns

`Element`

The rendered component.

##### Defined in

[src/components/AddLayerButton.tsx:11](https://github.com/dm33tri/climate/blob/a558f70/src/components/AddLayerButton.tsx#L11)


<a name="modulessrc_components_editlayerbuttonmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/components/EditLayerButton

## Module: src/components/EditLayerButton

### Table of contents

#### Functions

- [EditLayerButton](#editlayerbutton)

### Functions

#### EditLayerButton

▸ **EditLayerButton**(`«destructured»`): `Element`

Renders a button that, when clicked, sets the `edit` atom to the values of the provided `layer`.

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `layer` | [`Layer`](#layer) |

##### Returns

`Element`

The rendered button.

##### Defined in

[src/components/EditLayerButton.tsx:11](https://github.com/dm33tri/climate/blob/a558f70/src/components/EditLayerButton.tsx#L11)


<a name="modulessrc_components_layermd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/components/Layer

## Module: src/components/Layer

### Table of contents

#### Functions

- [Layer](#layer)

### Functions

#### Layer

▸ **Layer**(): `Element`

Renders a drawer to edit a layer.

##### Returns

`Element`

The rendered component.

##### Defined in

[src/components/Layer.tsx:26](https://github.com/dm33tri/climate/blob/a558f70/src/components/Layer.tsx#L26)


<a name="modulessrc_components_layoutmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/components/Layout

## Module: src/components/Layout

### Table of contents

#### Functions

- [Layout](#layout)

### Functions

#### Layout

▸ **Layout**(): `Element`

Renders the application layout.

##### Returns

`Element`

##### Defined in

[src/components/Layout.tsx:10](https://github.com/dm33tri/climate/blob/a558f70/src/components/Layout.tsx#L10)


<a name="modulessrc_components_mapmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/components/Map

## Module: src/components/Map

### Table of contents

#### Functions

- [Map](#map)

### Functions

#### Map

▸ **Map**(): `Element`

Renders the map.

**`See`**

https://deck.gl/docs/api-reference/core/deck

##### Returns

`Element`

The rendered component.

##### Defined in

[src/components/Map.tsx:57](https://github.com/dm33tri/climate/blob/a558f70/src/components/Map.tsx#L57)


<a name="modulessrc_components_palettemd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/components/Palette

## Module: src/components/Palette

### Table of contents

#### Functions

- [Palette](#palette)

### Functions

#### Palette

▸ **Palette**(`props`): `Element`

Renders a palette selector.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Omit`<`SelectProps`<`any`, `DefaultOptionType`\>, ``"options"``\> | The props to pass to the `Select` component. |

##### Returns

`Element`

The rendered palette selector.

##### Defined in

[src/components/Palette.tsx:52](https://github.com/dm33tri/climate/blob/a558f70/src/components/Palette.tsx#L52)


<a name="modulessrc_components_sidemd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/components/Side

## Module: src/components/Side

### Table of contents

#### Functions

- [Side](#side)

### Functions

#### Side

▸ **Side**(): `Element`

Renders the side panel which contains the layer list and global controls.

##### Returns

`Element`

The rendered side panel.

##### Defined in

[src/components/Side.tsx:28](https://github.com/dm33tri/climate/blob/a558f70/src/components/Side.tsx#L28)


<a name="modulessrc_loaders_era5md"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/loaders/era5

## Module: src/loaders/era5

### Table of contents

#### Functions

- [loadEra5Data](#loadera5data)

### Functions

#### loadEra5Data

▸ **loadEra5Data**(`path`, `initialVariable?`): `Promise`<{ `data`: [`number`, `number`, `number`][] ; `max`: `number` ; `min`: `number` ; `variables`: `string`[]  }\>

Load ERA5 data from the CDS API using proxy worker.

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `initialVariable?` | `string` |

##### Returns

`Promise`<{ `data`: [`number`, `number`, `number`][] ; `max`: `number` ; `min`: `number` ; `variables`: `string`[]  }\>

##### Defined in

[src/loaders/era5.ts:7](https://github.com/dm33tri/climate/blob/a558f70/src/loaders/era5.ts#L7)


<a name="modulessrc_loaders_goesmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/loaders/goes

## Module: src/loaders/goes

### Table of contents

#### Functions

- [loadGoesData](#loadgoesdata)

### Functions

#### loadGoesData

▸ **loadGoesData**(`path`, `initialVariable?`): `Promise`<{ `data`: [`number`, `number`, `number`][] = result; `max`: `number` ; `min`: `number` ; `variables`: `string`[]  }\>

Load GOES data from S3 bucket.

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `initialVariable?` | `string` |

##### Returns

`Promise`<{ `data`: [`number`, `number`, `number`][] = result; `max`: `number` ; `min`: `number` ; `variables`: `string`[]  }\>

##### Defined in

[src/loaders/goes.ts:14](https://github.com/dm33tri/climate/blob/a558f70/src/loaders/goes.ts#L14)


<a name="modulessrc_loaders_modismd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/loaders/modis

## Module: src/loaders/modis


<a name="modulessrc_loaders_utilsmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/loaders/utils

## Module: src/loaders/utils

### Table of contents

#### Functions

- [getGeosProjection](#getgeosprojection)
- [getValue](#getvalue)

### Functions

#### getGeosProjection

▸ **getGeosProjection**(`file`): `Object`

Extract projection from geostaionary satellite data.

##### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `longitudeOfProjectionOrigin` | `number` |
| `perspectivePointHeight` | `number` |
| `projection` | `Converter` |
| `semiMajorAxis` | `number` |
| `semiMinorAxis` | `number` |
| `sweepAngleAxis` | `string` |

##### Defined in

[src/loaders/utils.ts:29](https://github.com/dm33tri/climate/blob/a558f70/src/loaders/utils.ts#L29)

___

#### getValue

▸ **getValue**(`file`, `path`): { `fill`: `undefined` ; `offset`: `number` ; `scale`: `number` ; `value`: `Float32Array`  } \| { `fill`: `number` ; `offset`: `number` ; `scale`: `number` ; `value`: `Float32Array`  }

Extract value from HDF5/netCDF4 dataset.

##### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `File` |
| `path` | `string` |

##### Returns

{ `fill`: `undefined` ; `offset`: `number` ; `scale`: `number` ; `value`: `Float32Array`  } \| { `fill`: `number` ; `offset`: `number` ; `scale`: `number` ; `value`: `Float32Array`  }

##### Defined in

[src/loaders/utils.ts:7](https://github.com/dm33tri/climate/blob/a558f70/src/loaders/utils.ts#L7)


<a name="modulessrc_utils_colorsmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/utils/colors

## Module: src/utils/colors

### Table of contents

#### Variables

- [colors](#colors)

### Variables

#### colors

• `Const` **colors**: `Record`<`string`, `Record`<`string`, `string`[]\>\>

Color palettes for use in charts.

##### Defined in

[src/utils/colors.ts:6](https://github.com/dm33tri/climate/blob/a558f70/src/utils/colors.ts#L6)


<a name="modulessrc_utils_contourmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/utils/contour

## Module: src/utils/contour

### Table of contents

#### Functions

- [contour](#contour)

### Functions

#### contour

▸ **contour**(`data`, `«destructured»`): `Object`

Create isolines from a grid of points.

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`number`, `number`, `number`][] |
| `«destructured»` | `Object` |
| › `breaks` | `number` |
| › `max` | `number` |
| › `min` | `number` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `features` | `BinaryFeatures` |

##### Defined in

[src/utils/contour.ts:7](https://github.com/dm33tri/climate/blob/a558f70/src/utils/contour.ts#L7)


<a name="modulessrc_utils_gridmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/utils/grid

## Module: src/utils/grid

### Table of contents

#### Functions

- [gridBin](#gridbin)

### Functions

#### gridBin

▸ **gridBin**(`data`, `buffer`, `«destructured»`): `Object`

convert array of [lon, lat, value] to binary grid

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`number`, `number`, `number`][] |
| `buffer` | `SharedArrayBuffer` \| `ArrayBuffer` |
| `«destructured»` | `Object` |
| › `resolution` | `number` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `buffer` | `SharedArrayBuffer` \| `ArrayBuffer` |
| `count` | `number` |
| `resolution` | `number` |
| `type` | ``"grid"`` |

##### Defined in

[src/utils/grid.ts:4](https://github.com/dm33tri/climate/blob/a558f70/src/utils/grid.ts#L4)


<a name="modulessrc_utils_h3binmd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/utils/h3bin

## Module: src/utils/h3bin

### Table of contents

#### Functions

- [h3bin](#h3bin)

### Functions

#### h3bin

▸ **h3bin**(`data`, `buffer`, `«destructured»`): `Object`

create a hexagonal grid from a list of points

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`number`, `number`, `number`][] |
| `buffer` | `SharedArrayBuffer` \| `ArrayBuffer` |
| `«destructured»` | `Object` |
| › `resolution` | `number` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `buffer` | `SharedArrayBuffer` \| `ArrayBuffer` |
| `count` | `number` |
| `resolution` | `number` |
| `type` | ``"h3"`` |

##### Defined in

[src/utils/h3bin.ts:6](https://github.com/dm33tri/climate/blob/a558f70/src/utils/h3bin.ts#L6)


<a name="modulessrc_utils_layermd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/utils/layer

## Module: src/utils/layer

### Table of contents

#### Functions

- [getDeckGlLayer](#getdeckgllayer)
- [getParams](#getparams)

### Functions

#### getDeckGlLayer

▸ **getDeckGlLayer**(`dataset`, `layerSettings`): `DeckGLLayer` \| `undefined`

instantiate a deck.gl layer to render a dataset

##### Parameters

| Name | Type |
| :------ | :------ |
| `dataset` | [`Dataset`](#dataset) |
| `layerSettings` | [`LayerSettings`](#layersettings) |

##### Returns

`DeckGLLayer` \| `undefined`

##### Defined in

[src/utils/layer.ts:65](https://github.com/dm33tri/climate/blob/a558f70/src/utils/layer.ts#L65)

___

#### getParams

▸ **getParams**(`layer`, `date`): [`DatasetParams`](#datasetparams) \| `undefined`

calculate parameters to pass to the loader

##### Parameters

| Name | Type |
| :------ | :------ |
| `layer` | `Partial`<[`LayerSettings`](#layersettings)\> |
| `date` | `Dayjs` |

##### Returns

[`DatasetParams`](#datasetparams) \| `undefined`

##### Defined in

[src/utils/layer.ts:16](https://github.com/dm33tri/climate/blob/a558f70/src/utils/layer.ts#L16)


<a name="modulessrc_workermd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/worker

## Module: src/worker

### Table of contents

#### Type Aliases

- [Error](#error)
- [Request](#request)
- [Response](#response)

#### Functions

- [load](#load)

### Type Aliases

#### Error

Ƭ **Error**: [`DatasetParams`](#datasetparams) & { `error`: `any`  }

Response from the worker in case of error

##### Defined in

[src/worker/index.ts:13](https://github.com/dm33tri/climate/blob/a558f70/src/worker/index.ts#L13)

___

#### Request

Ƭ **Request**: [`DatasetParams`](#datasetparams) & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer`  }

Request to load a dataset

##### Defined in

[src/worker/index.ts:6](https://github.com/dm33tri/climate/blob/a558f70/src/worker/index.ts#L6)

___

#### Response

Ƭ **Response**: [`DatasetParams`](#datasetparams) & [`DatasetResult`](#datasetresult) & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer`  }

Response from the worker

##### Defined in

[src/worker/index.ts:18](https://github.com/dm33tri/climate/blob/a558f70/src/worker/index.ts#L18)

### Functions

#### load

▸ **load**(`request`): `Promise`<[`Response`](#response)\>

Load a dataset using a worker

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`Request`](#request) |

##### Returns

`Promise`<[`Response`](#response)\>

##### Defined in

[src/worker/index.ts:44](https://github.com/dm33tri/climate/blob/a558f70/src/worker/index.ts#L44)


<a name="modulessrc_worker_workermd"></a>

[climate](#readmemd) / [Modules](#modulesmd) / src/worker/worker

## Module: src/worker/worker

### Table of contents

#### Variables

- [elementSize](#elementsize)

### Variables

#### elementSize

• `Const` **elementSize**: `Object`

Size of each element in the buffer

##### Type declaration

| Name | Type |
| :------ | :------ |
| `grid` | `number` |
| `h3` | `number` |

##### Defined in

[src/worker/worker.ts:12](https://github.com/dm33tri/climate/blob/a558f70/src/worker/worker.ts#L12)
