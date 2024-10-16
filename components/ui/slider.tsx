"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [sliderValue, setSliderValue] = React.useState(50); // Initial value at 50

  return (
    <div className="w-full max-w-lg mx-auto"> {/* Center the slider in the viewport */}
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={[sliderValue]}
        onValueChange={(value) => setSliderValue(value[0])}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
          <SliderPrimitive.Range className="absolute h-full bg-[#81B29A]" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-black bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>

      {/* Display the slider value with a dollar sign */}
      <div className="mt-2 text-center text-md">
        <span>Max: ${sliderValue}</span>
      </div>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }