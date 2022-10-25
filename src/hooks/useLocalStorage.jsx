import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(() => {
    const list = JSON.parse(localStorage.getItem(key));// tento pegar a chave passada pelo usuario
    return list || initialState;// caso nao exista (null) , para nao quebrar coloco um ou array vazio (essa eu manjo haha)
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]); // toada vez que o estado mudar ele seta o novo estado no LocalStorage

  return { state, setState }; // passo como se fosse um useState para eu poder ter acesso a função que muda e ao estado
};

export default useLocalStorage;
