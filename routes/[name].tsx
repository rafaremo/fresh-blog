/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";
import { asset } from "$fresh/runtime.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const decoder = new TextDecoder("utf-8");
      const file = asset("data.md");
      const data = await Deno.readFile("./static/data.md");
      const text = decoder.decode(data);
      const html = Marked.parse(text);
      const resp = await ctx.render(html.content);
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

export default function Greet(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}
