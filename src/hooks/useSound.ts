const useSound = (src: string) => {
    const applaySound = () => {
        const audio = new Audio(src);
        audio.play();
    };
    return { applaySound };
};

export default useSound;
