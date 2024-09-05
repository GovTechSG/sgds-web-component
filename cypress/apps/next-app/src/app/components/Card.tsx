import SgdsCard from "@govtechsg/sgds-web-component/react/card/index.js";
import Image from "next/image";
export const Card = () => {
  return (
    <>
      <SgdsCard bgColor="primary" borderColor="primary" textColor="primary">
        <Image
          suppressHydrationWarning
          width={100}
          height={120}
          slot="card-image"
          alt="img alternate text goes here"
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80"
        />
        <span slot="card-title">Card</span>
        <span slot="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </span>
        <a suppressHydrationWarning slot="card-link" href="https://google.com">
          Go somewhere
        </a>
      </SgdsCard>
    </>
  );
};
