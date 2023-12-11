import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Hero from "@components/Hero";
import Navbar from "@components/Navbar";
import Layout from "@components/Layout";

const Product = () => {

  return (
    <Layout> 
      <Navbar />
      <Hero />
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["hero", "navigation/navbar", "navigation/language-selector"])),
    },
  };
};

export default Product;