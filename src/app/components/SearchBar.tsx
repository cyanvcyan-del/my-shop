import { SearchIcon } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";


export default function Searchbar() {
  return (
  <Field className=" mx-auto w-[91%] sm:w-[88%] md:w-[92%]  mt-4 md:mt-7 ">

  <InputGroup className=" bg-mainT rounded-full
              border-hidden  h-10 md:h-13 mx-auto
              shadow-[3px_4px_6.7px_rgba(0,0,0,0.03)]
              border-transparent focus-within:border-transparent
              focus-within:ring-0"
              >

      <InputGroupInput className="placeholder:text-[#CCCCCC]
              placeholder:font-light text-xs md:placeholder:text-sm   "
              id="search"
              autoComplete="off"
              placeholder="Search for food, categories..."
              />

          <InputGroupAddon align="inline-start">
              <SearchIcon className="size-5 md:size-7 text-muted-foreground ml-2.5 mr-2.5" />
          </InputGroupAddon>
      </InputGroup>


    </Field>
  );
}