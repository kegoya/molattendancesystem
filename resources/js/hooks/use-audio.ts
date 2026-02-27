export const useAudio = () => {
    const playSuccess = () => {
        const audio = new Audio('/sounds/success.mp3');
        audio.play().catch(e => console.log("Audio play blocked by browser."));
    };

    const playError = () => {
        const audio = new Audio('/sounds/error.mp3');
        audio.play().catch(e => console.log("Audio play blocked by browser."));
    };

    return { playSuccess, playError };
};