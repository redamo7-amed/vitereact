import { LuUser } from "react-icons/lu";
import { RxExit } from "react-icons/rx";



const Header = () => {
  return (
    <div className="flex justify-between items-center px-4  bg-white h-14 border border-b-2 bo">
        <div>
            <a href="#" className="font-bold ml-6">Daily Tasks</a>
        </div>
        <div className="flex gap-4" >
            <button className="w-8 h-8 hover:bg-gray-300 flex items-center justify-center rounded-md"><LuUser/></button>
            <button className="w-8 h-8 hover:bg-gray-300 flex items-center justify-center hover:text-red-500 rounded-md"><RxExit/></button>
            

           
           
            
           

        </div>
    </div>
  )
}

export default Header