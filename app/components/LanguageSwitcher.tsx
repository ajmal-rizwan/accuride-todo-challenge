"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ChevronDownIcon,
} from "@heroicons/react/16/solid";

export default function LanguageSwitcher() {
  const langs = [
    { code: "en", flag: "🇬🇧" },
    { code: "fr", flag: "🇫🇷" },
  ];

  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1 text-sm text-gray-400"
      >
        {langs.find((l) => l.code === i18n.language)?.flag}&nbsp;
        {i18n.language.toUpperCase()}
        <ChevronDownIcon className="h-3 w-3 ml-1" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-28 rounded-md bg-white z-50">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                i18n.changeLanguage(l.code);
                setOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 ${i18n.language === l.code ? "text-indigo-600 font-medium" : "text-gray-700"}`}
            >
              {l.flag} {l.code.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
