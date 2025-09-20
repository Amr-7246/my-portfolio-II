import axios, {  } from "axios";
import { useQuery } from "@tanstack/react-query";
import { BackEnd_URL } from ".";
import { useGlobalContext } from "../utils/GlobalContext";

const useGetEntity = <T>( entity: string, setContextData = null , enabled = true ) => {
  const {setallCategories} = useGlobalContext()
  return useQuery({
    queryKey: ['entity', entity],
    queryFn: async () => {
      const response = await axios.get(`${BackEnd_URL}/${entity}`);
      if (setContextData) {
        //@ts-ignore
        setContextData(response.data.data.docs)
        return "categories had been added to context" ;
      }else {
        return response.data.data.docs ;
      }
    },
    enabled ,
  });
};

export default useGetEntity;
