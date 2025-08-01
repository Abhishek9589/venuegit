import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
      <SliderPrimitive.Range className="absolute h-full bg-venue-indigo rounded-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-venue-indigo bg-white shadow-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-venue-indigo focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-venue-indigo hover:border-venue-purple cursor-pointer" />
    {/* For dual range sliders, this will create a second thumb automatically */}
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-venue-indigo bg-white shadow-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-venue-indigo focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-venue-indigo hover:border-venue-purple cursor-pointer" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
