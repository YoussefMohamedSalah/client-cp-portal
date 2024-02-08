import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// Toasts
import ErrorToast from '@/components/Alerts/ErrorToast';
import SuccessToast from '@/components/Alerts/SuccessToast';

// Contexts
import { AuthProvider } from "@/contexts/AuthContext";
import { UIProvider } from "@/contexts/UIContext";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<UIProvider>
				<AuthProvider>
					<LocalizationProvider dateAdapter={AdapterMoment}>
						{children}
						<ErrorToast />
						<SuccessToast />
					</LocalizationProvider>
				</AuthProvider>
			</UIProvider>
		</QueryClientProvider>
	)
}

export default Providers
