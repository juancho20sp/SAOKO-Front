import { useLocation } from 'react-router-dom';


const useRoomPath = () => {
    const { pathname } = useLocation();
    const path = pathname.split('/')[2];
  
    return { path };
};

export default useRoomPath;