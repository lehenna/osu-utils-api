import { copy, remove, ensureDir } from "fs-extra";
import { join } from "path";

const WEB_PATH = join(process.cwd(), "web", "dist");
const PUBLIC_PATH = join(process.cwd(), "build", "public");

async function main() {
  await remove(PUBLIC_PATH);
  await ensureDir(PUBLIC_PATH);
  await copy(WEB_PATH, PUBLIC_PATH);
}

main();
