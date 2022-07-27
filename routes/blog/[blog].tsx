/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";

import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Heading from "../../components/heading.tsx";
import { Marked } from "https://deno.land/x/markdown@v2.0.0/mod.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const blogSlug = ctx.params.blog;
    
    // const entries = [];
    try {

      const decoder = new TextDecoder("utf-8");
      const data = await Deno.readFile(`./static/blog/${blogSlug}.md`);
      const text = decoder.decode(data);
      const html = Marked.parse(text);
      const resp = await ctx.render(html.content);
      return resp;
    } catch (err) {
      console.error(err);
      if(err.message.includes("No such file")) {
        
        return new Response("Not Found", {
          status: 404,
          headers: { "content-type": "text/plain" },
        });
      }
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
        <div dangerouslySetInnerHTML={{
          __html: data
        }}></div>
      </div>
    </Fragment>
  );
}
