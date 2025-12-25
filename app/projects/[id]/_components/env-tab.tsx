"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Environment, Variable } from "@/server/db/schema";
import React from "react";
import VariablesView from "./variables-view";
import { useQueryState } from "nuqs";

type Props = {
  envs: NonNullable<
    Environment & {
      variables: Variable[];
    }
  >[];
};

const EnvironmentTab: React.FC<Props> = ({ envs }) => {
  const [activeValue, setActiveValue] = useQueryState("env", {
    defaultValue: envs.length > 0 ? envs[0].id : "",
  });

  if (envs.length == 0) return null;

  return (
    <Tabs value={activeValue} onValueChange={(v) => setActiveValue(v)}>
      <TabsList>
        {envs &&
          envs.map((env) => (
            <TabsTrigger key={env.id} value={env.id}>
              {env.name}
            </TabsTrigger>
          ))}
      </TabsList>
      {envs &&
        envs.map((env) => (
          <TabsContent key={env.id} value={env.id}>
            <VariablesView variables={env.variables} />
          </TabsContent>
        ))}
    </Tabs>
  );
};

export default EnvironmentTab;
