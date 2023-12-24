import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export function CustomSlider({ className, ...props }: SliderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">Price</h1>
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[60%] mb-2", className)}
        {...props}
      />
    </div>
  );
}
