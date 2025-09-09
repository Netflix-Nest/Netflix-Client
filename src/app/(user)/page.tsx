import NetflixHomepage from "@/components/home/homepage";
import { movieApi } from "@/utils/api";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/auth.options";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const resHero = await movieApi.getHero();
  const resMostView = await movieApi.mostView(1, 9);
  return <NetflixHomepage hero={resHero.data!} mostView={resMostView.data} />;
}
