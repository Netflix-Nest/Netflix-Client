import SearchMain from "@/components/search/search";
import { searchApi } from "@/utils/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q } = await searchParams;
  const res = await searchApi.searchMovie({ q: q as string });
  console.log(res);
  return <SearchMain q={q as string} result={res.data.results} />;
}
