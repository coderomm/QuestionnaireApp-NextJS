import Head from 'next/head';
import Questionnaire from '../components/Questionnaire';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Questionnaire App</title>
      </Head>
      <main>
        <h1>Questionnaire App</h1>
        <Questionnaire />
      </main>
    </div>
  );
}