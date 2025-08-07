import React, { useState, useRef, useEffect } from "react";

const Select = ({ name, value }: { name: string; value?: string }) => {
  const options = [
    { id: 0, name: "Applied", value: "applied" },
    { id: 1, name: "Rejected", value: "rejected" },
    { id: 2, name: "Interview", value: "interview" },
    { id: 3, name: "Hired", value: "hired" },
  ];

  if (value) {
    const item = options.find((item) => item.value === value) as {
      id: number;
      name: string;
      value: string;
    };
    const index = item?.id as number;
    const item_to_change = options[0];
    options[0] = item;
    options[index] = item_to_change;
  }

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const found = options.find((opt) => opt.value === value);
      if (found) setSelected(found);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-xs">
      <input type="hidden" name={name} value={selected.value} />
      <button
        type="button"
        className="w-full flex justify-between items-center bg-white/70 border border-gray-200 rounded-xl px-4 py-3 shadow-md font-sora text-base text-gray-800 cursor-pointer backdrop-blur-md transition-all focus:ring-2 focus:ring-blue-300"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected.name}</span>
        <svg className={`w-5 h-5 ml-2 transition-transform ${open ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          className="absolute z-20 mt-2 w-full bg-white/90 border border-gray-200 rounded-xl shadow-xl backdrop-blur-md py-2 max-h-60 overflow-auto animate-fade-in"
          tabIndex={-1}
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.id}
              className={`px-4 py-2 cursor-pointer font-sora text-base rounded-lg transition-all hover:bg-blue-100/80 hover:text-blue-700 ${selected.value === option.value ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-800"}`}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              role="option"
              aria-selected={selected.value === option.value}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
