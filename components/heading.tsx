/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Heading() {
  return (
    <header
      className={tw`mt-8 p-4 mx-auto max-w-screen-md flex flex-wrap md:flex-nowrap gap-4`}
    >
      <div className={tw`w-full md:w-1/2 box-border`}>
        <img
          src="https://res.cloudinary.com/acromatico-development/image/upload/c_fill,f_auto,h_320,w_320/v1641392022/Rafa%20Page/6575E4EB-3F86-47E7-A315-9CD51E5279EB_mm7ctf"
          className={tw`w-full max-w-xs mb-4 rounded-full mx-auto md:w-1/2 md:mx-0`}
          width="320"
          height="320"
          srcset="
            https://res.cloudinary.com/acromatico-development/image/upload/c_fill,f_auto,h_180,w_180/v1641392022/Rafa%20Page/6575E4EB-3F86-47E7-A315-9CD51E5279EB_mm7ctf 180w,
            https://res.cloudinary.com/acromatico-development/image/upload/c_fill,f_auto,h_320,w_320/v1641392022/Rafa%20Page/6575E4EB-3F86-47E7-A315-9CD51E5279EB_mm7ctf 320w,
            https://res.cloudinary.com/acromatico-development/image/upload/c_fill,f_auto,h_640,w_640/v1641392022/Rafa%20Page/6575E4EB-3F86-47E7-A315-9CD51E5279EB_mm7ctf 640w
          "
          sizes="
            (max-width: 320px) 320px,
            180px
          "
          alt="Rafael González Vázquez"
        />
        <h1 className={tw`font-bold text-4xl`}>Rafael González</h1>
      </div>
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
