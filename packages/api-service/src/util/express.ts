import { Router } from "express";

interface RouteSpec {
  path: string;
  methods: string[];
}

interface RouterSpec {
  prefix?: string;
  router: Router;
}

export function extractAvailableEndpointsFromRouters(
  specs: RouterSpec[]
): RouteSpec[] {
  return specs.reduce((acc, spec) => {
    spec.router.stack.forEach((stack) => {
      const path = spec.prefix
        ? `${spec.prefix}${stack.route.path}`
        : stack.route.path;
      acc.push({
        path,
        methods: Object.keys(stack.route.methods).map((verb) =>
          verb.toUpperCase()
        ),
      });
    });

    return acc;
  }, [] as RouteSpec[]);
}
