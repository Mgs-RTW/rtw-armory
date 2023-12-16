import stream from "stream";
import { Storage, File } from "@google-cloud/storage";

const STORAGE_BASE_URL = "https://storage.googleapis.com";

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFile: "keys/gcs-sa.json",
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

type Area = "commander" | "unit" | "gear" | "background" | "icon";

interface Options {
  area: Area;
  file: Express.Multer.File;
}

export interface CloudFile {
  file: File;
  url: string;
}

export async function uploadFile({ area, file }: Options): Promise<CloudFile> {
  return new Promise((resolve, reject) => {
    const destination = `application-uploads/${area}/${Date.now()}_${
      file.originalname
    }`;
    const gcsFile = bucket.file(destination);

    const passthroughStream = new stream.PassThrough();
    passthroughStream.write(file.buffer);
    passthroughStream.end();

    passthroughStream
      .pipe(gcsFile.createWriteStream())
      .on("finish", () => {
        gcsFile
          .makePublic()
          .then(() =>
            resolve({
              file: gcsFile,
              url: `${STORAGE_BASE_URL}/${process.env.GCS_BUCKET}/${destination}`,
            })
          )
          .catch((err) => reject(err));
      })
      .on("error", (error) => reject(error));

    /*
    const fileStream = gcsFile.createWriteStream({
      metadata: { contentType: file.mimetype },
      resumable: false,
    });
    fileStream.write(file.buffer);

    fileStream.on("error", (error) => reject(error));
    fileStream.on("finish", async () => {
      await gcsFile.makePublic();
      resolve({
        file: gcsFile,
        url: `${STORAGE_BASE_URL}/${process.env.GCS_BUCKET}/${destination}`,
      });
      fileStream.end();
    });
    */
  });
}
