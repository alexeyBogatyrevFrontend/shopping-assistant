import axios from 'axios';

export interface RequestError {
	message: string;
	status: number | null;
}

export const getRequestError = (error: unknown): RequestError => {
	if (!axios.isAxiosError(error)) {
		return {
			message: 'Произошла неизвестная ошибка',
			status: null,
		};
	}

	const status = error.response?.status ?? null;

	if (error.code === 'ECONNABORTED') {
		return {
			message: 'Сервер не ответил вовремя. Попробуйте ещё раз',
			status,
		};
	}

	if (!error.response) {
		return {
			message: 'Не удалось подключиться к серверу',
			status: null,
		};
	}

	if (status === 404) {
		return {
			message: 'Запрашиваемые данные не найдены',
			status,
		};
	}

	if (status) {
		if (status >= 500)
			return {
				message: 'На сервере произошла ошибка. Попробуйте позже',
				status,
			};
	}

	return {
		message: 'Не удалось выполнить запрос',
		status,
	};
};
