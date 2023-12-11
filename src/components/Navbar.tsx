import Link from "next/link";
import React from 'react';
import { useTranslation } from "next-i18next";
import LanguageSelector from "../components/LanguageSelector";
import { useRouter } from "next/router"; // Import the router

const Navbar: React.FC = () => {

  const { t: navbarT } = useTranslation("navigation/navbar");
  // const { t: languageSelectorT } = useTranslation("navigation/language-selector");
  const router = useRouter(); // Access the router


  const navigation = [
    "product",
    "features",
    "main",
  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                  <Link
                  href={menu === "main" ? "/" : `/${menu}`}
                  className={`inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover-text-indigo-500 focus-text-indigo-500 focus-bg-indigo-100 focus-outline-none dark-focus-bg-gray-800 ${
                    router.pathname === (menu === "main" ? "/" : `/${menu}`) ? "highlighted-link" : ""
                  }`}
                >
                  {navbarT(`${menu}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
              <LanguageSelector />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;