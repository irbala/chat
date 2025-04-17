document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const streamerInput = document.getElementById('streamer-input');
    const loadChatBtn = document.getElementById('load-chat-btn');
    const twitchChatIframe = document.getElementById('twitch-chat-iframe');
    const chatWrapper = document.getElementById('chat-wrapper');
    const themeSelector = document.getElementById('theme-selector');
    const bgColorPicker = document.getElementById('bg-color-picker');

    // Info-only controls (cannot style iframe content directly)
    const fontSizeSlider = document.getElementById('font-size-slider');
    const fontSizeValue = document.getElementById('font-size-value');
    const textColorPicker = document.getElementById('text-color-picker');

    const defaultStreamer = 'irbala'; // Default streamer

    // --- Functions ---

    // Function to load Twitch chat
    function loadTwitchChat(streamerName) {
        if (!streamerName || streamerName.trim() === '') {
            // Optionally alert the user or handle the empty case
            console.warn("Streamer name is empty.");
             // Keep the iframe blank or show a placeholder message
             twitchChatIframe.src = 'about:blank';
            return;
        }
        const chatUrl = `https://www.twitch.tv/popout/${streamerName.trim()}/chat?popout=`;
        twitchChatIframe.src = chatUrl;
    }

    // Function to apply selected theme
    function applyTheme(themeName) {
        document.body.classList.remove('theme-light', 'theme-dark', 'theme-cozy'); // Remove old theme
        if (themeName) {
            document.body.classList.add(`theme-${themeName}`);
        }
        // Adjust initial BG color based on theme (user can override with picker)
        if (themeName === 'dark') {
            bgColorPicker.value = '#2e2e2e'; // Default dark bg
        } else if (themeName === 'cozy') {
            bgColorPicker.value = '#fdf6e3'; // Default cozy bg
        } else {
            bgColorPicker.value = '#ffffff'; // Default light bg
        }
        updateChatWrapperBackground(); // Apply the initial theme background
    }

    // Function to update the chat container's background color
    function updateChatWrapperBackground() {
        chatWrapper.style.backgroundColor = bgColorPicker.value;
    }

     // Function to update font size display (Info Only)
     function updateFontSizeDisplay() {
        fontSizeValue.textContent = `${fontSizeSlider.value}px`;
        // Attempting to style iframe would go here, but will fail:
        // try {
        //    const iframeDoc = twitchChatIframe.contentDocument || twitchChatIframe.contentWindow.document;
        //    iframeDoc.body.style.fontSize = `${fontSizeSlider.value}px`; // This will be blocked by Same-Origin Policy
        // } catch (e) {
        //    console.warn("Cannot style iframe content due to security restrictions:", e);
        // }
     }

    // Function to handle text color change (Info Only)
     function updateTextColor() {
        // Attempting to style iframe would go here, but will fail:
        // try {
        //    const iframeDoc = twitchChatIframe.contentDocument || twitchChatIframe.contentWindow.document;
        //    // Need to find specific Twitch chat text elements, e.g., '.chat-line__message', '.text-fragment'
        //    // const messages = iframeDoc.querySelectorAll('.text-fragment');
        //    // messages.forEach(msg => msg.style.color = textColorPicker.value); // This will be blocked
        // } catch (e) {
        //    console.warn("Cannot style iframe content due to security restrictions:", e);
        // }
     }

    // Function to save preferences to localStorage
    function savePreferences() {
        localStorage.setItem('twitchChat_streamer', streamerInput.value);
        localStorage.setItem('twitchChat_theme', themeSelector.value);
        localStorage.setItem('twitchChat_bgColor', bgColorPicker.value);
        // Optionally save info-only values if needed for display consistency
        localStorage.setItem('twitchChat_fontSize', fontSizeSlider.value);
        localStorage.setItem('twitchChat_textColor', textColorPicker.value);
    }

    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedStreamer = localStorage.getItem('twitchChat_streamer') || defaultStreamer;
        const savedTheme = localStorage.getItem('twitchChat_theme') || 'light';
        const savedBgColor = localStorage.getItem('twitchChat_bgColor') || '#ffffff'; // Default to white if nothing saved

        // Info-only values
        const savedFontSize = localStorage.getItem('twitchChat_fontSize') || '14';
        const savedTextColor = localStorage.getItem('twitchChat_textColor') || '#333333';


        streamerInput.value = savedStreamer;
        themeSelector.value = savedTheme;
        bgColorPicker.value = savedBgColor;
        fontSizeSlider.value = savedFontSize;
        textColorPicker.value = savedTextColor;


        applyTheme(savedTheme); // Apply theme first, which sets default bg
        bgColorPicker.value = savedBgColor; // Override with saved specific bg color if different
        updateChatWrapperBackground(); // Apply the potentially overridden background
        updateFontSizeDisplay(); // Update display value
        loadTwitchChat(savedStreamer); // Load the chat for the saved streamer
    }

    // --- Event Listeners ---

    // Load chat when button is clicked
    loadChatBtn.addEventListener('click', () => {
        loadTwitchChat(streamerInput.value);
        savePreferences(); // Save streamer name on load
    });

    // Allow pressing Enter in the input field to load chat
    streamerInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent potential form submission
            loadTwitchChat(streamerInput.value);
            savePreferences(); // Save streamer name on load
        }
    });

    // Change theme
    themeSelector.addEventListener('change', () => {
        applyTheme(themeSelector.value);
        savePreferences(); // Save theme preference
    });

    // Change background color of the chat container
    bgColorPicker.addEventListener('input', () => {
        updateChatWrapperBackground();
        // Debounce saving slightly or save on change event if input is too frequent
        // For simplicity, saving on 'input' here
        savePreferences();
    });

     // Update font size display (Info Only)
     fontSizeSlider.addEventListener('input', updateFontSizeDisplay);
     fontSizeSlider.addEventListener('change', savePreferences); // Save final value

     // Handle text color change (Info Only)
     textColorPicker.addEventListener('input', updateTextColor);
     textColorPicker.addEventListener('change', savePreferences); // Save final value


    // --- Initial Load ---
    loadPreferences();

});