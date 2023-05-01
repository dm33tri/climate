```typescript
for (const item of list) {
  const name = item.split("/").at(-1) as string;
  const data = await fetch(item).then((data) => data.arrayBuffer());
  FS.writeFile(name, new Uint8Array(data));
  const file = new h5wasm.File(name, "r");

  const longitudes = (file.get("mod04/Geolocation Fields/Longitude") as Dataset)
    .value as Float32Array;
  const latitudes = (file.get("mod04/Geolocation Fields/Latitude") as Dataset)
    .value as Float32Array;

  const dataset = file.get(
    "mod04/Data Fields/Aerosol_Cloud_Fraction_Land"
  ) as Dataset;

  const fillValue = dataset.attrs["_FillValue"].value as number;
  const values = dataset.value as Int16Array;

  for (let i = 0; i < values.length; ++i) {
    if (values[i] && values[i] !== fillValue) {
      result.push([longitudes[i], latitudes[i], values[i]]);
    }
  }

  file.close();
}
```
