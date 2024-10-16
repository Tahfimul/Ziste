"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"  
import { Slider } from "@/components/ui/slider"
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
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
  { value: "4weeks", label: "4 Weeks" },
  { value: "9weeks", label: "9 Weeks" },
  { value: "12weeks", label: "12 Weeks" },
];

const materials = [
    { value: "textbookfree", label: "Textbook Free"},
    { value: "lowcost", label: "Low-Cost"},
]

export const FilterBar = () => {
  const [openSubject, setOpenSubject] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [openLength, setOpenLength] = React.useState(false);
  const [length, setLength] = React.useState("");
  const [openMaterial, setOpenMaterial] = React.useState(false);
  const [material, setMaterial] = React.useState("");

  return (
    <header>
      <div className="flex justify-center items-center mx-56 gap-8">
        <h1 className="text-md font-medium text-black">Filter:</h1>

        {/* Subject Dropdown */}
        <Popover open={openSubject} onOpenChange={setOpenSubject}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-expanded={openSubject}
              className="flex px-4 py-2 rounded-full bg-[#F2CC8F] shadow-md text-md text-black w-[220px] justify-between"
            >
              {subject
                ? subjects.find((s) => s.value === subject)?.label
                : "Subject"}
              <ChevronsUpDown className="ml-2 mt-1 h-4 w-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {subjects.map((subjectOption) => (
                    <CommandItem
                      key={subjectOption.value}
                      value={subjectOption.value}
                      onSelect={(currentValue) => {
                        setSubject(currentValue === subject ? "" : currentValue);
                        setOpenSubject(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          subject === subjectOption.value
                            ? "opacity-100"
                            : "opacity-0"
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
              className="flex px-4 py-2 rounded-full bg-[#E07A5F] shadow-md text-md text-black w-[200px] justify-between"
            >
              {length
                ? lengths.find((l) => l.value === length)?.label
                : "Course Length"}
              <ChevronsUpDown className="ml-2 mt-1 h-4 w-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {lengths.map((lengthOption) => (
                    <CommandItem
                      key={lengthOption.value}
                      value={lengthOption.value}
                      onSelect={(currentValue) => {
                        setLength(currentValue === length ? "" : currentValue);
                        setOpenLength(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          length === lengthOption.value
                            ? "opacity-100"
                            : "opacity-0"
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
        
        {/** Price Slider Dropdown */}
        <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center px-4 py-2 rounded-full bg-[#81B29A] shadow-md text-md text-black">
                Price
                <ChevronsUpDown className="ml-2 mt-1 h-4 w-4 shrink-0 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>
                <Slider defaultValue={[33]} min={25} max={250} step={1} />
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        
        {/** Materials Dropdown */}
        <Popover open={openMaterial} onOpenChange={setOpenMaterial}>
          <PopoverTrigger asChild>
            <button
              role="combobox"
              aria-expanded={openMaterial}
              className="flex px-4 py-2 rounded-full bg-[#9fa5db] shadow-md text-md text-black w-[200px] justify-between"
            >
              {material
                ? materials.find((m) => m.value === material)?.label
                : "Materials"}
              <ChevronsUpDown className="ml-2 mt-1 h-4 w-4 shrink-0 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {materials.map((materialOption) => (
                    <CommandItem
                      key={materialOption.value}
                      value={materialOption.value}
                      onSelect={(currentValue) => {
                        setMaterial(currentValue === material ? "" : currentValue);
                        setOpenMaterial(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          material === materialOption.value
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
