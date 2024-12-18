import axios from 'axios';
import {LuggageStorage, LuggageStorageDTO} from "../types/luggage.ts";

const BASE_URL = '/api/user/luggagestorage';

export const createLuggageStorage = async (luggageStorage: LuggageStorage): Promise<LuggageStorageDTO> => {
    const response = await axios.post<LuggageStorageDTO>(`${BASE_URL}/create`, luggageStorage);
    return response.data;
};
