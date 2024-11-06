import '../../../index.css'
import { BackgroundGradient } from '../../../components/ui/background-gradient';
import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandOnlyfans,
  IconBrandTiktok
} from "@tabler/icons-react";
import Button from '../../../components/Button';
import { X } from 'lucide-react';
const Login = () => {
 

  return (
    <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[40%] '>
    <BackgroundGradient>
  <form className=' flex flex-col gap-4 card w-[clamp(5rem,32vw,30rem)] h-[clamp(10rem,40vw,50rem)]  
 justify-around p-6 items-center '>      

   <h1 className='text-3xl font-bold brightness-110 text-shadow-lg  '>LOGIN</h1>
                       
        <div className='mb-2 w-full flex flex-col gap-4'>
          <label htmlFor="email" className='block  font-bold opacity-90 brightness-95 '>Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder='Yuamikami@vx.com' 
            required 
            className=' rounded-md  p-2 w-full bg-primary  aspect-[7/1] '
          />

           <button 
          type="submit" 
          className=" w-full bg-highlight text-black font-bold aspect-[9/1] rounded-md "
        >
          send
        </button>
        <p className='font-bold mb-2 '>
          Or with account:
        </p>
        <div className='flex flex-row flex-wrap gap-3  w-full '>
          <IconAndLabel icon={IconBrandFacebook} label=" Facebook" />
          <IconAndLabel icon={IconBrandGoogle} label=" Google" />
          <IconAndLabel icon={IconBrandOnlyfans} label=" OnlyFans"  />
          <IconAndLabel icon={IconBrandTiktok} label="TikTok" />

      </div>
        </div>
       

      </form>
    </BackgroundGradient>
    </div>
  );
}

const IconAndLabel = ({ icon: Icon, label  }) => {
  return (
    <button className=" flex items-center bg-stone-100 aspect-[4/1] rounded-md w-[48%] text-gray-700">
      <div className='flex '>
      <Icon className="mx-2" /> {/* Add margin to the right for spacing */}
      {label}
      </div>
    </button>
  );
}

export default Login;
