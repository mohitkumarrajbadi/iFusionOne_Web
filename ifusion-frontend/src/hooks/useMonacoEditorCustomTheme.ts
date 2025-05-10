// useMonacoEditorCustomTheme.ts

export const customThemes = {
    'Mac Light': 'macLightTheme',
    'Atom One Dark': 'atomOneDarkTheme',
    'Xcode Light': 'xcodeLight',
    // 'IntelliJ Dark': 'intelliJDark',
    'Sublime Material': 'sublimeMaterial',
    'Nord': 'nord',
    'Dracula': 'dracula',
    'Cyberpunk Neon': 'cyberpunkNeon',
    'RetroWave': 'retroWave',
    'Sunset Glow': 'sunsetGlow',
    'Galaxy': 'galaxy',
    // 'Aurora': 'aurora',
    'Pastel Dream': 'pastelDream',
    // 'Nebula Dream': 'nebulaDream',
    // 'Starship Odyssey': 'starshipOdyssey',
    // 'Cosmic Horizon': 'cosmicHorizon',
    'Black Hole': 'blackHole',
    // 'Astro Chrome': 'astroChrome',
    // 'Astronaut Visions': 'astronautVisions'
};

export const defineMonacoThemes = (monaco: any) => {
    const themeList = {
        macLightTheme: {
            base: 'vs',
            inherit: true,
            rules: [
                { token: '', foreground: '333333' },
                { token: 'comment', foreground: 'A0A0A0', fontStyle: 'italic' },
                { token: 'keyword', foreground: '006699', fontStyle: 'bold' },
                { token: 'string', foreground: '009900' },
                { token: 'number', foreground: '990000' },
            ],
            colors: {
                'editor.background': '#FAFAFA',
                'editor.foreground': '#333333',
                'editorLineNumber.foreground': '#CCCCCC',
                'editorCursor.foreground': '#006699',
            },
        },
        atomOneDarkTheme: {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: 'ABB2BF', background: '282C34' },
                { token: 'comment', foreground: '5C6370', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'C678DD' },
                { token: 'string', foreground: '98C379' },
                { token: 'number', foreground: 'D19A66' },
            ],
            colors: {
                'editor.background': '#282C34',
                'editor.foreground': '#ABB2BF',
                'editorCursor.foreground': '#528BFF',
            },
        },
        xcodeLight: {
            base: 'vs',
            inherit: true,
            rules: [
                { token: '', foreground: '000000', background: 'FFFFFF' },
                { token: 'comment', foreground: '007F00', fontStyle: 'italic' },
                { token: 'keyword', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'string', foreground: 'A31515' },
                { token: 'number', foreground: '098658' },
            ],
            colors: {
                'editor.background': '#FFFFFF',
                'editor.foreground': '#000000',
                'editorCursor.foreground': '#FF0000',
            },
        },
        intelliJDark: {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: 'A9B7C6', background: '2B2B2B' },
                { token: 'comment', foreground: '808080', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'CC7832' },
                { token: 'string', foreground: '6A8759' },
                { token: 'number', foreground: '6897BB' },
            ],
            colors: {
                'editor.background': '#2B2B2B',
                'editor.foreground': '#A9B7C6',
                'editorCursor.foreground': '#FFFFFF',
            },
        },
        sublimeMaterial: {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: 'ECEFF1', background: '263238' },
                { token: 'comment', foreground: '546E7A', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'FF4081' },
                { token: 'string', foreground: 'C3E88D' },
                { token: 'number', foreground: 'F77669' },
            ],
            colors: {
                'editor.background': '#263238',
                'editor.foreground': '#ECEFF1',
                'editorCursor.foreground': '#FFCC00',
            },
        },
        nord: {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: 'D8DEE9', background: '2E3440' },
                { token: 'comment', foreground: '616E88', fontStyle: 'italic' },
                { token: 'keyword', foreground: '81A1C1' },
                { token: 'string', foreground: 'A3BE8C' },
                { token: 'number', foreground: 'B48EAD' },
            ],
            colors: {
                'editor.background': '#2E3440',
                'editor.foreground': '#D8DEE9',
                'editorCursor.foreground': '#88C0D0',
            },
        },
        dracula: {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: 'F8F8F2', background: '282A36' },
                { token: 'comment', foreground: '6272A4', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'FF79C6' },
                { token: 'string', foreground: 'F1FA8C' },
                { token: 'number', foreground: 'BD93F9' },
            ],
            colors: {
                'editor.background': '#282A36',
                'editor.foreground': '#F8F8F2',
                'editorCursor.foreground': '#50FA7B',
            },
        },
        cyberpunkNeon: {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: '00FF00', background: '1A1A1A' },
                { token: 'comment', foreground: 'FF007F', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'FF00FF', fontStyle: 'bold' },
                { token: 'string', foreground: 'FFFC00' },
                { token: 'variable', foreground: '1E90FF' },
                { token: 'number', foreground: 'FF6347' },
            ],
            colors: {
                'editor.background': '#1A1A1A',
                'editor.foreground': '#00FF00',
                'editorLineNumber.foreground': '#CCCCCC',
                'editorCursor.foreground': '#00FF00',
                'diffEditor.insertedTextBackground': '#00FF0033',
                'diffEditor.removedTextBackground': '#FF000033',
            },
        },
        retroWave: {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: 'FF77FF', background: '1B0033' },
                { token: 'comment', foreground: 'A83279', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'FF00FF', fontStyle: 'bold' },
                { token: 'string', foreground: 'FFDC00' },
                { token: 'number', foreground: 'FF6EC7' },
            ],
            colors: {
                'editor.background': '#1B0033',
                'editor.foreground': '#FF77FF',
                'editorCursor.foreground': '#FF00FF',
            },
        },
        sunsetGlow: {
            base: 'vs',
            inherit: true,
            rules: [
                { token: '', foreground: 'FF4500', background: 'FFF8F0' },
                { token: 'comment', foreground: 'FF69B4', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'FF6347', fontStyle: 'bold' },
                { token: 'string', foreground: 'FFA07A' },
                { token: 'variable', foreground: 'FF8C00' },
                { token: 'number', foreground: 'DC143C' },
            ],
            colors: {
                'editor.background': '#FFF8F0',
                'editor.foreground': '#FF4500',
                'editorLineNumber.foreground': '#FFB6C1',
                'editorCursor.foreground': '#FF6347',
                'diffEditor.insertedTextBackground': '#FFB34733',
                'diffEditor.removedTextBackground': '#FF6F6133',
            },
        },
        galaxy: {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: 'E0E0FF', background: '0D0D2B' },
                { token: 'comment', foreground: '8080FF', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'BA55D3', fontStyle: 'bold' },
                { token: 'string', foreground: '9370DB' },
                { token: 'variable', foreground: '7B68EE' },
                { token: 'number', foreground: 'FFB6C1' },
            ],
            colors: {
                'editor.background': '#0D0D2B',
                'editor.foreground': '#E0E0FF',
                'editorLineNumber.foreground': '#8080FF',
                'editorCursor.foreground': '#FF69B4',
                'diffEditor.insertedTextBackground': '#66339933',
                'diffEditor.removedTextBackground': '#4B008233',
            },
        },
        pastelDream: {
            base: 'vs',
            inherit: true,
            rules: [
                { token: '', foreground: '708090', background: 'FAF9FF' },
                { token: 'comment', foreground: 'DDA0DD', fontStyle: 'italic' },
                { token: 'keyword', foreground: '87CEFA', fontStyle: 'bold' },
                { token: 'string', foreground: 'FFDAB9' },
                { token: 'variable', foreground: '98FB98' },
                { token: 'number', foreground: 'F08080' },
            ],
            colors: {
                'editor.background': '#FAF9FF',
                'editor.foreground': '#708090',
                'editorLineNumber.foreground': '#C0C0C0',
                'editorCursor.foreground': '#87CEFA',
                'diffEditor.insertedTextBackground': '#D0F0C033',
                'diffEditor.removedTextBackground': '#FFCCCC33',
            },
        },
        blackHole: {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: '', foreground: 'AAAAAA', background: '000000' },
                { token: 'comment', foreground: '666666', fontStyle: 'italic' },
                { token: 'keyword', foreground: '8A2BE2', fontStyle: 'bold' },
                { token: 'string', foreground: 'FFD700' },
                { token: 'variable', foreground: '00CED1' },
                { token: 'number', foreground: 'FF4500' },
            ],
            colors: {
                'editor.background': '#000000',
                'editor.foreground': '#AAAAAA',
                'editorLineNumber.foreground': '#444444',
                'editorCursor.foreground': '#FFD700',
                'diffEditor.insertedTextBackground': '#00FF0033',
                'diffEditor.removedTextBackground': '#FF000033',
            },
        },

    };

    Object.entries(themeList).forEach(([name, config]) => {
        monaco.editor.defineTheme(name, config);
    });
};

