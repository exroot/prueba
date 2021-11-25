import Head from "next/head";
import { useCallback, useRef, useState, Fragment } from "react";
import tw, { css } from "twin.macro";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 600,
  height: 400,
  facingMode: "user",
};

export default function Home() {
  const classicCenter = css`
    ${tw`absolute top-1/2 left-1/2`}
    transform: translate(-50%, -50%);
  `;
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgsrc(imageSrc);
  }, [webcamRef]);
  const [empezar, setEmpezar] = useState(false);

  const [imgsrc, setImgsrc] = useState("");

  const WebcamCapture = () => {
    return (
      <Fragment>
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={600}
          videoConstraints={videoConstraints}
        />
      </Fragment>
    );
  };

  return (
    <div>
      <Head>
        <title>Next.js + twin.macro + Sass</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div css={classicCenter}>
          <div tw="text-center">
            <h1 tw="text-8xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500  font-extrabold tracking-tight">
              Take a photo
            </h1>
            <button
              tw="px-4 py-2 bg-blue-400 text-lg mt-8 mb-4 text-white rounded-lg uppercase font-bold"
              onClick={() => setEmpezar((prevState) => !prevState)}
            >
              Empezar
            </button>
            {empezar && <WebcamCapture />}
            {empezar && (
              <Fragment>
                <button
                  tw="px-4 py-2 bg-green-600 text-lg mt-8 text-white rounded-lg uppercase font-bold"
                  onClick={capture}
                >
                  Capturar foto
                </button>
                <button
                  tw="px-4 py-2 bg-red-600 text-lg mt-8 mx-4 text-white rounded-lg uppercase font-bold"
                  onClick={() => setImgsrc("")}
                >
                  Borrar foto
                </button>
              </Fragment>
            )}
            {imgsrc.length > 1 && <img src={imgsrc} tw="mt-4" />}
          </div>
        </div>
      </main>
    </div>
  );
}
