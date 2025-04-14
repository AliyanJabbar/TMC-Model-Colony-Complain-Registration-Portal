import Link from "next/link";

const Button = (props: {
  text: string;
  link?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}) => {
  return (
    <>
      {props.link ? (
        <Link
          aria-disabled={props.isLoading}
          href={props.link}
          className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-greenish rounded-md group"
        >
          {props.isLoading ? (
            <div className="flex text-center justify-center gap-5 text-nowrap">
              <div>
                <span className="relative w-full text-center sm:text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white bg-green-500">
                  {props.text}
                </span>
              </div>
              <div className="flex items-center justify-center w-full h-full">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <>
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
              </span>
              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-[101%] bg-green-500 rounded-md group-hover:translate-x-0" />
              <span className="relative w-full text-center sm:text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                {props.text}
              </span>
            </>
          )}
        </Link>
      ) : (
        <button
          disabled={props.isLoading}
          type={props.type || "button"}
          className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-greenish rounded-md group"
        >
          {props.isLoading ? (
            <div className="flex text-center justify-center gap-5 text-nowrap">
              <div>
                <span className="w-full h-full bg-green-500 " />
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                  {props.text}
                </span>
              </div>
              <div className="flex items-center justify-center w-full h-full">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <>
              <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
              </span>
              <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-green-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-[101%] bg-green-500 rounded-md group-hover:translate-x-0" />
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                {props.text}
              </span>
            </>
          )}
        </button>
      )}
    </>
  );
};

export default Button;
