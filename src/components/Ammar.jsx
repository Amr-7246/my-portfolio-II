
const Ammar = () => {
  return (
    <div className='bg-stone-600 flex w-full h-fit items-center justify-center flex-wrap gap-3 pt-[150px]'>
      {
        Array.from({length:10}).map(()=> (
          <div className="w-[300px] h-[200px] cursor-pointer border border-stone-600 bg-black rounded-lg flex items-center justify-center hover:scale-95 duration-400">ammar</div>
        ))
      }
      {/* {Array.from({ length : 10 }).map(() => (
        <div className="w-[300px] h-[200px] cursor-pointer border border-stone-600 bg-black rounded-lg flex items-center justify-center hover:scale-95 duration-400">Ammar</div>
      ))} */}
    </div>
  )
}

export default Ammar