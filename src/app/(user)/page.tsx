import NetflixHomepage from "@/components/home/homepage";
import { movieApi } from "@/utils/api";

export default async function HomePage() {
  const res = await movieApi.getHero();
  return <NetflixHomepage hero={res.data!} />;
}
