// import reanalysisEra5Land from "datasets/reanalysis-era5-land.json";

type Env = {
  CDS_API_KEY: string;
  R2: R2Bucket;
};

type CDSReply =
  | {
      state: "queued" | "running";
    }
  | {
      state: "completed";
      location: string;
    }
  | {
      state: "failed";
      message: string;
      reason: string;
    };

export const onRequest: PagesFunction<Env> = async (context) => {
  const [dataset, variable, year, month, day, time] = context.params.params;
  const key = `cds/${dataset}/${variable}/${year}/${month}/${day}/${time}.nc.zip`;

  let object = await context.env.R2.get(key);

  if (!object) {
    const response = await fetch(
      `https://cds.climate.copernicus.eu/api/v2/resources/${dataset}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${btoa(context.env.CDS_API_KEY)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variable,
          year,
          month,
          day,
          time,
          format: "netcdf.zip",
        }),
      }
    );

    const json = await response.json<CDSReply>();

    if (json.state === "completed") {
      const response = await fetch(json.location);
      await context.env.R2.put(key, response.body, {
        httpMetadata: {
          contentType: "application/zip",
          contentDisposition: `attachment; filename="${key}"`,
        },
      });

      object = await context.env.R2.get(key);
    } else {
      return response;
    }
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);

  return new Response(object.body, { headers });
};
