import GlobalSpinner from "./GlobalSpinner";
import GlobalSkeleton from "./GlobalSkeleton";
import { useLoader } from "../../Context/LoaderContext";

const GlobalLoader = () => {
  const { loading, type } = useLoader();

  if (!loading) return null;

  return type === "spinner" ? <GlobalSpinner /> : <GlobalSkeleton />;
};

export default GlobalLoader;
