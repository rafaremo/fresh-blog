/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Heading() {
  return (
    <header className={tw`p-4 mx-auto max-w-screen-md flex flex-wrap md:flex-nowrap gap-4`} >
      <h1 className={tw`w-full md:w-1/2 box-border`}>Rafael González</h1>
      <div className={tw`w-full md:w-1/2 box-border`}>
        <p>
          This is a personal blog to document my jurney as a web developer in
          México.
        </p>
        <p>
          <a href="mailto:hola@rafa.page">hola@rafa.page</a>
          <br />
          <a href="https://rafa.page">rafa.page</a>
        </p>
      </div>
    </header>
  );
}
