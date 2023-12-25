import { isObject } from "./object";

export function buildFormData<T>(
  data: T,
  formData?: FormData,
  parentKey?: string
): FormData {
  formData = formData || new FormData();
  if (
    data &&
    isObject(data) &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.entries(data).forEach(([key, value]) => {
      buildFormData(
        value as T,
        formData,
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    if (!data) {
      return formData;
    }
    formData?.append(parentKey as string, data as string | Blob);
  }

  return formData;
}
