import fs from "fs";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL);

type Migration = {
  id: string;
  created: Date;
  modified: Date;
  version: number;
  filename: string;
};

type File = {
  version: number;
  filename: string;
};

function getMigrationsInOrder(fromVersion?: number): File[] {
  console.log(`Retreiving migration files since version ${fromVersion}`);

  // Regex to match <version>_<decsription>.sql
  const migrationFileRegex = /^\d+_.+\.sql$/;

  const sortedFiles: File[] = fs
    .readdirSync("migrations")
    .filter((file) => migrationFileRegex.test(file))
    .map((file) => ({
      version: parseInt(file.split("_")[0] || "-1"),
      filename: file,
    }))
    .sort((a, b) => a.version - b.version);

  if (fromVersion) {
    return sortedFiles.filter((file) => file.version > fromVersion);
  }

  if (sortedFiles.length === 0) {
    console.log("No new migrations");
    return sortedFiles;
  }

  console.log("Found the following migrations files: ");
  sortedFiles.forEach((file) => {
    console.log(file.filename);
  });

  return sortedFiles;
}

function getLatestBaseline() {
  console.log("Retreiving latest baseline file");

  // Regex to match <version>B.sql
  const baselineFileRegex = /^\d+B\.sql$/;

  const sortedFiles: File[] = fs
    .readdirSync("migrations")
    .filter((file) => baselineFileRegex.test(file))
    .map((file) => ({
      version: parseInt(file.split("B")[0] || "-1"),
      filename: file,
    }))
    .sort((a, b) => a.version - b.version);

  return sortedFiles.at(-1);
}

async function initMigrationsTable() {
  console.log("Initializing migrations table...");

  await sql`
    CREATE TABLE IF NOT EXISTS migration
    (
      id uuid NOT NULL DEFAULT gen_random_uuid(),
      created timestamp with time zone default current_timestamp,
      modified timestamp with time zone default current_timestamp,
      version numeric(10, 0) NOT NULL,
      filename character varying(255) NOT NULL
    )
  `;

  console.log("Initialized");
}

async function runSqlFile(file: File) {
  console.log(`Running migration ${file.filename}...`);
  await sql.begin(async (sql) => {
    const sqlFile = fs.readFileSync(`migrations/${file.filename}`, "utf8");
    await sql.unsafe(sqlFile);
    await sql`
    INSERT INTO migration (
      version,
      filename
    ) VALUES (
      ${file.version},
      ${file.filename}
    )
  `;
  });
}

async function getLatestVersion() {
  console.log("Retreiving latest version...");
  const result = await sql<
    Migration[]
  >`SELECT version FROM migration ORDER BY version DESC LIMIT 1`;

  if (result.length > 0) {
    const version = result[0].version;
    console.log(`Latest version is ${version}`);
    return version;
  }
  console.log("No version found");
}

console.log("Running migrations...");

try {
  const baseline = getLatestBaseline();
  if (baseline) {
    console.log(`Found baseline (${baseline}). Running it.`);
    await runSqlFile(baseline);
  } else {
    console.log("No baseline found. Creating empty migration table.");
    await initMigrationsTable();
  }

  const latestVersion = await getLatestVersion();
  const files = getMigrationsInOrder(latestVersion);
  for (const file of files) {
    await runSqlFile(file);
  }
  console.log("Migrations complete");
  await sql.end();
  process.exit(0);
} catch (error) {
  console.log("Something went wrong.");
  console.error(error);
  process.exit(1);
}
