const GuideStyling = ({id,guide}) => {
  return (
    <div className='flex gap-6 items-center'>
        <div className="w-10 h-10 font-semibold flex items-center justify-center rounded-full bg-[#F1C40F] text-[#282F30] dark:text-[#282F30] text-[15px]">
            {id}
        </div>
        <p className="text-[17.5px] text-[#282F30] dark:text-[#f1f1f1] font-medium">{guide}</p>
    </div>
  )
}

export default GuideStyling