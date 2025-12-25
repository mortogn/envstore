import { Environment, Project, Variable } from "@/server/db/schema";

type QueryResult = {
  projects: Project | null;
  environments: Environment | null;
  variables: Variable | null;
};

export const transformProjectRow = (rows: QueryResult[]) => {
  if (rows.length == 0) return null;

  const project = rows[0].projects;

  if (!project) return null;

  const envsMap = new Map<
    string,
    NonNullable<
      QueryResult["environments"] & {
        variables: NonNullable<QueryResult["variables"]>[];
      }
    >
  >();

  for (const row of rows) {
    const env = row.environments;

    if (!env) continue;

    if (!envsMap.has(env.id)) {
      envsMap.set(env.id, { ...env, variables: [] });
    }

    const variable = row.variables;

    if (variable) {
      envsMap.get(env.id)!.variables.push(variable);
    }
  }

  return {
    ...project,
    envs: Array.from(envsMap.values()),
  };
};
