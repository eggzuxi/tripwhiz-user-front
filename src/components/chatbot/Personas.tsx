import { PersonaOptions } from '@nlux/react';

const assistantAvatar = '../public/images/baggybot.png';
const userAvatar = 'https://docs.nlkit.com/nlux/images/personas/marissa.png';

export const personas: PersonaOptions = {
    assistant: {
        name: 'BaggyBot',
        avatar: assistantAvatar,
    },
    user: {
        name: 'jin',
        avatar: userAvatar,
    }
};