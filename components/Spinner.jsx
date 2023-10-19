import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <TailSpin
        height="80"
        width="80"
        color="#80dff4"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Spinner;
