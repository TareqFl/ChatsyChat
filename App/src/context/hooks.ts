import { useContext } from 'react';
import Api from '../context/Context';

const useHooks = () => useContext(Api);

export { useHooks };