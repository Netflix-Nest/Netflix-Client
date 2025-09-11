import NetflixHomepage from "@/components/home/homepage";
import { movieApi } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/auth.options";
import { Content } from "@netflix-clone/types";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  // hero content
  const resHero = await movieApi.getHero();
  let excludeContents: number[] = [resHero.data?.id!];

  // most view contents
  const resMostView = await movieApi.getContents(
    1,
    12,
    excludeContents,
    "view",
    "DESC"
  );
  excludeContents.push(...resMostView.data.map((d) => d.id));

  // in this year
  const resThisYear = await movieApi.getContents(
    1,
    12,
    excludeContents,
    "view",
    "DESC",
    { year: 2025 }
  );
  excludeContents.push(...resThisYear.data.map((d) => d.id));

  // recommendation
  const forYou = await movieApi.getContents(1, 12, excludeContents);
  console.log(forYou);

  return (
    <NetflixHomepage
      hero={resHero.data!}
      mostView={resMostView.data}
      thisYear={resThisYear.data}
      forYou={forYou.data}
    />
  );
}
