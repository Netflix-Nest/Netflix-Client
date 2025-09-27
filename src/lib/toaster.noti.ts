import { toaster } from "@/components/ui/toaster";
type Type = "success" | "error" | "loading" | "info" | (string & {});
export const FastToaster = (type: Type, title: string, desc?: string) => {
  toaster.create({
    closable: true,
    description: desc,
    title,
    duration: 2000,
    type,
  });
};
