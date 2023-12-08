declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_URL: string;
    SESSION_SECRET: string;
    NODE_ENV: string;
    PORT?: string;
  }
}
