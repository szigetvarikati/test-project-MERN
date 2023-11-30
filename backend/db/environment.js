import dotenv from 'dotenv';

export function checkEnvironmentVariables() {
  dotenv.config();
  if (!process.env.FILE_PATH) {
    console.error('Missing FILE_PATH environment variable');
    process.exit(1);
  }
}