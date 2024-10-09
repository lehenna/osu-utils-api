import { useState } from "react";
import type { EndpointResponse } from "../lib/endpoints";
import { cn } from "../lib/cn";

export function EndpointResponseTable({
  response,
}: {
  response: EndpointResponse[];
}) {
  const [data, setData] = useState(response[0].data);
  return (
    <section className="flex max-sm:flex-col gap-4">
      <ul className="flex sm:flex-col gap-4 h-min">
        {response.map((res) => (
          <li
            onClick={() => setData(res.data)}
            key={res.status}
            className="border-2 flex items-center gap-1.5 border-zinc-200 rounded-md px-4 h-10 cursor-pointer transition-[background-color] hover:bg-zinc-100"
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full block",
                res.status >= 500
                  ? "bg-red-500"
                  : res.status >= 400
                  ? "bg-orange-500"
                  : res.status >= 300
                  ? "bg-blue-500"
                  : "bg-green-500"
              )}
            ></span>{" "}
            {res.status}
          </li>
        ))}
      </ul>
      <pre className="relative flex-1 rounded-md border-2 border-zinc-200 h-[14rem] overflow-x-auto overflow-y-auto p-4">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}
