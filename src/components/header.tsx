import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { VscSettings, VscCommentDiscussion, VscBell } from "react-icons/vsc";

const Header: React.FC = () => {
  return (
    <>
      <Head>
        <title>Taskord</title>
        <meta
          name="description"
          content="Cozy task management system for you and your friends"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex w-full items-center justify-between border-b-2 bg-black py-2 px-4">
        <div className="flex items-center justify-center">
          <Image
            src="/static/icons/logo.svg"
            width={64}
            height={64}
            alt="logo"
          />
          <h1 className="hidden font-head text-4xl sm:block">taskord</h1>
        </div>
        <div className="flex items-center gap-8">
          <nav className="flex items-center justify-between gap-8">
            <ul className="flex h-full items-center justify-center gap-4">
              <li>
                <Link href="/" className="mr-8">
                  dashboard
                </Link>
              </li>
              <li>
                <Link href="/">
                  <VscCommentDiscussion className="h-6 w-6" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <VscBell className="h-6 w-6" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <VscSettings className="h-6 w-6" />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="h-12 w-12 rounded-full bg-lightblue"></div>
        </div>
      </header>
    </>
  );
};

export default Header;
