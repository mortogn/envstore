"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";

type Props = {
  onChange?: (value: string) => void;
  value?: string;
};

const SearchBar: React.FC<Props> = ({ onChange, value }) => {
  const [query, setQuery] = useState(value || "");

  useEffect(() => {
    onChange?.(query);
  }, [onChange, query]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <InputGroup>
      <InputGroupInput
        value={query}
        onChange={handleOnChange}
        placeholder="Type to search..."
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;
