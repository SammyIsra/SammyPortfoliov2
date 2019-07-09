import React from "react";

import { Layout } from "../components/Layout";
import { Bio, BioBody, BioTitle } from "../components/Bio";
import { Experiences } from "../components/Experiences";

const DeveloperPage = () => {
  return (
    <Layout theme="light" page="developer">
      <DeveloperBio />
      <Experiences filterPrivate={true} verbose={false} />
    </Layout>
  );
};

function DeveloperBio() {
  const title = "Sammy is a... Developer";
  const bio =
    "A software developer mainly focused on Web development. " +
    "Open web and education advocate, I believe in the web as one of the biggest " +
    "gatekeeper beaters out there. Some of my favorite toys are " +
    "JavaScript (and TypeScript), C#, Meteor, React, Redux, Angular, Git, .Net and RxJS. " +
    "Other than those, have experience playing with " +
    "C, Java, Python and Ruby. I am also exploring web animations " +
    "w/ SVGs, functional and reactive programming paradigms, and Machine Learning!";

  return (
    <Bio>
      <BioTitle>{title}</BioTitle>
      <BioBody>
        {bio}
        <br />I also write sometimes in{" "}
        <a href="https://dev.to/sammyisa">Dev.to</a> and ramble on{" "}
        <a href="https://twitter.com/SammyIs_Me">Twitter under @SammyIs_Me</a>.
        Also, you can find what I am doing in my{" "}
        <a href="https://github.com/SammyIsra">GitHub</a>.
      </BioBody>
    </Bio>
  );
}

export default DeveloperPage;
