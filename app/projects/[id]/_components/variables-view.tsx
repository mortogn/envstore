import { Variable } from "@/server/db/schema";
import React, { FC } from "react";

type Props = {
  variables: Variable[];
};

const VariablesView: FC<Props> = ({ variables }) => {
  return (
    <div>
      {variables.map((variable) => (
        <div key={variable.id}>{variable.name}</div>
      ))}
    </div>
  );
};

export default VariablesView;
