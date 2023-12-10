declare namespace NodeJS {
  export interface ProcessEnv {
    PG_USER: string;
    PG_PASSWORD: string;
    PG_HOST: string;
    PG_PORT: string;
    PG_DATABASE: string;
    SESSION_SECRET: string;
    NODE_ENV: string;
    GCS_BUCKET: string;
    GCLOUD_PROJECT: string;
    PORT?: string;
  }
}
