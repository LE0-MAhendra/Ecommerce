"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useApi } from "@/redux/services/axios";
import { useDispatch, useSelector } from "react-redux";
import { BrandProps, CategoryProps } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { selBrands } from "@/redux/features/Items/BrandSlice";
import { selCategories } from "@/redux/features/Items/categorySlice";
import { setFildata, setProducts } from "@/redux/features/Items/productSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const FormSchema = z.object({
  brands: z.array(z.string()),
  categories: z.array(z.string()),
});
export function CustomToggle({
  onToggleClick,
}: {
  onToggleClick?: () => void;
}) {
  const Brands = useSelector(selBrands);
  const Categories = useSelector(selCategories);
  const dispatch = useDispatch();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brands: [],
      categories: [],
    },
  });
  useEffect(() => {
    // Update the disabled status whenever brands or categories change
    setIsSubmitDisabled(
      form.getValues().brands.length === 0 &&
        form.getValues().categories.length === 0
    );
  }, [form.getValues().brands, form.getValues().categories]);
  const API = useApi();
  const router = useRouter();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    async function fetchData() {
      try {
        let endpoint = "/products";

        if (data.brands.length > 0 || data.categories.length > 0) {
          // At least one of them is selected
          endpoint += "/?";

          if (data.brands.length > 0) {
            endpoint += `brand=${data.brands.join(",")}`;
          }

          if (data.brands.length > 0 && data.categories.length > 0) {
            endpoint += "&";
          }

          if (data.categories.length > 0) {
            endpoint += `category=${data.categories.join(",")}`;
          }
        }
        const res = await API.get(endpoint);
        if (res.data && res.data.length > 0) {
          dispatch(setFildata(res.data.length));
          dispatch(setProducts(res.data));
        } else {
          form.reset({
            brands: [],
            categories: [],
          });
          toast.error(
            "No products present for this selection. Please make a valid filters."
          );
        }
        endpoint = "/products";
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }
  const handleClick = () => {
    if (onToggleClick) {
      onToggleClick();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="brands"
          render={({ field }) => (
            <FormItem>
              <div className="mb-2">
                <FormLabel className="text-base font-bold">Brands</FormLabel>
              </div>
              <div>
                {Brands ? (
                  <ScrollArea className="h-[130px] w-full rounded-md bg-white p-2">
                    <div>
                      {Brands.map((brand: BrandProps) => (
                        <FormItem
                          key={brand.id}
                          className="flex flex-row items-start space-x-3 space-y-0 mb-1"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(brand.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, brand.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== brand.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {brand.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p>Loading</p>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <div className="mb-2">
                <FormLabel className="text-base font-bold">
                  Categories
                </FormLabel>
              </div>
              {Categories ? (
                <ScrollArea className="h-[130px] w-full rounded-md bg-white p-2">
                  <div className="">
                    {Categories.map((cat: CategoryProps) => (
                      <FormItem
                        key={cat.id}
                        className="flex flex-row items-start space-x-3 space-y-0 mb-1"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(cat.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, cat.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== cat.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {cat.name}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p>Loading</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <CustomSlider /> */}
        <Button type="submit" disabled={isSubmitDisabled} onClick={handleClick}>
          Submit
        </Button>
        {/* <SheetClose asChild>
          <Button type="submit" disabled={isSubmitDisabled}>
            Submit
          </Button>
        </SheetClose> */}
      </form>
    </Form>
  );
}
