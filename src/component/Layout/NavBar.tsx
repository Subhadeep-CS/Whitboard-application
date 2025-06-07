import { SignedIn, UserButton } from "@clerk/nextjs";
const NavBar = () => {
  return (
    <header className="w-full !py-4 shadow-md flex justify-between items-center !px-6 bg-white">
      <div className="text-xl font-bold">Whiteboard App</div>

      <nav className="space-x-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </header>
  );
};

export default NavBar;
