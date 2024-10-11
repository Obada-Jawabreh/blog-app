import error from "../assets/images/error.png";
import { Link } from "react-router-dom";
function Error404() {
  return (
    <div className="min-h-full mx-8 sm:mx-8 lg:mx-12 xl:mx-48 my-20 flex flex-col gap-4 content-center justify-center place-items-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-text-prim">Ooops</div>
        <div className="text-lg text-text-second font-semibold">
          Page Not Found
        </div>
      </div>
      <div className="flex content-center justify-center">
        <img src={error} className="w-3/4" />
      </div>
      {/* <div className="flex w-4/6 justify-center">
        <MainButton>Back to Home</MainButton>
      </div> */}
      <Link to="/">
          Back to Login
      </Link>
    </div>
  );
}

export default Error404;
