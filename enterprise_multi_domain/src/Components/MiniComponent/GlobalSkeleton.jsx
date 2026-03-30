import Skeleton from "react-loading-skeleton";

const GlobalSkeleton = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Skeleton height={40} width={300} />
      <br />
      <Skeleton count={6} />
      <br />
      <Skeleton height={200} />
    </div>
  );
};

export default GlobalSkeleton;
