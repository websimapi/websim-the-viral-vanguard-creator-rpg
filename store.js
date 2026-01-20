import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const room = new WebsimSocket();

// Game constants
export const LEVELS = [
    0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000
];

export const TITLES = [
    "Novice Editor", "Clip Rogue", "Content Mage", "Viral Warrior", 
    "Algorithm Whisperer", "Trend Lord", "Meme God", "Legendary Creator"
];

// Initial Quest Data (Social Media Workflow)
const STARTER_QUESTS = [
    {
        id: 'q1',
        title: 'The Brainstorm',
        description: 'Generate 5 concepts for new short-form videos.',
        xp: 50,
        gold: 100,
        type: 'scripting',
        status: 'active', // active, completed
        location: 'whiteboard'
    },
    {
        id: 'q2',
        title: 'Filming Session',
        description: 'Record raw footage for one concept.',
        xp: 150,
        gold: 300,
        type: 'filming',
        status: 'active',
        location: 'greenscreen'
    },
    {
        id: 'q3',
        title: 'The Edit Bay',
        description: 'Assemble rough cut, add captions, and export.',
        xp: 200,
        gold: 400,
        type: 'editing',
        status: 'active',
        location: 'computer'
    }
];

export const useGameStore = create((set, get) => ({
    // Character Stats
    user: null,
    level: 1,
    xp: 0,
    gold: 0,
    title: TITLES[0],
    streak: 0,
    
    // Game State
    quests: [],
    activeStation: null, // 'whiteboard', 'computer', 'greenscreen'
    isModalOpen: false,
    notifications: [],
    
    // Actions
    init: async () => {
        // Load from Websim DB
        const user = await window.websim.getCurrentUser();
        
        let savedData = null;
        try {
            const records = await room.collection('player_save').filter({ username: user.username }).getList();
            if (records.length > 0) {
                savedData = records[0];
            }
        } catch (e) { console.error("Load error", e); }

        if (savedData) {
            set({
                user: user,
                level: savedData.level || 1,
                xp: savedData.xp || 0,
                gold: savedData.gold || 0,
                title: TITLES[(savedData.level || 1) - 1] || TITLES[0],
                quests: savedData.quests && savedData.quests.length ? savedData.quests : STARTER_QUESTS
            });
        } else {
            set({ user, quests: STARTER_QUESTS });
        }
    },

    saveProgress: async () => {
        const { level, xp, gold, quests, user } = get();
        if (!user) return;
        
        const records = await room.collection('player_save').filter({ username: user.username }).getList();
        
        const data = { level, xp, gold, quests };
        
        if (records.length > 0) {
            await room.collection('player_save').update(records[0].id, data);
        } else {
            await room.collection('player_save').create(data);
        }
    },

    addXp: (amount) => {
        const { xp, level } = get();
        let newXp = xp + amount;
        let newLevel = level;
        let didLevelUp = false;

        // Check level up
        const nextLevelXp = LEVELS[level];
        if (newXp >= nextLevelXp) {
            newLevel++;
            newXp = newXp - nextLevelXp;
            didLevelUp = true;
            
            // Play sound
            const audio = new Audio('levelup.mp3');
            audio.volume = 0.4;
            audio.play();
        }

        set({ xp: newXp, level: newLevel, title: TITLES[newLevel - 1] || TITLES[TITLES.length - 1] });
        get().saveProgress();
        
        return didLevelUp;
    },

    addGold: (amount) => {
        set((state) => ({ gold: state.gold + amount }));
    },

    completeQuest: (id) => {
        const { quests } = get();
        const questIndex = quests.findIndex(q => q.id === id);
        if (questIndex === -1) return;

        const quest = quests[questIndex];
        const didLevelUp = get().addXp(quest.xp);
        get().addGold(quest.gold);

        // Mark complete but keep in history (or regenerate if it's a daily)
        const newQuests = [...quests];
        newQuests[questIndex] = { ...quest, status: 'completed', completedAt: new Date().toISOString() };
        
        set({ quests: newQuests, isModalOpen: false, activeStation: null });
        
        get().notify(`Completed: ${quest.title}`, 'success');
        if (didLevelUp) get().notify("LEVEL UP!", 'epic');
        
        // Play sound
        const audio = new Audio('quest_complete.mp3');
        audio.volume = 0.4;
        audio.play();

        get().saveProgress();
    },

    addCustomQuest: (title, description, station) => {
        const newQuest = {
            id: uuidv4(),
            title,
            description,
            xp: 100,
            gold: 200,
            type: station,
            status: 'active',
            location: station
        };
        set(state => ({ quests: [...state.quests, newQuest] }));
        get().saveProgress();
    },

    openStation: (stationName) => set({ isModalOpen: true, activeStation: stationName }),
    closeModal: () => set({ isModalOpen: false, activeStation: null }),
    
    notify: (message, type = 'info') => {
        const id = uuidv4();
        set(state => ({ notifications: [...state.notifications, { id, message, type }] }));
        setTimeout(() => {
            set(state => ({ notifications: state.notifications.filter(n => n.id !== id) }));
        }, 3000);
    }
}));