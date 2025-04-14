const Skeleton = ({ width, height }: { width: string; height: string }) => {
  return (
    <div
      style={{ width, height }}
      className="animate-pulse bg-gray-300 rounded-xl"
    />
  );
};

export default Skeleton;
