/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";

import { Handlers, PageProps } from "$fresh/server.ts";
import Heading from "../components/heading.tsx";
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
          image: text.split('src="')[1].split('"')[0],
          content: `${text.split("/>")[1].substring(0, 200)}...`,
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
      </Head>
      <Heading homePage={true}/>
      <div class={tw`p-4 mx-auto max-w-screen-md`}>

        {data.map((entry: { title: string; image: string; slug: string; content: string }) => (
          <a className={tw`no-underline`} href={`/blog/${entry.slug}`}>
            <article className={tw`mb-4 p-4 border-1 mb-4 block md:flex gap-4`}>
              <img
                loading="lazy"
                className={tw`aspect-[1/1] mb-4 md:w-1/2 md:mb-0`}
                src={`${entry.image.split("w=")[0]}w=320&h=320`}
                srcset={`${entry.image.split("w=")[0]}w=320&h=320 320w,
                       ${entry.image.split("w=")[0]}w=640&h=640 640w,
                       ${entry.image.split("w=")[0]}w=750&h=750 750w`}
                sizes="(max-width: 320px) 320px,
                       (max-width: 640px) 640px,
                       (max-width: 767px) 750px,
                       640px"
                alt={entry.title}
              />
              <div>
                <h2 className={tw`text-2xl uppercase mb-4 text-black`}>{entry.title}</h2>
                <p className={tw`text-black`}>{entry.content}</p>
              </div>
            </article>
          </a>
        ))}
      </div>
    </Fragment>
  );
}
