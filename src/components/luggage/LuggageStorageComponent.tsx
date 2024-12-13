import React, { useState } from 'react';
import {LuggageStorage, LuggageStorageStatus} from "../../types/luggage.ts";
import {createLuggageStorage} from "../../api/luggageAPI.ts";


const LuggageStorageForm: React.FC = () => {
    const [formData, setFormData] = useState<LuggageStorage>({
        storageSpot: { spno: 0, spotname: '', address: '' },
        email: '',
        storageDate: '',
        storedUntil: '',
        status: LuggageStorageStatus.PENDING,
    });

    const [message, setMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.startsWith('storageSpot.')) {
            const key = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                storageSpot: {
                    ...prev.storageSpot,
                    [key]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await createLuggageStorage(formData);
            setMessage('수화물 보관 신청이 성공적으로 완료되었습니다!');
            console.log(result);
        } catch (error) {
            setMessage('수화물 보관 신청 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">수화물 보관 신청</h1>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="spotname" className="block mb-1 font-medium">보관 지점 이름</label>
                    <input
                        type="text"
                        id="spotname"
                        name="storageSpot.spotname"
                        value={formData.storageSpot.spotname}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block mb-1 font-medium">보관 지점 주소</label>
                    <input
                        type="text"
                        id="address"
                        name="storageSpot.address"
                        value={formData.storageSpot.address}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium">이메일</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="storedUntil" className="block mb-1 font-medium">보관 종료 날짜</label>
                    <input
                        type="datetime-local"
                        id="storedUntil"
                        name="storedUntil"
                        value={formData.storedUntil}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    신청하기
                </button>
            </form>
        </div>
    );
};

export default LuggageStorageForm;