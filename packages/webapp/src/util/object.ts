export function toComputedPath(dotPath: string) {
  return dotPath
    .split(".")
    .map((key) => `[${key}]`)
    .join("");
}

export function isObject(value: unknown) {
  return (
    value === Object(value) && {}.toString.apply(value) === "[object Object]"
  );
}

export function setValueAtPath<T>(path: string, value: unknown, root: T): T {
  const splittedPath = path.split(".");
  const cloned: any = { ...root };
  let val = cloned[splittedPath[0]];

  if (splittedPath.length === 1) {
    cloned[splittedPath[0]] = value;
    return cloned;
  }

  // Loop up to but not including the last element in the path.
  for (let i = 1; i < splittedPath.length - 1; i += 1) {
    if (val === undefined) {
      return cloned;
    }
    val = val[splittedPath[i]];
  }

  val[splittedPath[splittedPath.length - 1]] = value;
  return cloned;
}
