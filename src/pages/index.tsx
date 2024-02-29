export default function Home() {
  return (
    <>
      ATA
    </>
  );
}

export const getStaticProps = async (context: any) => {
  const messages = (await import(`../../messages/${context.locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};