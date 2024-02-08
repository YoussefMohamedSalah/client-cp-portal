import { useEffect } from "react";
import { useUI } from "contexts/UIContext";
import useSound from 'use-sound';
import toast, { Toaster } from 'react-hot-toast';

const ErrorToast: React.FC = () => {
	const { errorsList, isShowError, hideError } = useUI();
	const [play] = useSound(require('../../assets/sounds/error.mp3'));

	useEffect(() => {
		if (isShowError && errorsList) {
			play();
			for (let i = 0; i < errorsList.length; i++) {
				const error = errorsList[i];
				toast.error(`${error.msg}`, { duration: 5000 })
			}
			setTimeout(() => {
				hideError()
			}, 5000)
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShowError])

	return (
		<Toaster />
	);
};

export default ErrorToast;
