import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-cloud-storage';
import { Request } from "express";

const validAreas = [
    "commander",
    "unit",
    "gear",
    "background",
    "icon"
]

function getDestinationFolderFromArea(area: string) {
    if (!area || !validAreas.includes(area)) {
        throw new Error('Could not find valid area to save file in.')
    }
    return `application-uploads/${area.toString()}/`
}

export function singleFileUploadHandler(): any {
    const gcs: MulterGoogleCloudStorage = new MulterGoogleCloudStorage({
        bucket: process.env.GCS,
        projectId: process.env.GCLOUD_PROJECT,
        keyFile: "keys/gcs-sa.json",
        destination: function (req: Request, file: any, cb: any) {
            const area = req.query.area;
            if (!area) {
                throw Error('No Area sent to request file uppload.')
            }
            const destinationPath = getDestinationFolderFromArea(area.toString());
            cb(null, destinationPath);
        },
        filename: (req: Request, file: any, cb: any) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
        retryOptions: { autoRetry: true, maxRetries: 2 }
    })

    const uploadHandler = multer({
        storage: gcs,
    });
    return uploadHandler.single('image');
}