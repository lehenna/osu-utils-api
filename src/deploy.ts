import { spawn } from "bun";
import { join } from "path";

async function main() {
  spawn({
    cmd: ["bun", "run", "build"],
  });
  spawn({
    cmd: ["bun", "install"],
    cwd: join(process.cwd(), "web"),
  });
  spawn({
    cmd: ["bun", "run", "build"],
    cwd: join(process.cwd(), "web"),
  });
  spawn({
    cmd: ["bun", "run", "copy-web"],
  });
}

main();
