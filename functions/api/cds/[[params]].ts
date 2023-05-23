type Env = {
  CDS_API_KEY: string;
  R2: R2Bucket;
};

/**
 * Reply from the CDS API.
 */
type CDSReply =
  | {
      state: "queued" | "running";
      request_id: string;
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

/** 
 * Handles incoming requests and retrieves data from the CDS API.
 * @param context.params.params - `${dataset}/${variable}/${year}/${month}/${day}/${time}`
 * @returns CDS API response.
 */
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

    let json = await response.json<CDSReply>();

    if (json.state === "queued" || json.state === "running") {
      const requestId = json.request_id;
      for (let i = 0; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        const response = await fetch(
          `https://cds.climate.copernicus.eu/api/v2/tasks/${requestId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Basic ${btoa(context.env.CDS_API_KEY)}`,
              "Content-Type": "application/json",
            },
          }
        );
        json = await response.json<CDSReply>();
        if (json.state === "completed" || json.state === "failed") {
          break;
        }
      }
    }

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
      return Response.json(json, { status: 400 });
    }
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);

  return new Response(object.body, { headers });
};
