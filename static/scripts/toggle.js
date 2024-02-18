function ToggleMode() {
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--val');
    const newColor = currentColor === '0' ? '255' : '0';

    const LightObjects = document.getElementsByClassName("light-only");
    const DarkObjects = document.getElementsByClassName("dark-only");

    document.documentElement.style.setProperty('--val', newColor);

    Array.from(LightObjects).forEach(element => {
        element.style.display = newColor === '0' ? 'none' : 'block';
    });

    Array.from(DarkObjects).forEach(element => {
        element.style.display = newColor === '0' ? 'block' : 'none';
    });
    
}
