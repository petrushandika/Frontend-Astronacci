function Header() {
  return (
    <>
      <div className="md:hidden flex justify-center py-6 bg-white shadow-md sticky top-0 z-10">
        <img
          src="https://res.cloudinary.com/dqcyabvc2/image/upload/v1747901408/Logo_ybz7ji.png "
          alt="Astronacci International Logo"
          className="h-8 w-auto mr-2 object-contain"
        />
        <span className="text-lg font-semibold text-gray-800">
          Astronacci International
        </span>
      </div>
    </>
  );
}

export default Header;
