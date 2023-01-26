import MainPage from "components/MainPage";
import { useRouter } from "next/router";

const Routes = () => {
  const router = useRouter();
  const { r1, r2 } = router.query;

  return <MainPage r1={r1 as string} r2={r2 as string} />;
};

export default Routes;
