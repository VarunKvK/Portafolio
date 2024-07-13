const WorkingContainer = ({workingTitle, workingDescription,className}) => {
    return (
      <div className="bg-[#F1F1F1] border border-white/80 dark:bg-[#15191a] dark:border-[#282F30]/40 rounded-[30px] px-[30px] py-[25px] flex flex-col justify-between gap-20 grow">
              <h1 className="text-[37px] md:text-[30px] font-bold text-[#282F30] dark:text-[#f1f1f1]">
                {workingTitle}
              </h1>
              <p className="md:text-lg text-[15px] fond-semibold text-[#4D5657] dark:text-[#8c999b] w-[80%]">
                {workingDescription}
              </p>
            </div>
    );
  };
  
  export default WorkingContainer;