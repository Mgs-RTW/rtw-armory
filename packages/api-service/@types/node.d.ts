declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_URL: string;
    PORT?: string;
  }
}
