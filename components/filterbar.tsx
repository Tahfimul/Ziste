"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const subjects = [
  { value: "anthropology", label: "Anthropology" },
  { value: "art", label: "Art" },
  { value: "english", label: "English" },
  { value: "gender studies", label: "Gender Studies" },
  { value: "history", label: "History" },
  { value: "language", label: "Language" },
  { value: "literature", label: "Literature" },
  { value: "music", label: "Music" },
  { value: "mythology", label: "Mythology" },
  { value: "philosophy", label: "Philosophy" },
  { value: "poetry", label: "Poetry" },
  { value: "politics", label: "Politics" },
  { value: "religion", label: "Religion" },
];

const lengths = [
  { value: "4 weeks", label: "4 Weeks" },
  { value: "9 weeks", label: "9 Weeks" },
  { value: "12 weeks", label: "12 Weeks" },
];

const prices = [
  { value: "0-50", label: "$0 - $50" },
  { value: "50-150", label: "$50 - $150" },
  { value: "150+", label: "Above $150" },
];

const materials = [
  { value: "textbook free", label: "Textbook Free" },
  { value: "low-cost", label: "Low-Cost" },
];

export const FilterBar = ({
  selectedSubject,
  setSelectedSubject,
  selectedLength,
  setSelectedLength,
  selectedPrice,
  setSelectedPrice,
  selectedMaterial,
  setSelectedMaterial,
}: {
  selectedSubject: string;
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedLength: string;
  setSelectedLength: React.Dispatch<React.SetStateAction<string>>;
  selectedPrice: string;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
  selectedMaterial: string;
  setSelectedMaterial: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [openSubject, setOpenSubject] = React.useState(false);
  const [openLength, setOpenLength] = React.useState(false);
  const [openPrice, setOpenPrice] = React.useState(false);
  const [openMaterial, setOpenMaterial] = React.useState(false);

  return (
    <header>
      <div className="flex justify-center items-center py-[0.5vh] gap-[2vw]">
        <h1 className="text-[1.5vw] items-center text-black">Filter:</h1>

        {/* Subject Dropdown */}
        <Popover open={openSubject} onOpenChange={setOpenSubject}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-expanded={openSubject}
              className="flex px-4 py-2 rounded-full bg-[#F2CC8F] shadow-md text-[1.5vw] text-black w-[17vw] justify-between"
            >
              {selectedSubject
                ? subjects.find((s) => s.value === selectedSubject)?.label
                : "Subject"}
              <ChevronsUpDown className="ml-[0.5vw] mt-1 h-[3vh] w-[3vw] shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[17vw] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {subjects.map((subjectOption) => (
                    <CommandItem
                      className="text-[1.4vw]"
                      key={subjectOption.value}
                      onSelect={() => {
                        setSelectedSubject(selectedSubject === subjectOption.value ? "" : subjectOption.value);
                        setOpenSubject(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-[2vh] w-[2vw]",
                          selectedSubject === subjectOption.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {subjectOption.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Course Length Dropdown */}
        <Popover open={openLength} onOpenChange={setOpenLength}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-expanded={openLength}
              className="flex px-4 py-2 rounded-full bg-[#E07A5F] shadow-md text-[1.5vw] text-black w-[18vw] justify-between"
            >
              {selectedLength
                ? lengths.find((l) => l.value === selectedLength)?.label
                : "Course Length"}
              <ChevronsUpDown className="ml-[0.5vw] mt-1 h-[3vh] w-[3vw] shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[18vw] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {lengths.map((lengthOption) => (
                    <CommandItem
                      className="text-[1.4vw]"
                      key={lengthOption.value}
                      onSelect={() => {
                        setSelectedLength(selectedLength === lengthOption.value ? "" : lengthOption.value);
                        setOpenLength(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-[2vh] w-[2vw]",
                          selectedLength === lengthOption.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {lengthOption.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Price Dropdown */}
        <Popover open={openPrice} onOpenChange={setOpenPrice}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-expanded={openPrice}
              className="flex justify-center px-4 py-2 rounded-full bg-[#81B29A] shadow-md text-[1.5vw] text-black"
            >
              {selectedPrice
                ? prices.find((p) => p.value === selectedPrice)?.label
                : "Price"}
              <ChevronsUpDown className="ml-[0.5vw] mt-1 h-[3vh] w-[3vw] shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[13vw] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {prices.map((priceOption) => (
                    <CommandItem
                      className="text-[1.4vw]"
                      key={priceOption.value}
                      onSelect={() => {
                        setSelectedPrice(selectedPrice === priceOption.value ? "" : priceOption.value);
                        setOpenPrice(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-[2vh] w-[2vw]",
                          selectedPrice === priceOption.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {priceOption.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Materials Dropdown */}
        <Popover open={openMaterial} onOpenChange={setOpenMaterial}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-expanded={openMaterial}
              className="flex px-4 py-2 rounded-full bg-[#9fa5db] shadow-md text-[1.5vw] text-black w-[17vw] justify-between"
            >
              {selectedMaterial
                ? materials.find((m) => m.value === selectedMaterial)?.label
                : "Materials"}
              <ChevronsUpDown className="ml-[0.5vw] mt-1 h-[3vh] w-[3vw] shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-[17vw] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {materials.map((materialOption) => (
                    <CommandItem className="text-[1.4vw]"
                      key={materialOption.value}
                      value={materialOption.value}
                      onSelect={(currentValue) => {
                        setSelectedMaterial(selectedMaterial === materialOption.value ? "" : materialOption.value);
                        setOpenMaterial(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-[2vh] w-[2vw]",
                          selectedMaterial === materialOption.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {materialOption.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
