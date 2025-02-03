export const Header = () => {
  return (
    <>
      <header className="bg-orange-700 text-white h-8 flex items-center p-2 fixed top-0 left-0 w-full z-10">
        <nav className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <img src="./favicon.ico" alt="" className="size-5 mr-2" />
            <p className="font-bold text-base">Toilet-Issue</p>
          </div>
        </nav>
      </header>
    </>
  );
};
