const Loading = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-fit flex-col items-center justify-center">
        <img src="/icons/loading-circle.svg" alt="loading" srcSet="" />
        <h2 className="font-semibold text-black dark:text-white">Loading...</h2>
      </div>
    </section>
  );
};

export default Loading;
