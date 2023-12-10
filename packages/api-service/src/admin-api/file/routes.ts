import { Router } from "express";
import { singleFileUploadHandler } from './upload-handler';

export const initFileRoutes = (router: Router) => {
    router.route('/file').post(singleFileUploadHandler(), (req: any, res: any) => {
        res.json(res.req.file);
    });
};