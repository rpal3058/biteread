const LeftHalf = (props: any) => {
  return (
    <div className="col-span-1 bg-opacity-0 mt-8 mb-8  sm:ml-1 sm:mr-1 md:ml-2 md:mr-2 lg:ml-4 lg:mr-4 xl:ml-8 xl:mr-8 sm:font-normal md:font-medium lg:font-semibold xl:font-bold ">
      <p className="text-white sm:text-xl md:text-xl lg:text-xl xl:text-xl word-spacing-8 leading-16">
        {props.content}
      </p>
    </div>
  );
};

export default LeftHalf;
