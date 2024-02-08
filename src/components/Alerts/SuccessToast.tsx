import { useEffect } from "react";
import { useUI } from "contexts/UIContext";
import useSound from 'use-sound';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Action Success', { duration: 5000 });

const SuccessAnimation: React.FC = () => {
	const { isShowSuccess } = useUI();
	const [play] = useSound(require('../../assets/sounds/success.mp3'));

	useEffect(() => {
		if (isShowSuccess) {
			play();
			notify();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShowSuccess])

	return (
		<Toaster />
	);
};

export default SuccessAnimation;
