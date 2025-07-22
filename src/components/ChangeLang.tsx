import React from 'react'
import { HiMiniLanguage } from "react-icons/hi2";
import { useGlobalContext } from '../utils/GlobalContext';
import { changeLang } from '../utils/lang';

const ChangeLang = () => {
  const {setWhichLang, WhichLang} = useGlobalContext()
  //& For multi lang
  const HandleLangChange = () => {
    const Lang = changeLang()
    setWhichLang(Lang)
  }
  return (
    <div onClick={HandleLangChange} className=' z-20 my-5 hover:text-[var(--orange)] rounded-md cursor-pointer bg-[var(--dark-orange)] border border-[var(--orange)] px-4 flex justify-center items-center w-[50px] h-[30px] hover:w-full max-w-[300px] duration-700 py-2  '>
      <HiMiniLanguage />
    </div>
  )
}

export default ChangeLang
