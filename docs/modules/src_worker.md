[climate](../README.md) / [Modules](../modules.md) / src/worker

# Module: src/worker

## Table of contents

### Type Aliases

- [Error](src_worker.md#error)
- [Request](src_worker.md#request)
- [Response](src_worker.md#response)

### Functions

- [load](src_worker.md#load)

## Type Aliases

### Error

Ƭ **Error**: [`DatasetParams`](src_atoms_dataset.md#datasetparams) & { `error`: `any`  }

Response from the worker in case of error

#### Defined in

[src/worker/index.ts:13](https://github.com/dm33tri/climate/blob/a558f70/src/worker/index.ts#L13)

___

### Request

Ƭ **Request**: [`DatasetParams`](src_atoms_dataset.md#datasetparams) & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer`  }

Request to load a dataset

#### Defined in

[src/worker/index.ts:6](https://github.com/dm33tri/climate/blob/a558f70/src/worker/index.ts#L6)

___

### Response

Ƭ **Response**: [`DatasetParams`](src_atoms_dataset.md#datasetparams) & [`DatasetResult`](src_atoms_dataset.md#datasetresult) & { `buffer`: `SharedArrayBuffer` \| `ArrayBuffer`  }

Response from the worker

#### Defined in

[src/worker/index.ts:18](https://github.com/dm33tri/climate/blob/a558f70/src/worker/index.ts#L18)

## Functions

### load

▸ **load**(`request`): `Promise`<[`Response`](src_worker.md#response)\>

Load a dataset using a worker

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`Request`](src_worker.md#request) |

#### Returns

`Promise`<[`Response`](src_worker.md#response)\>

#### Defined in

[src/worker/index.ts:44](https://github.com/dm33tri/climate/blob/a558f70/src/worker/index.ts#L44)
