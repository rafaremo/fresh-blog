/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";

import { Handlers, PageProps } from "$fresh/server.ts";
import Heading from "../components/heading.tsx";
import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const entries = [];
    try {
      for await (const dirEntry of Deno.readDir("./static/blog")) {
        console.log(dirEntry.name);
        const decoder = new TextDecoder("utf-8");
        const data = await Deno.readFile(`./static/blog/${dirEntry.name}`);
        const text = decoder.decode(data);

        entries.push({
          slug: dirEntry.name.split(".")[0],
          title: text.split("\n")[0].split("#")[1],
          content: text.split("\n").slice(1).join(" "),
        });
      }

      const resp = await ctx.render(entries);
      return resp;
    } catch (err) {
      console.error(err);
      return new Response("Internal Server Error", {
        status: 500,
        headers: { "content-type": "text/plain" },
      });
    }
  },
};

export default function Home({ data }: PageProps) {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <title>Rafael González | Web Development Blog</title>
        <meta name="description" content="Rafael González's personal blog" />
        <link rel="stylesheet" href="/index.css" />
      </Head>
      <Heading/>
      <div class={tw`p-4 mx-auto max-w-screen-md`}>
        <p>{JSON.stringify(data)}</p>
      </div>
    </Fragment>
  );
}
