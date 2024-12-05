// source: chatgpt
import { db } from '@/services/firebase';
import { doc, getDoc,  } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; // Importing a date picker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for the date picker
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

// Subject and Length options for dropdowns
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



interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: {
    courseTitle: string;
    professorName: string;
    schoolName: string;
    description: string;
    subject: string;
    length: string;
    price: string;
    materials: string;
    date: string;
    courseID: string;
  }) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onSubmit }) => {
  //const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    courseTitle: '',
    professorName: '',
    schoolName: '',
    description: '',
    subject: '',
    length: '',
    price: '',
    materials: '',
    date: '',
  });

  // Clear the fields when modal is closed
  const clearFields = () => {
    setCourseData({
      courseTitle: '',
      professorName: '',
      schoolName: '',
      description: '',
      subject: '',
      length: '',
      price: '',
      materials: '',
      date: '',
    });
  };

  useEffect(() => {
    if (!isOpen) {
      clearFields(); // Reset fields when modal is closed
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const generateRandomCourseId = async (): Promise<string> => {
    let courseId = "0";
    let exists = true;

    while (exists) {
      courseId = Math.floor(100000 + Math.random() * 900000).toString();
      const courseRef = doc(db, 'courses', courseId); // Assuming 'courses' is your collection
      const docSnap = await getDoc(courseRef);
      
      if (!docSnap.exists()) {
        exists = false; // ID is unique
      }
    }

    return courseId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(courseData).every((val) => val)) {
      //setLoading(true); // Start loading state
      
      try {
        const courseID = await generateRandomCourseId(); // Wait for the course ID to be generated
        const courseDataWithID = { ...courseData, courseID }; // Add the generated courseID to courseData object
  
        onSubmit(courseDataWithID);  // Submit the courseData with the new courseID
        onClose();  // Close the modal
      } catch (error) {
        console.error('Error generating course ID:', error);
      } finally {
        //setLoading(false); // Stop loading state
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleDateChange = (date: Date | null) => {
    setCourseData((prev) => ({
      ...prev,
      date: date ? date.toISOString().split('T')[0] : '',
    }));
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50vw] max-h-[80vh] overflow-auto relative">
        <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="subject" className="font-medium">Subject</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  role="combobox"
                  aria-expanded={true}
                  aria-controls="subject-options"
                  className={`${courseData.subject ? "bg-[#F2CC8F] border-transparent" : "bg-white border-[#F2CC8F]"} flex px-4 py-2 rounded-full bg-[#F2CC8F] shadow-md border-4 text-black w-full justify-between`}
                >
                  {courseData.subject ? subjects.find((s) => s.value === courseData.subject)?.label : "Select Subject"}
                  <ChevronsUpDown className="ml-2 mt-1 h-[3vh] w-[3vw] shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[17vw] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {subjects.map((subjectOption) => (
                        <CommandItem
                          key={subjectOption.value}
                          onSelect={() => {
                            setCourseData((prev) => ({
                              ...prev,
                              subject: prev.subject === subjectOption.value ? '' : subjectOption.value,
                            }));
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-[2vh] w-[2vw]", courseData.subject === subjectOption.value ? "opacity-100" : "opacity-0")}
                          />
                          {subjectOption.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Length Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="length" className="font-medium">Course Length</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  role="combobox"
                  aria-expanded={true}
                  aria-controls="length-options"
                  className={`${courseData.length ? "bg-[#E07A5F] border-transparent" : "bg-white border-[#E07A5F]"} flex px-4 py-2 rounded-full bg-[#E07A5F] shadow-md border-4 text-black w-full justify-between`}
                >
                  {courseData.length ? lengths.find((l) => l.value === courseData.length)?.label : "Select Length"}
                  <ChevronsUpDown className="ml-2 mt-1 h-[3vh] w-[3vw] shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[18vw] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {lengths.map((lengthOption) => (
                        <CommandItem
                          key={lengthOption.value}
                          onSelect={() => {
                            setCourseData((prev) => ({
                              ...prev,
                              length: prev.length === lengthOption.value ? '' : lengthOption.value,
                            }));
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-[2vh] w-[2vw]", courseData.length === lengthOption.value ? "opacity-100" : "opacity-0")}
                          />
                          {lengthOption.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Other Fields */}
          {Object.keys(courseData).map((key) => {
            if (key === "subject" || key === "length") return null; // Skip subject and length since they have dropdowns
            if (key === 'date') {
              return (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="font-medium">Enrollment Date</label>
                  <DatePicker
                    selected={courseData[key as keyof typeof courseData] ? new Date(courseData[key as keyof typeof courseData]) : null}
                    onChange={handleDateChange}
                    className="p-2 border border-[#F2CC8F] rounded-md bg-[#F2CC8F] text-black"
                    placeholderText="Select Date"
                    minDate={new Date()} // Prevent past dates
                  />
                </div>
              );
            }

            return (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="font-medium">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  name={key}
                  value={courseData[key as keyof typeof courseData]}
                  onChange={handleChange}
                  className="p-2 border border-[#F2CC8F] rounded-md bg-[#F2CC8F] text-black"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                  required // All fields are now required
                />
              </div>
            );
          })}
          
          <button type="submit" 
          className="text-[1.5vw] px-[1vw] py-[0.5vh] bg-[#B5B2B2] rounded-sm shadow-md transition-transform duration-150 ease-in-out transform hover:scale-105 relative z-10">
            List Course
          </button>

        </form>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          X
        </button>
      </div>
    </div>
  );
};

export default AddCourseModal;
