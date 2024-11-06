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
  { value: "Anthropology", label: "Anthropology" },
  { value: "Art", label: "Art" },
  { value: "English", label: "English" },
  { value: "Gender Studies", label: "Gender Studies" },
  { value: "History", label: "History" },
  { value: "Language", label: "Language" },
  { value: "Literature", label: "Literature" },
  { value: "Music", label: "Music" },
  { value: "Mythology", label: "Mythology" },
  { value: "Philosophy", label: "Philosophy" },
  { value: "Poetry", label: "Poetry" },
  { value: "Politics", label: "Politics" },
  { value: "Religion", label: "Religion" },
  { value: "Sociology", label: "Sociology" },
  { value: "Theater", label: "Theater" },
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
    <>
      <div className="flex justify-center items-center py-[0.7vh] gap-[2vw]">
        <h1 className="text-[1.5vw] items-center text-black">Filter:</h1>

        {/* Subject Dropdown */}
        <Popover open={openSubject} onOpenChange={setOpenSubject}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-expanded={openSubject}
              aria-controls="subject-options"
              className={`${selectedSubject ? "bg-[#F2CC8F] border-transparent" : "bg-white border-[#F2CC8F]"} flex px-4 py-2 rounded-full bg-[#F2CC8F] shadow-md border-4 text-[1.5vw] text-black w-[18vw] justify-between`}
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
              aria-controls="length-options"
              className={`${selectedLength ? "bg-[#E07A5F] border-transparent" : "bg-white border-[#E07A5F]"} flex px-4 py-2 rounded-full bg-[#E07A5F] shadow-md border-4 text-[1.5vw] text-black w-[18vw] justify-between`}
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
              aria-controls="price-options"
              className={`${selectedPrice ? "bg-[#81B29A] border-transparent" : "bg-white border-[#81B29A]"} flex justify-center px-4 py-2 rounded-full bg-[#81B29A] shadow-md border-4 text-[1.5vw] text-black`}
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
              aria-controls="material-options"
              className={`${selectedMaterial ? "bg-[#9fa5db] border-transparent" : "bg-white border-[#9fa5db]"} flex px-4 py-2 rounded-full bg-[#9fa5db] border-4 shadow-md text-[1.5vw] text-black w-[17vw] justify-between`}
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
                      onSelect={() => {
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

        <button className="text-[1.5vw] px-[1vw] py-[0.5vh] bg-[#B5B2B2] rounded-sm shadow-md transition-transform duration-150 ease-in-out transform hover:scale-105"
        onClick={()=>{
            setSelectedSubject("");
            setSelectedLength("");
            setSelectedPrice("");
            setSelectedMaterial("");
        }}
        >Clear
        </button>
      </div>
    </>
  );
}
