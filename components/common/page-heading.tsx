import React from "react";

type Props = {
  title: string;
  subtitle?: string;
};

const PageHeading: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl tracking-tight font-bold">{title}</h1>
      {subtitle && (
        <p className="text-base tracking-wide text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeading;
