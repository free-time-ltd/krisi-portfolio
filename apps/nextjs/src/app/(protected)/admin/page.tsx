import { SignIn, SignOut } from "~/components/Auth";

const DashboardPage = async () => {
  return (
    <>
      <h1>Dashboard in the Admin Panel</h1>
      <div className="my-16">
        <SignIn />
      </div>
      <div className="my-16">
        <SignOut />
      </div>
    </>
  );
};

export default DashboardPage;
