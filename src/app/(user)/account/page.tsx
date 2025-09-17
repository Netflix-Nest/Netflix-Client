import Account from "@/components/account/account";
import { userApi } from "@/utils/api";

export default async function AccountPage() {
  const res = await userApi.getAccount();
  console.log(res);

  return <Account user={res.data!} />;
}
