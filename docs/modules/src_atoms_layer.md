[climate](../README.md) / [Modules](../modules.md) / src/atoms/layer

# Module: src/atoms/layer

## Table of contents

### Type Aliases

- [Add](src_atoms_layer.md#add)
- [Edit](src_atoms_layer.md#edit)
- [Init](src_atoms_layer.md#init)
- [Layer](src_atoms_layer.md#layer)
- [LayerSettings](src_atoms_layer.md#layersettings)
- [Remove](src_atoms_layer.md#remove)
- [Update](src_atoms_layer.md#update)

### Variables

- [default](src_atoms_layer.md#default)
- [edit](src_atoms_layer.md#edit-1)
- [layers](src_atoms_layer.md#layers)

## Type Aliases

### Add

Ƭ **Add**: `Object`

Action to add a new layer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | ``"add"`` |
| `layer` | [`LayerSettings`](src_atoms_layer.md#layersettings) |

#### Defined in

[src/atoms/layer.ts:52](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L52)

___

### Edit

Ƭ **Edit**: `Object`

Action to edit a layer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | ``"edit"`` |
| `layer` | `Partial`<[`LayerSettings`](src_atoms_layer.md#layersettings)\> & `Pick`<[`LayerSettings`](src_atoms_layer.md#layersettings), ``"key"``\> |

#### Defined in

[src/atoms/layer.ts:60](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L60)

___

### Init

Ƭ **Init**: `Object`

Action to initialize layer settings on startup

#### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | ``"init"`` |

#### Defined in

[src/atoms/layer.ts:45](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L45)

___

### Layer

Ƭ **Layer**: [`LayerSettings`](src_atoms_layer.md#layersettings) & { `dataset?`: [`Dataset`](src_atoms_dataset.md#dataset) ; `layer?`: `DeckGLLayer` ; `state`: ``"loading"`` \| ``"loaded"`` \| ``"error"``  }

Layer instance

#### Defined in

[src/atoms/layer.ts:31](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L31)

___

### LayerSettings

Ƭ **LayerSettings**: `Object`

Layer settings

#### Type declaration

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

#### Defined in

[src/atoms/layer.ts:12](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L12)

___

### Remove

Ƭ **Remove**: `Object`

Action to remove a layer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | ``"remove"`` |
| `layer` | `Partial`<[`LayerSettings`](src_atoms_layer.md#layersettings)\> & `Pick`<[`LayerSettings`](src_atoms_layer.md#layersettings), ``"key"``\> |

#### Defined in

[src/atoms/layer.ts:68](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L68)

___

### Update

Ƭ **Update**: [`Init`](src_atoms_layer.md#init) \| [`Add`](src_atoms_layer.md#add) \| [`Edit`](src_atoms_layer.md#edit) \| [`Remove`](src_atoms_layer.md#remove)

Layer settings update action payload

#### Defined in

[src/atoms/layer.ts:76](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L76)

## Variables

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `edit` | `PrimitiveAtom`<``null`` \| `Partial`<[`LayerSettings`](src_atoms_layer.md#layersettings)\>\> & `WithInitialValue`<``null`` \| `Partial`<[`LayerSettings`](src_atoms_layer.md#layersettings)\>\> |
| `layers` | `WritableAtom`<[`Layer`](src_atoms_layer.md#layer)[], [update: Update], `void`\> |

#### Defined in

[src/atoms/layer.ts:220](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L220)

___

### edit

• `Const` **edit**: `PrimitiveAtom`<``null`` \| `Partial`<[`LayerSettings`](src_atoms_layer.md#layersettings)\>\> & `WithInitialValue`<``null`` \| `Partial`<[`LayerSettings`](src_atoms_layer.md#layersettings)\>\>

Layer settings being edited or created

#### Defined in

[src/atoms/layer.ts:166](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L166)

___

### layers

• `Const` **layers**: `WritableAtom`<[`Layer`](src_atoms_layer.md#layer)[], [update: Update], `void`\>

Layer settings array atom

#### Defined in

[src/atoms/layer.ts:171](https://github.com/dm33tri/climate/blob/a558f70/src/atoms/layer.ts#L171)
