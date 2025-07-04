// UI Components Module
// Depends on: constants.js, music-theory.js

// Debug: Check if dependencies are loaded
console.log('UIComponents loading, MusicTheory available:', typeof window.MusicTheory);
console.log('MusicConstants available:', typeof window.MusicConstants);

// Main fretboard state
let fretboardState = {
    startFret: 0,
    fretRange: 12, // 12 or 24
    maxFrets: 24,
    showIntervals: false, // Add toggle state
    compareMode: false,
    comparisonScale: null,
    comparisonSelection: null
};

// Modal fretboard state (separate from main fretboard)
let modalFretboardState = {
    startFret: 0,
    fretRange: 12, // Default to 12 for modal (changed from 15)
    maxFrets: 24
};

// Helper function to convert note names to chromatic indices (handles both sharps and flats)
function noteToIndex(note) {
    const noteMapping = {
            'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
            'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9,
            'A#': 10, 'Bb': 10, 'B': 11,
        // Add double accidentals
        'C##': 2, 'D##': 4, 'F##': 7, 'G##': 9, 'A##': 11,
        'Dbb': 0, 'Ebb': 2, 'Gbb': 5, 'Abb': 7, 'Bbb': 9,
        // Add enharmonic equivalents for edge cases
        'B#': 0, 'E#': 5, 'Fb': 4, 'Cb': 11
    };
    return noteMapping[note] !== undefined ? noteMapping[note] : 0;
}

// Main fretboard rendering function
function createFretboard(scale) {
    console.log('Creating fretboard with scale:', scale);
    
    const fretboardContainer = document.querySelector('.fretboard-container');
    if (!fretboardContainer) {
        console.error('Fretboard container not found');
        return;
    }
    
    fretboardContainer.innerHTML = '';
    
    // Create fretboard controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'fretboard-controls';
    controlsDiv.innerHTML = `
        <div class="fret-range-selector">
            <button id="fret-range-toggle" class="toggle-btn">${fretboardState.fretRange === 12 ? '12 Frets' : '24 Frets'}</button>
        </div>
        <div class="display-toggle">
            <button id="toggle-display" class="toggle-btn">${fretboardState.showIntervals ? 'Show Notes' : 'Show Intervals'}</button>
        </div>
        <div class="color-toggle">
            <button id="fretboard-color-toggle" class="toggle-btn ${window.colorsVisible ? 'active' : ''}">${window.colorsVisible ? 'Colors On' : 'Colors Off'}</button>
        </div>
        <div class="compare-toggle">
            <button id="compare-scales" class="toggle-btn ${fretboardState.compareMode ? 'active' : ''}">${fretboardState.compareMode ? 'Exit Compare' : 'Compare Scales'}</button>
        </div>
    `;
    fretboardContainer.appendChild(controlsDiv);
    
    // Add event listeners for controls
    document.getElementById('fret-range-toggle').addEventListener('click', () => {
        fretboardState.fretRange = fretboardState.fretRange === 12 ? 24 : 12;
        fretboardState.startFret = 0; // Always start from fret 0
        createFretboard(scale);
    });
    
    // Add toggle functionality
    document.getElementById('toggle-display').addEventListener('click', () => {
        fretboardState.showIntervals = !fretboardState.showIntervals;
        
        // Show/hide interval info in comparison mode
        const intervalInfo = document.getElementById('interval-info');
        if (intervalInfo) {
            intervalInfo.style.display = fretboardState.showIntervals ? 'block' : 'none';
        }
        
        createFretboard(scale);
    });
    
    // Add color toggle functionality
    document.getElementById('fretboard-color-toggle').addEventListener('click', () => {
        window.colorsVisible = !window.colorsVisible;
        
        // Update the app controller state if available
        if (window.AppController) {
            window.AppController.updateColorVisibility(window.colorsVisible);
        }
        
        // Re-render the fretboard
        createFretboard(scale);
    });
    
    // Add compare functionality
    document.getElementById('compare-scales').addEventListener('click', () => {
        if (fretboardState.compareMode) {
            exitCompareMode();
        } else {
            enterCompareMode();
        }
    });
    
    // Show comparison selector if in compare mode
    if (fretboardState.compareMode) {
        showComparisonSelector(controlsDiv);
    }
    
    // Calculate display range
    const displayFrets = fretboardState.fretRange;
    const endFret = fretboardState.startFret + displayFrets;
    
    // String notes (high E to low E)
    const stringNotes = ['E', 'B', 'G', 'D', 'A', 'E'];
    
    // Create SVG with responsive width
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const fretWidth = displayFrets <= 12 ? 60 : 40; // Narrower frets for 24-fret view
    const svgWidth = 100 + (displayFrets * fretWidth);
    svg.setAttribute('viewBox', `0 0 ${svgWidth} 280`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '280');
    svg.style.background = '#2d3748';
    svg.style.border = '2px solid #4a5568';
    svg.style.borderRadius = '8px';
    
    // Draw fret lines
    for (let fret = 0; fret <= displayFrets; fret++) {
        const actualFret = fretboardState.startFret + fret;
        const x = 80 + (fret * fretWidth);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', 45); // Start just above the strings
        line.setAttribute('x2', x);
        line.setAttribute('y2', 225); // End just below the strings (strings are at y=60 to y=210)
        line.setAttribute('stroke', actualFret === 0 ? '#e2e8f0' : '#718096');
        line.setAttribute('stroke-width', actualFret === 0 ? '4' : '2');
        svg.appendChild(line);
        
        // Fret numbers - make them clearly visible
        if (fret > 0) {
            const fretNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            fretNumber.setAttribute('x', 80 + ((fret - 0.5) * fretWidth));
            fretNumber.setAttribute('y', 25);
            fretNumber.setAttribute('text-anchor', 'middle');
            fretNumber.setAttribute('fill', '#e2e8f0');
            fretNumber.setAttribute('font-size', displayFrets <= 12 ? '14' : '12');
            fretNumber.setAttribute('font-weight', 'bold');
            fretNumber.textContent = actualFret;
            svg.appendChild(fretNumber);
        }
    }
    
    // Draw strings
    for (let string = 0; string < 6; string++) {
        const y = 60 + (string * 30);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 80);
        line.setAttribute('y1', y);
        line.setAttribute('x2', 80 + (displayFrets * fretWidth));
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#a0aec0');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
        
        // String labels
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', 60);
        label.setAttribute('y', y + 5);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', '#f7fafc');
        label.setAttribute('font-size', '14');
        label.setAttribute('font-weight', 'bold');
        label.textContent = stringNotes[string];
        svg.appendChild(label);
    }
    
    // Draw fret markers for standard positions
    const markerFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    markerFrets.forEach(markerFret => {
        if (markerFret > fretboardState.startFret && markerFret <= endFret) {
            const fretPosition = markerFret - fretboardState.startFret;
            const x = 80 + ((fretPosition - 0.5) * fretWidth);
            
            if (markerFret === 12 || markerFret === 24) {
                // Double dots for octaves
                const marker1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker1.setAttribute('cx', x);
                marker1.setAttribute('cy', 105);
                marker1.setAttribute('r', '6');
                marker1.setAttribute('fill', '#ccc');
                svg.appendChild(marker1);
                
                const marker2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker2.setAttribute('cx', x);
                marker2.setAttribute('cy', 165);
                marker2.setAttribute('r', '6');
                marker2.setAttribute('fill', '#ccc');
                svg.appendChild(marker2);
            } else {
                // Single dot for other markers
                const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker.setAttribute('cx', x);
                marker.setAttribute('cy', 135);
                marker.setAttribute('r', '6');
                marker.setAttribute('fill', '#ccc');
                svg.appendChild(marker);
            }
        }
    });
    
    // Place notes on fretboard
    if (scale && scale.length > 0) {
        if (fretboardState.compareMode && fretboardState.comparisonScale) {
            renderComparisonFretboard(svg, scale, fretboardState.comparisonScale, displayFrets, fretWidth);
                    } else {
            renderSingleScale(svg, scale, displayFrets, fretWidth);
        }
    }
    
    // Add click handler for modal
    console.log('Adding click handler to fretboard SVG');
    svg.addEventListener('click', function(e) {
        console.log('Fretboard SVG clicked, opening modal');
        console.log('Event target:', e.target);
        console.log('Scale being passed:', scale);
        
        // Prevent any default behavior
        e.preventDefault();
        e.stopPropagation();
        
        try {
            openFretboardModal(scale);
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    });
    
    // Also add cursor pointer to indicate it's clickable
    svg.style.cursor = 'pointer';
    
    fretboardContainer.appendChild(svg);
}

// Helper function to get scale type from category
function getScaleTypeFromCategory(category) {
    switch (category) {
        case 'major-modes': return 'major';
        case 'harmonic-minor-modes': return 'harmonic-minor';
        case 'melodic-minor-modes': return 'melodic-minor';
        case 'diminished-modes': return 'diminished';
        case 'pentatonic-modes': return 'major-pentatonic';
        case 'blues-modes': return 'blues';
        case 'blues-scales': return 'blues';
        case 'barry-harris': return 'major-6th-diminished';
        case 'whole-tone': return 'whole-tone';
        case 'chromatic': return 'chromatic';
        default: return 'major';
    }
}

function openFretboardModal(scale) {
    console.log('===== OPENING FRETBOARD MODAL =====');
    console.log('Scale passed:', scale);
    
    const modal = document.getElementById('fretboard-modal');
    console.log('Modal element:', modal);
    
    if (!modal) {
        console.error('❌ Modal element not found!');
        return;
    }
    
    console.log('✅ Modal element found');
    console.log('Current modal classes:', modal.className);
    console.log('Current modal display:', modal.style.display);
    
    // Show the modal
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    
    console.log('Modal display set to:', modal.style.display);
    console.log('Modal classes after removing hidden:', modal.className);
    
    const fretboardDiv = modal.querySelector('.modal-fretboard');
    console.log('Modal fretboard div:', fretboardDiv);
    
    if (!fretboardDiv) {
        console.error('❌ Modal fretboard div not found!');
        console.log('Available elements in modal:', modal.innerHTML);
        return;
    }
    
    console.log('✅ Modal fretboard div found');
    
    // Clear existing content
    fretboardDiv.innerHTML = '';
    
    // Create simplified modal fretboard (larger version of main fretboard)
    renderModalFretboard(fretboardDiv, scale);
    
    console.log('✅ Modal fretboard rendered');
    
    // Apply utilities for modal functionality
    try {
        setOptimalModalSize();
        handleMobileOrientation();
        makeDraggable(modal);
        makeResizable(modal);
        console.log('✅ Modal utilities applied');
    } catch (error) {
        console.error('❌ Error applying modal utilities:', error);
    }
}

function renderModalFretboard(container, scale) {
    // Create a larger version of the main fretboard
    container.innerHTML = '';
    
    // Use the same state as the main fretboard
    const displayFrets = fretboardState.fretRange;
    const endFret = fretboardState.startFret + displayFrets;
    
    // String notes (high E to low E)
    const stringNotes = ['E', 'B', 'G', 'D', 'A', 'E'];
    
    // Create optimized SVG for modal with better space usage
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const fretWidth = displayFrets <= 12 ? 90 : 70; // Increased fret width for better visibility
    const stringSpacing = 45; // Increased string spacing
    const leftMargin = 80; // Reduced left margin
    const topMargin = 50; // Reduced top margin
    const svgWidth = leftMargin + (displayFrets * fretWidth) + 20;
    const svgHeight = topMargin + ((stringNotes.length - 1) * stringSpacing) + 60;
    
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.background = '#2d3748';
    svg.style.border = '2px solid #4a5568';
    svg.style.borderRadius = '12px';
    
    // Draw fret lines
    for (let fret = 0; fret <= displayFrets; fret++) {
        const actualFret = fretboardState.startFret + fret;
        const x = leftMargin + (fret * fretWidth);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', topMargin); // Start just above the strings
        line.setAttribute('x2', x);
        line.setAttribute('y2', topMargin + ((stringNotes.length - 1) * stringSpacing)); // End just below the strings
        line.setAttribute('stroke', actualFret === 0 ? '#e2e8f0' : '#718096');
        line.setAttribute('stroke-width', actualFret === 0 ? '5' : '3');
        svg.appendChild(line);
        
        // Fret numbers
        if (fret > 0) {
            const fretNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            fretNumber.setAttribute('x', leftMargin + ((fret - 0.5) * fretWidth));
            fretNumber.setAttribute('y', topMargin - 35);
            fretNumber.setAttribute('text-anchor', 'middle');
            fretNumber.setAttribute('fill', '#e2e8f0');
            fretNumber.setAttribute('font-size', '20');
            fretNumber.setAttribute('font-weight', 'bold');
            fretNumber.textContent = actualFret;
            svg.appendChild(fretNumber);
        }
    }
    
    // Draw strings
    for (let string = 0; string < stringNotes.length; string++) {
        const y = topMargin + (string * stringSpacing);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', leftMargin);
        line.setAttribute('y1', y);
        line.setAttribute('x2', leftMargin + (displayFrets * fretWidth));
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#6b7280');
        line.setAttribute('stroke-width', '3');
        svg.appendChild(line);
        
        // String labels
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', leftMargin - 25);
        label.setAttribute('y', y + 6);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', '#f7fafc');
        label.setAttribute('font-size', '20');
        label.setAttribute('font-weight', 'bold');
        label.textContent = stringNotes[string];
        svg.appendChild(label);
    }
    
    // Draw fret markers
    const markerFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    markerFrets.forEach(markerFret => {
        if (markerFret > fretboardState.startFret && markerFret <= endFret) {
            const fretPosition = markerFret - fretboardState.startFret;
            const x = leftMargin + ((fretPosition - 0.5) * fretWidth);
            const centerY = topMargin + (((stringNotes.length - 1) * stringSpacing) / 2);
            
            if (markerFret === 12 || markerFret === 24) {
                // Double dots for octaves
                const marker1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker1.setAttribute('cx', x);
                marker1.setAttribute('cy', centerY - stringSpacing * 0.8);
                marker1.setAttribute('r', '10');
                marker1.setAttribute('fill', '#d1d5db');
                svg.appendChild(marker1);
                
                const marker2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker2.setAttribute('cx', x);
                marker2.setAttribute('cy', centerY + stringSpacing * 0.8);
                marker2.setAttribute('r', '10');
                marker2.setAttribute('fill', '#d1d5db');
                svg.appendChild(marker2);
            } else {
                // Single dot for other markers
                const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker.setAttribute('cx', x);
                marker.setAttribute('cy', centerY);
                marker.setAttribute('r', '10');
                marker.setAttribute('fill', '#d1d5db');
                svg.appendChild(marker);
            }
        }
    });
    
    // Place notes on fretboard
    if (scale && scale.length > 0) {
        for (let string = 0; string < stringNotes.length; string++) {
            const openNote = stringNotes[string];
            
            for (let fret = 0; fret <= displayFrets; fret++) {
                const actualFret = fretboardState.startFret + fret;
                
                const chromaticIndex = (noteToIndex(openNote) + actualFret) % 12;
                const chromaticNoteName = MusicConstants.chromaticScale[chromaticIndex];
                
                let displayNote = null;
                
                // Check if this note is in the scale
                for (let i = 0; i < scale.length; i++) {
                    const scaleNote = scale[i];
                    
                    if (typeof MusicTheory !== 'undefined' && 
                        typeof MusicTheory.areEnharmonicEquivalents === 'function') {
                        if (MusicTheory.areEnharmonicEquivalents(chromaticNoteName, scaleNote)) {
                            displayNote = scaleNote;
                            break;
                        }
                    } else {
                        if (chromaticNoteName === scaleNote) {
                            displayNote = scaleNote;
                            break;
                        }
                    }
                }
                
                if (displayNote) {
                    // Position notes - optimized for better visibility
                    const x = fret === 0 ? leftMargin - 30 : leftMargin + ((fret - 0.5) * fretWidth);
                    const y = topMargin + (string * stringSpacing);
                    
                    // Get interval and color
                    const scaleIndex = scale.indexOf(displayNote);
                    const scaleRoot = scale[0];
                    
                    // Determine scale type for interval calculation
                    let scaleTypeForIntervals = window.currentScaleType || 'major';
                    let modeForIntervals = window.currentMode || null;
                    
                    // Special handling for chromatic scales
                    if (scale.length === 12) {
                        scaleTypeForIntervals = 'chromatic';
                        modeForIntervals = null;
                    }
                    
                    const intervals = MusicTheory.getIntervals(scale, scaleRoot, scaleTypeForIntervals, modeForIntervals);
                    const interval = intervals[scaleIndex] || '1';
                    const color = window.colorsVisible ? 
                        MusicTheory.getIntervalColor(interval) : '#d97706';
                    
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', x);
                    circle.setAttribute('cy', y);
                    circle.setAttribute('r', '18'); // Larger circles for better visibility
                    circle.setAttribute('fill', color);
                    
                    // Determine stroke color based on interval
                    let strokeColor = 'white'; // Default
                    if (fretboardState.showIntervals) {
                        let intervalText = '';
                        if (isInScale1 && scale1Index >= 0) {
                            const scale1Root = scale1[0];
                            const intervals1 = MusicTheory.getIntervals(scale1, scale1Root);
                            intervalText = intervals1[scale1Index] || '1';
                        } else if (isInScale2 && scale2Index >= 0) {
                            const scale2Root = scale2[0];
                            const intervals2 = MusicTheory.getIntervals(scale2, scale2Root);
                            intervalText = intervals2[scale2Index] || '1';
                        }
                        if (intervalText === '1') {
                            strokeColor = 'black';
                        }
                    }
                    
                    circle.setAttribute('stroke', strokeColor);
                    circle.setAttribute('stroke-width', '2');
                    svg.appendChild(circle);
                    
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    text.setAttribute('x', x);
                    text.setAttribute('y', y + 6);
                    text.setAttribute('text-anchor', 'middle');
                    // Use black text for root note (1), white for others
                    text.setAttribute('fill', interval === '1' ? 'black' : 'white');
                    text.setAttribute('font-size', '14'); // Larger font for better readability
                    text.setAttribute('font-weight', 'bold');
                    // Use the same display mode as the main fretboard
                    text.textContent = fretboardState.showIntervals ? interval : displayNote;
                    
                    // Add tooltip for enharmonic equivalents
                    const currentDisplay = fretboardState.showIntervals ? interval : displayNote;
                    const tooltipType = fretboardState.showIntervals ? 'interval' : 'note';
                    const tooltip = MusicTheory.getEnharmonicTooltip(currentDisplay, tooltipType);
                    if (tooltip) {
                        const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                        titleElement.textContent = tooltip;
                        
                        // Add title to both circle and text for better UX
                        const titleClone = titleElement.cloneNode(true);
                        circle.appendChild(titleElement);
                        text.appendChild(titleClone);
                    }
                    
                    svg.appendChild(text);
                }
            }
        }
    }
    
    container.appendChild(svg);
}

function closeFretboardModal() {
    const modal = document.getElementById('fretboard-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }
}

// Modal utility functions
function setOptimalModalSize() {
    const modal = document.getElementById('fretboard-modal');
    if (!modal) return;
    
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    // Set modal width but let height be determined by content
    const modalWidth = Math.min(viewport.width * 0.85, 1200);
    
    modal.style.width = modalWidth + 'px';
    // Remove fixed height - let content determine height
    modal.style.height = 'auto';
    
    // Center the modal horizontally, position vertically based on content
    modal.style.left = ((viewport.width - modalWidth) / 2) + 'px';
    modal.style.top = '10vh'; // Fixed top margin instead of centering
}

function handleMobileOrientation() {
    // Handle mobile orientation changes for modal
    if (window.innerWidth <= 768) {
        const modal = document.getElementById('fretboard-modal');
        if (!modal) return;
        
        const isLandscape = window.innerWidth > window.innerHeight;
        
        if (isLandscape) {
            // Landscape mode - maximize width
            modal.style.width = '98vw';
            modal.style.height = '95vh';
            modal.style.left = '1vw';
            modal.style.top = '2.5vh';
        } else {
            // Portrait mode - adjust for mobile
            modal.style.width = '95vw';
            modal.style.height = '90vh';
            modal.style.left = '2.5vw';
            modal.style.top = '5vh';
        }
    }
}

function makeDraggable(modal) {
    // Skip dragging on mobile devices
    if (window.innerWidth <= 768) return;
    
    const header = modal.querySelector('.modal-header');
    if (!header) return;
    
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;
    
    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        if (e.target.classList.contains('close-modal') || e.target.closest('button')) {
            return;
        }
        
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
        
        if (e.target === header || header.contains(e.target)) {
            isDragging = true;
            header.style.cursor = 'grabbing';
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            // Constrain to viewport
            const maxX = window.innerWidth - modal.offsetWidth;
            const maxY = window.innerHeight - modal.offsetHeight;
            
            currentX = Math.max(0, Math.min(currentX, maxX));
            currentY = Math.max(0, Math.min(currentY, maxY));
            
            modal.style.left = currentX + 'px';
            modal.style.top = currentY + 'px';
        }
    }
    
    function dragEnd() {
        if (isDragging) {
            isDragging = false;
            header.style.cursor = 'grab';
        }
    }
    
    header.style.cursor = 'grab';
}

function makeResizable(modal) {
    // Skip resizing on mobile devices
    if (window.innerWidth <= 768) return;
    
    // Remove any existing resize handles
    const existingHandles = modal.querySelectorAll('.resize-handle');
    existingHandles.forEach(handle => handle.remove());
    
    // Add only the southeast resize handle for simplicity
    const handle = document.createElement('div');
    handle.className = 'resize-handle resize-se';
    handle.style.cssText = `
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, transparent 0%, transparent 30%, #ff6b35 30%, #ff6b35 100%);
        cursor: se-resize;
        border-radius: 0 0 8px 0;
        opacity: 0.7;
        transition: opacity 0.2s ease;
        z-index: 10;
    `;
    
    handle.addEventListener('mouseenter', () => handle.style.opacity = '1');
    handle.addEventListener('mouseleave', () => handle.style.opacity = '0.7');
    
    modal.appendChild(handle);
    
    handle.addEventListener('mousedown', initResize);
    
    function initResize(e) {
        e.preventDefault();
        e.stopPropagation();
        
        let isResizing = true;
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = parseInt(window.getComputedStyle(modal).width, 10);
        const startHeight = parseInt(window.getComputedStyle(modal).height, 10);
        
        function doResize(e) {
            if (!isResizing) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newWidth = Math.max(400, Math.min(window.innerWidth - 50, startWidth + deltaX));
            const newHeight = Math.max(300, Math.min(window.innerHeight - 50, startHeight + deltaY));
            
            modal.style.width = newWidth + 'px';
            modal.style.height = newHeight + 'px';
        }
        
        function stopResize() {
            isResizing = false;
            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('mouseup', stopResize);
        }
        
        document.addEventListener('mousemove', doResize);
        document.addEventListener('mouseup', stopResize);
    }
}

// Scale display functions
function displayScale(scale, intervals, formula, scaleType, key, category) {
    displayNotes(scale);
    displayIntervals(intervals);
    
    // Display chords right after scale information
    displayChords(scale, scaleType, category);
    
    updateScaleColor(intervals);
    updateParentScale(scaleType, key, category);
    updateModeName();
    createFretboard(scale);
    
    // Get current state to create related modes (displayed last)
    const currentState = AppController.getCurrentState();
    createRelatedModes(currentState.mode, currentState.category, currentState.key);
}

function displayNotes(notes) {
    const notesContainer = document.querySelector('.notes');
    if (!notesContainer) return;
    
    notesContainer.innerHTML = '';
    
    // Create play controls container
    const playControlsContainer = document.createElement('div');
    playControlsContainer.className = 'play-controls';
    
    // Create play button (only ascending, no direction toggle)
    const playButton = document.createElement('button');
    playButton.className = 'play-btn';
    playButton.textContent = 'Play Scale';
    playButton.setAttribute('data-section', 'notes');
    
    playControlsContainer.appendChild(playButton);
    notesContainer.appendChild(playControlsContainer);
    
    // Create notes display container
    const notesDisplay = document.createElement('div');
    notesDisplay.className = 'notes-display';
    
    notes.forEach((note, index) => {
        const noteElement = document.createElement('span');
        noteElement.className = 'note';
        noteElement.textContent = note;
        noteElement.setAttribute('data-note', note);
        
        // Add enharmonic tooltip if available
        const tooltip = MusicTheory.getEnharmonicTooltip(note, 'note');
        if (tooltip) {
            noteElement.title = tooltip;
        }
        
        if (index === 0) {
            noteElement.classList.add('root-note');
        }
        
        notesDisplay.appendChild(noteElement);
    });
    
    notesContainer.appendChild(notesDisplay);
    
    // Add event listener - always ascending
    playButton.addEventListener('click', () => playScale(notes, 'notes'));
}

function displayIntervals(intervals) {
    const intervalsContainer = document.querySelector('.intervals');
    if (!intervalsContainer) return;

    intervalsContainer.innerHTML = '';

    // Create intervals display container (no play controls here)
    const intervalsDisplay = document.createElement('div');
    intervalsDisplay.className = 'intervals-display';

    intervals.forEach((interval, index) => {
        const intervalElement = document.createElement('span');
        intervalElement.className = 'interval';
        intervalElement.textContent = interval;
        intervalElement.setAttribute('data-interval', interval);
        intervalElement.setAttribute('data-index', index);

        // Add enharmonic tooltip if available
        const tooltip = MusicTheory.getEnharmonicTooltip(interval, 'interval');
        if (tooltip) {
            intervalElement.title = tooltip;
        }

        // Set background color based on interval using the consistent color scheme
        const color = window.colorsVisible ? 
            MusicTheory.getIntervalColor(interval) : '#d97706';
        if (color) {
            intervalElement.style.backgroundColor = color;
        }

        intervalsDisplay.appendChild(intervalElement);
    });

    intervalsContainer.appendChild(intervalsDisplay);
}

function displayFormula(formula) {
    const formulaElement = document.querySelector('.formula');
    if (!formulaElement) {
        console.warn('Formula element not found in DOM');
        return;
    }

    // Handle undefined or null formula
    if (formula === undefined || formula === null) {
        formulaElement.textContent = 'Formula: Not available';
        formulaElement.style.display = 'block';
        return;
    }

    // Handle non-array formula
    if (!Array.isArray(formula)) {
        formulaElement.textContent = `Formula: Invalid format (${typeof formula})`;
        formulaElement.style.display = 'block';
        return;
    }

    // Handle empty array
    if (formula.length === 0) {
        console.log('Formula is empty array');
        formulaElement.textContent = 'Formula: No data';
        formulaElement.style.display = 'block';
        return;
    }
    
    console.log('Processing formula array:', formula);
    
    // Convert intervals to W/H/WH notation
    const intervalNotation = formula.map((interval, index) => {
        if (typeof interval !== 'number') {
            return `${interval}?`;
        }
        
        switch (interval) {
            case 1: return 'H';
            case 2: return 'W';
            case 3: return 'WH';
            default: 
                return `${interval}?`;
        }
    });
    
    const formulaText = intervalNotation.join(' - ');
    console.log('Final formula text:', formulaText);
    
    formulaElement.textContent = formulaText;
    formulaElement.style.display = 'block';
    formulaElement.style.visibility = 'visible';
    
    console.log('Formula element updated');
}

function updateScaleColor(intervals) {
    const scaleCard = document.querySelector('.scale-card');
    if (!scaleCard) return;
    
    const baseColor = MusicTheory.calculateScaleColor(intervals);
    const enhancedColor = MusicTheory.enhanceScaleColor(baseColor, intervals);
    
    scaleCard.style.setProperty('--scale-color', enhancedColor);
}

function updateModeName() {
    const modeNameElement = document.querySelector('.mode-name');
    if (!modeNameElement) return;
    
    const { mode, key } = AppController.getCurrentState();
    
    // Get proper mode name from constants
    const modeData = MusicConstants.modeNumbers[mode];
    if (modeData) {
        modeNameElement.textContent = `${key} ${modeData.properName}`;
    } else {
        // Fallback to converted mode name
        const properModeName = mode.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        modeNameElement.textContent = `${key} ${properModeName}`;
    }
}

function updateParentScale(scaleType, key, category) {
    const parentScaleElement = document.querySelector('.parent-scale');
    if (!parentScaleElement) return;
    
    // Show the scale category name instead of redundant parent scale info
    const categoryData = MusicConstants.scaleCategories[category];
    if (categoryData) {
        parentScaleElement.textContent = categoryData.name;
    } else {
        parentScaleElement.textContent = 'Scale';
    }
}

function createRelatedModes(currentMode, category, currentKey) {
    console.log('=== createRelatedModes called ===');
    console.log('currentMode:', currentMode, 'category:', category, 'currentKey:', currentKey);
    
    const modeButtonsContainer = document.querySelector('.mode-buttons');
    const parentScaleInfo = document.querySelector('.parent-scale-info');
    
    if (!modeButtonsContainer || !parentScaleInfo) return;
    
    // Clear existing content
    modeButtonsContainer.innerHTML = '';
    parentScaleInfo.innerHTML = '';
    
    const categoryData = MusicConstants.scaleCategories[category];
    if (!categoryData || !categoryData.modes) return;
    
    // Define non-modal scales (scales that don't have modes and should be treated as single entities)
    const nonModalScales = [
        'major-6th-diminished', 
        'minor-6th-diminished',
        'chromatic-scale'
    ];
    
    // Check if this is a non-modal scale
    if (nonModalScales.includes(category)) {
        // For non-modal scales, hide the entire related modes section
        const relatedModesSection = document.querySelector('.related-modes');
        if (relatedModesSection) {
            relatedModesSection.style.display = 'none';
        }
        return;
    }
    
    // Show the related modes section for modal scales
    const relatedModesSection = document.querySelector('.related-modes');
    if (relatedModesSection) {
        relatedModesSection.style.display = 'block';
        
        // Reset the section title to default for modal scales
        const sectionTitle = relatedModesSection.querySelector('h4');
        if (sectionTitle) {
            sectionTitle.textContent = 'Related Modes';
        }
    }
    
    // Calculate the root key of the parent scale based on current mode
    const currentModeData = MusicConstants.modeNumbers[currentMode];
    if (!currentModeData) return;
    
    // Mode offset lookup table - semitones from parent scale root to mode root
    const modeOffsets = {
        // Major modes
        'major': 0, 'dorian': 2, 'phrygian': 4, 'lydian': 5, 'mixolydian': 7, 'aeolian': 9, 'locrian': 11,
        // Harmonic minor modes  
        'harmonic-minor': 0, 'locrian-natural-6': 2, 'ionian-sharp-5': 3, 'dorian-sharp-4': 5, 
        'phrygian-dominant': 7, 'lydian-sharp-2': 8, 'altered-dominant': 11,
        // Harmonic major modes
        'harmonic-major': 0, 'dorian-b5': 2, 'phrygian-b4': 3, 'lydian-b3': 5, 'mixolydian-b2': 7, 
        'lydian-augmented-sharp-2': 8, 'locrian-double-flat-7': 11,
        // Melodic minor modes
        'melodic-minor': 0, 'dorian-b2': 2, 'lydian-augmented': 3, 'lydian-dominant': 5,
        'mixolydian-b6': 7, 'locrian-natural-2': 9, 'super-locrian': 11,
        // Diminished modes
        'wh-diminished': 0, 'hw-diminished': 1,
        // Major Pentatonic modes (correct offsets to their major scale degrees)
        'major-pentatonic': 0, 'suspended-pentatonic': 2, 'man-gong': 4, 'ritusen': 7, 'minor-pentatonic': 9,
        // Blues scales
        'blues-major': 0, 'blues-minor': 9,
        // Barry Harris scales
        'major-6th-diminished': 0, 'minor-6th-diminished': 0,
        // Other scales
        'whole-tone': 0, 
        'whole-tone-1': 0, 'whole-tone-2': 2, 'whole-tone-3': 4, 'whole-tone-4': 6, 'whole-tone-5': 8, 'whole-tone-6': 10,
        'chromatic': 0
    };
    
    const currentModeOffset = modeOffsets[currentMode] || 0;
    const parentRootIndex = (noteToIndex(currentKey) - currentModeOffset + 12) % 12;
    
    console.log('currentModeOffset:', currentModeOffset);
    console.log('parentRootIndex:', parentRootIndex);
    
    // Determine spelling convention based on the parent scale root, not the current key
    const parentRoot = getConsistentNoteSpelling(parentRootIndex, 'sharp'); // Get sharp version first
    const parentRootFlat = getConsistentNoteSpelling(parentRootIndex, 'flat'); // Get flat version
    
    // Determine which spelling convention to use based on standard key signatures AND scale type
    let spellingConvention;
    
    // Special override for pentatonic scales to prevent B# issues
    if (category === 'pentatonic') {
        // For pentatonic scales, avoid B# by using flat spelling when parent root is B#
        if (parentRoot === 'B#') {
            spellingConvention = 'flat';
        } else {
            // Use standard logic for other pentatonic roots
            const flatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
            const sharpKeys = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
            
            if (flatKeys.includes(parentRootFlat)) {
                spellingConvention = 'flat';
            } else if (sharpKeys.includes(parentRoot)) {
                spellingConvention = 'sharp';
            } else {
                spellingConvention = 'sharp'; // Default for C
            }
        }
    } else {
        // Keys that use flats in their key signatures
        const flatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
        // Keys that use sharps in their key signatures  
        const sharpKeys = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
        
        // Minor scales (harmonic minor, melodic minor) need smart spelling to avoid double flats
        const parentScaleType = getScaleTypeFromCategory(category);
        if (parentScaleType === 'harmonic-minor' || parentScaleType === 'melodic-minor') {
            // For minor scales, use the same logic as major scales based on key signatures
            // This prevents problematic double flats in scales like A melodic minor
            if (flatKeys.includes(parentRootFlat)) {
                spellingConvention = 'flat';
            } else if (sharpKeys.includes(parentRoot)) {
                spellingConvention = 'sharp';
            } else {
                // For C minor scales, default to flat (natural minor key signature)
                spellingConvention = 'flat';
            }
        } else if (flatKeys.includes(parentRootFlat)) {
            spellingConvention = 'flat';
        } else if (sharpKeys.includes(parentRoot)) {
            spellingConvention = 'sharp';
        } else {
            // For C major (no sharps or flats), default to sharp
            spellingConvention = 'sharp';
        }
    }
    
    // Get the final parent root with the determined spelling convention
    const finalParentRoot = getConsistentNoteSpelling(parentRootIndex, spellingConvention);
    
    console.log('parentRoot (sharp):', parentRoot);
    console.log('parentRoot (flat):', parentRootFlat);
    console.log('determined spellingConvention:', spellingConvention);
    console.log('finalParentRoot:', finalParentRoot);
    
    // Store the spelling convention
    window.modalSystemSpelling = spellingConvention;
    
    // Special handling for blues scales - they have different formulas but share the same notes
    if (category === 'blues-scales' || category === 'blues-modes') {
        // For blues scales, calculate each scale independently using its own formula
        // but ensure they use the same parent root
        
        // Create mode buttons for each blues scale
        categoryData.modes.forEach((mode, index) => {
            const modeData = MusicConstants.modeNumbers[mode];
            if (!modeData) return;
            
            // Calculate the root for this mode based on the offset
            const modeOffset = modeOffsets[mode] || 0;
            const modeRootIndex = (parentRootIndex + modeOffset) % 12;
            const modeKey = getConsistentNoteSpelling(modeRootIndex, spellingConvention);
            
            const button = document.createElement('button');
            button.className = `mode-button ${mode === currentMode ? 'active' : ''}`;
            button.innerHTML = `
                <span class="mode-number">${modeData.number}</span>
                <span class="mode-name">${modeKey} ${modeData.properName}</span>
            `;
            
            // Add click handler to change to this mode
            button.addEventListener('click', () => {
                // Update the app state to use this mode and key directly
                // No need to convert spelling - modeKey already has correct enharmonic spelling
                AppController.setState({
                    key: modeKey,
                    category: category,
                    mode: mode
                });
            });
            
            modeButtonsContainer.appendChild(button);
        });
        
        // Display parent scale information
        const parentScaleName = getParentScaleName(category, finalParentRoot);
        const parentInfo = `
            <div class="parent-scale-info">
                <strong>These blues scales share the same notes:</strong> ${parentScaleName}
                <br><small>Blues Major and Blues Minor contain the same notes, starting from different degrees</small>
            </div>
        `;
        parentScaleInfo.innerHTML = parentInfo;
        return; // Exit early for blues scales
    }
    
    // Special handling for pentatonic modes
    if (category === 'pentatonic') {
        console.log('=== PENTATONIC MODE GENERATION ===');
        console.log('Current pentatonic mode:', currentMode);
        console.log('Current key:', currentKey);
        console.log('Final parent root:', finalParentRoot);
        
        // Pentatonic modes map to specific degrees of the major scale
        // These are the correct major scale degrees for each pentatonic mode
        const pentatonicModeToMajorDegree = {
            'major-pentatonic': 0,      // 1st degree of major scale (C in C major)
            'suspended-pentatonic': 1,  // 2nd degree of major scale (D in C major) 
            'man-gong': 2,              // 3rd degree of major scale (E in C major)
            'ritusen': 4,               // 5th degree of major scale (G in C major)
            'minor-pentatonic': 5       // 6th degree of major scale (A in C major)
        };
        
        // Calculate the parent major scale using the final parent root
        const majorFormula = [2, 2, 1, 2, 2, 2, 1]; // Major scale formula
        const parentMajorScale = MusicTheory.calculateScale(finalParentRoot, majorFormula, 'major');
        
        console.log('Parent major scale:', parentMajorScale);
        
        // Create mode buttons for each pentatonic mode
        categoryData.modes.forEach((mode, index) => {
            const modeData = MusicConstants.modeNumbers[mode];
            if (!modeData) return;
            
            // Get the correct major scale degree for this pentatonic mode
            const majorDegree = pentatonicModeToMajorDegree[mode];
            if (majorDegree === undefined) {
                console.warn(`No major degree mapping for pentatonic mode: ${mode}`);
                return;
            }
            
            // Get the mode key from the parent major scale
            const modeKey = parentMajorScale[majorDegree];
            
            console.log(`Pentatonic mode ${mode}: major degree ${majorDegree} = ${modeKey}`);
            
            // Define pentatonic shape mapping
            const pentatonicShapes = {
                'major-pentatonic': 'Shape 2',
                'suspended-pentatonic': 'Shape 3', 
                'man-gong': 'Shape 4',
                'ritusen': 'Shape 5',
                'minor-pentatonic': 'Shape 1'
            };
            
            const button = document.createElement('button');
            button.className = `mode-button ${mode === currentMode && modeKey === currentKey ? 'active' : ''}`;
            
            // Add shape information for pentatonic modes
            if (pentatonicShapes[mode]) {
                button.innerHTML = `
                    <span class="mode-number">${modeData.number}</span>
                    <span class="mode-name">${modeKey} ${modeData.properName}</span>
                    <span class="mode-shape">(${pentatonicShapes[mode]})</span>
                `;
            } else {
                button.innerHTML = `
                    <span class="mode-number">${modeData.number}</span>
                    <span class="mode-name">${modeKey} ${modeData.properName}</span>
                `;
            }
            
            // Add click handler to change to this mode
            button.addEventListener('click', () => {
                console.log(`Clicking pentatonic mode: ${mode} in key ${modeKey}`);
                AppController.setState({
                    key: modeKey,
                    category: category,
                    mode: mode
                });
            });
            
            modeButtonsContainer.appendChild(button);
        });
        
        // Display parent scale information for pentatonic modes
        const parentScaleName = getParentScaleName(category, finalParentRoot);
        const parentInfo = `
            <div class="parent-scale-info">
                <strong>These modes are derived from:</strong> ${parentScaleName}
                <br><small>Pentatonic modes use specific degrees of the major scale as starting points</small>
            </div>
        `;
        parentScaleInfo.innerHTML = parentInfo;
        
        console.log('=== END PENTATONIC MODE GENERATION ===');
        return; // Exit early for pentatonic scales
    }
    
    // Special handling for whole tone scales
    if (category === 'whole-tone') {
        // Show the related modes section for whole tone scales
        const relatedModesSection = document.querySelector('.related-modes');
        if (relatedModesSection) {
            relatedModesSection.style.display = 'block';
        }
        
        // Update the section title to reflect rotations instead of modes
        const sectionTitle = relatedModesSection.querySelector('h4');
        if (sectionTitle) {
            sectionTitle.textContent = 'Related Rotations';
        }
        
        // Calculate the whole tone scale from the current key
        const wholeToneFormula = categoryData.formulas['whole-tone-1']; // All have same formula [2,2,2,2,2,2]
        const wholeToneScale = MusicTheory.calculateScale(currentKey, wholeToneFormula, 'whole-tone');
        
        // Create 6 buttons - one for each rotation of the whole tone scale
        wholeToneScale.forEach((startingNote, index) => {
            const rotationName = `whole-tone-${index + 1}`;
            const modeData = MusicConstants.modeNumbers[rotationName];
            
            if (!modeData) return;
            
            const button = document.createElement('button');
            button.className = `mode-button ${rotationName === currentMode && startingNote === currentKey ? 'active' : ''}`;
            button.innerHTML = `
                <span class="mode-number">${index + 1}</span>
                <span class="mode-name">${startingNote} Whole Tone</span>
            `;
            
            // Add click handler to change to this rotation using the specific starting note
            button.addEventListener('click', () => {
                AppController.setState({
                    key: startingNote,
                    category: category,
                    mode: rotationName
                });
            });
            
            modeButtonsContainer.appendChild(button);
        });
        
        // Determine which whole tone scale the current key belongs to (for complementary info)
        const currentKeyIndex = noteToIndex(currentKey);
        const wholeToneIndices = wholeToneScale.map(note => noteToIndex(note));
        const otherWholeToneNotes = [];
        
        // Calculate the complementary whole tone scale
        for (let i = 0; i < 12; i++) {
            if (!wholeToneIndices.includes(i)) {
                otherWholeToneNotes.push(getConsistentNoteSpelling(i, spellingConvention));
            }
        }
        
        // Display special information for whole tone scales explaining rotations vs modes
        const parentInfo = `
            <div class="parent-scale-info">
                <strong>Current Whole Tone Scale:</strong> ${wholeToneScale.join(', ')}
                <br><strong>Complementary Scale:</strong> ${otherWholeToneNotes.join(', ')}
                <br><small><strong>Note:</strong> The whole tone scale has rotations, not modes. Each rotation starts on a different note but maintains the same interval pattern (all whole steps). These rotations change the root note and harmonic focus but don't create new harmonic colors like traditional modes do.</small>
                <br><small>Together, these two whole tone scales contain all 12 chromatic notes.</small>
                <br><br><strong>Chords in Whole Tone Scale:</strong>
                <br><small>• <strong>Augmented Triads:</strong> All triads are augmented - each scale note can be the root (C+, D+, E+, F#+, G#+, A#+)</small>
                <br><small>• <strong>Dominant 7th Chords:</strong> Each scale note supports 7#5 and 7b5 chords (e.g., C7#5, C7b5, D7#5, D7b5, etc.)</small>
                <br><small>• <strong>Extended Dominants:</strong> Each scale note supports highly altered dominants (e.g., C13#11#5, D13#11b5, etc.)</small>
                <br><small>• <strong>French Augmented 6th:</strong> Contains 1, 2, #4, #6 intervals naturally from any root</small>
                <br><small>• <strong>Quartal Harmony:</strong> Stacked augmented 4ths create unique sonorities</small>
                <br><small><strong>Harmonic Character:</strong> The whole tone scale creates a dreamy, floating quality due to the lack of perfect 4ths and 5ths. It's commonly used in impressionist music and jazz for its ethereal, unresolved sound.</small>
            </div>
        `;
        parentScaleInfo.innerHTML = parentInfo;
        return; // Exit early for whole tone scales
    }
    
    // Special handling for diminished modes
    if (category === 'diminished-modes') {
        // Show the related modes section for diminished scales
        const relatedModesSection = document.querySelector('.related-modes');
        if (relatedModesSection) {
            relatedModesSection.style.display = 'block';
        }
        
        // Calculate the diminished scale from the current key to get all 8 notes using the proper formula
        const diminishedFormula = categoryData.formulas[currentMode]; // Use the actual current mode formula
        const diminishedScale = MusicTheory.calculateScale(currentKey, diminishedFormula, currentMode);
        
        // Create 8 buttons - one for each note in the diminished scale
        // Determine WH vs HW based on position in the scale array
        
        // Determine what pattern the root is using (WH or HW)
        const rootIsWH = currentMode === 'wh-diminished';
        
        diminishedScale.forEach((startingNote, index) => {
            // Position in scale determines pattern:
            // - Odd positions (1,3,5,7) have same pattern as root 
            // - Even positions (2,4,6,8) have opposite pattern from root
            const positionInScale = index + 1; // Convert 0-based to 1-based
            const hasSamePatternAsRoot = positionInScale % 2 === 1; // Odd positions
            
            const isWHPattern = rootIsWH ? hasSamePatternAsRoot : !hasSamePatternAsRoot;
            const mode = isWHPattern ? 'wh-diminished' : 'hw-diminished';
            const modeData = MusicConstants.modeNumbers[mode];
            
            if (!modeData) return;
            
            // Use the actual calculated note - no conversion needed
            const consistentStartingNote = startingNote;
            
            const button = document.createElement('button');
            button.className = `mode-button ${mode === currentMode && consistentStartingNote === currentKey ? 'active' : ''}`;
            button.innerHTML = `
                <span class="mode-number">${modeData.number}</span>
                <span class="mode-name">${consistentStartingNote} ${modeData.properName}</span>
            `;
            
            // Add click handler to change to this mode using the specific starting note
            button.addEventListener('click', () => {
                AppController.setState({
                    key: consistentStartingNote,
                    category: category,
                    mode: mode
                });
            });
            
            modeButtonsContainer.appendChild(button);
        });
        
        // Display special information for diminished scales
        const parentInfo = `
            <div class="parent-scale-info">
                <strong>These rotations are derived from:</strong> ${currentKey} Diminished Scale
                <br><small><strong>Note:</strong> Diminished scale rotations start on different notes within the 8-note diminished collection. Each rotation emphasizes different harmonic and melodic relationships while using the same collection of notes.</small>
            </div>
        `;
        parentScaleInfo.innerHTML = parentInfo;
        return; // Exit early for diminished scales
    }
    
    // Calculate the parent scale with consistent spelling
    const scaleType = getScaleTypeFromCategory(category);
    const parentFormula = categoryData.formulas[categoryData.modes[0]]; // Get the first mode's formula (the parent scale)
    const parentScaleNotes = MusicTheory.calculateScale(finalParentRoot, parentFormula, scaleType);
    
    // Clean up problematic enharmonic equivalents in parent scale for pentatonic modes
    if (category === 'pentatonic') {
        for (let i = 0; i < parentScaleNotes.length; i++) {
            parentScaleNotes[i] = getProperEnharmonicSpelling(parentScaleNotes[i]);
        }
    }
    
    console.log('=== DEBUG MODE GENERATION ===');
    console.log('finalParentRoot:', finalParentRoot);
    console.log('spellingConvention:', spellingConvention);
    console.log('parentFormula:', parentFormula);
    console.log('parentScaleNotes:', parentScaleNotes);
    console.log('parentScaleNotes contents:', parentScaleNotes.join(', '));
    console.log('category:', category);
    
    // Create mode buttons for each mode in the category
    categoryData.modes.forEach((mode, index) => {
        const modeData = MusicConstants.modeNumbers[mode];
        if (!modeData) return;
        
        // Instead of using modeOffset and converting to generic spelling,
        // use the actual note from the parent scale for exact enharmonic matching
        let modeKey;
        
        // For traditional modal systems (7-note scales), use the scale degree
        if (parentScaleNotes.length === 7) {
            // Map mode to its scale degree in the parent scale
            const modeScaleDegrees = {
                // Major modes - use index directly
                'major': 0, 'dorian': 1, 'phrygian': 2, 'lydian': 3, 'mixolydian': 4, 'aeolian': 5, 'locrian': 6,
                
                // Harmonic minor modes - use index directly  
                'harmonic-minor': 0, 'locrian-natural-6': 1, 'ionian-sharp-5': 2, 'dorian-sharp-4': 3, 
                'phrygian-dominant': 4, 'lydian-sharp-2': 5, 'altered-dominant': 6,
                
                // Melodic minor modes - use index directly
                'melodic-minor': 0, 'dorian-b2': 1, 'lydian-augmented': 2, 'lydian-dominant': 3,
                'mixolydian-b6': 4, 'locrian-natural-2': 5, 'super-locrian': 6
            };
            
            const scaleDegree = modeScaleDegrees[mode];
            if (scaleDegree !== undefined && parentScaleNotes[scaleDegree]) {
                modeKey = parentScaleNotes[scaleDegree];
                console.log(`Mode ${mode}: using scale degree ${scaleDegree} = ${modeKey}`);
            } else {
                // Fallback to offset calculation for modes not in the lookup
                const modeOffset = modeOffsets[mode] || 0;
                const modeRootIndex = (parentRootIndex + modeOffset) % 12;
                modeKey = getConsistentNoteSpelling(modeRootIndex, spellingConvention);
                console.log(`Mode ${mode}: using fallback offset ${modeOffset} = ${modeKey}`);
            }
        } else {
            // For non-traditional scales (pentatonic, blues, etc.), use offset calculation
            if (category === 'pentatonic') {
                // For pentatonic modes, use the parent scale notes directly based on mode index
                const pentatonicModeIndices = {
                    'major-pentatonic': 0,     // 1st degree of major scale
                    'suspended-pentatonic': 1, // 2nd degree of major scale
                    'man-gong': 2,             // 3rd degree of major scale
                    'ritusen': 4,              // 5th degree of major scale
                    'minor-pentatonic': 5      // 6th degree of major scale
                };
                
                const modeIndex = pentatonicModeIndices[mode];
                if (modeIndex !== undefined && parentScaleNotes[modeIndex]) {
                    modeKey = parentScaleNotes[modeIndex];
                    console.log(`Mode ${mode}: using pentatonic scale degree ${modeIndex} = ${modeKey}`);
                } else {
                    // Fallback to offset calculation
                    const modeOffset = modeOffsets[mode] || 0;
                    const modeRootIndex = (parentRootIndex + modeOffset) % 12;
                    modeKey = getConsistentNoteSpelling(modeRootIndex, spellingConvention);
                    modeKey = getProperEnharmonicSpelling(modeKey);
                    console.log(`Mode ${mode}: using fallback offset ${modeOffset} = ${modeKey}`);
                }
            } else {
                // For other non-traditional scales, use offset calculation
                const modeOffset = modeOffsets[mode] || 0;
                const modeRootIndex = (parentRootIndex + modeOffset) % 12;
                modeKey = getConsistentNoteSpelling(modeRootIndex, spellingConvention);
                
                // Clean up problematic enharmonic equivalents for pentatonic modes
                if (category === 'pentatonic') {
                    modeKey = getProperEnharmonicSpelling(modeKey);
                }
                
                console.log(`Mode ${mode}: using non-traditional offset ${modeOffset} = ${modeKey}`);
            }
        }
        
        // Define pentatonic shape mapping
        const pentatonicShapes = {
            'major-pentatonic': 'Shape 2',
            'suspended-pentatonic': 'Shape 3', 
            'man-gong': 'Shape 4',
            'ritusen': 'Shape 5',
            'minor-pentatonic': 'Shape 1'
        };
        
        const button = document.createElement('button');
        button.className = `mode-button ${mode === currentMode ? 'active' : ''}`;
        
        // Check if this is a pentatonic mode and add shape information
        if (category === 'pentatonic' && pentatonicShapes[mode]) {
            button.innerHTML = `
                <span class="mode-number">${modeData.number}</span>
                <span class="mode-name">${modeKey} ${modeData.properName}</span>
                <span class="mode-shape">(${pentatonicShapes[mode]})</span>
            `;
        } else {
            button.innerHTML = `
                <span class="mode-number">${modeData.number}</span>
                <span class="mode-name">${modeKey} ${modeData.properName}</span>
            `;
        }
        
        // Add click handler to change to this mode
        button.addEventListener('click', () => {
            // Update the app state to use this mode and key directly
            // No need to convert spelling - modeKey already has correct enharmonic spelling
            AppController.setState({
                key: modeKey,
                category: category,
                mode: mode
            });
        });
        
        modeButtonsContainer.appendChild(button);
    });
    
    // Display parent scale information
    const parentScaleName = getParentScaleName(category, finalParentRoot);
    const parentInfo = `
        <div class="parent-scale-info">
            <strong>These modes are derived from:</strong> ${parentScaleName}
            <br><small>All modes derive from the same scale, starting on different degrees</small>
        </div>
    `;
    parentScaleInfo.innerHTML = parentInfo;
}

// Helper function to determine spelling convention from a key
function determineSpellingConvention(key) {
    // Determine if the key uses sharps, flats, or naturals
    if (key.includes('#')) {
        return 'sharp';
    }
    if (key.includes('b')) {
        return 'flat';
    }
    
    // For natural keys, determine based on key signature conventions
    // Keys that typically use sharps in their key signatures
    const sharpKeys = ['C', 'G', 'D', 'A', 'E', 'B'];
    // Keys that typically use flats in their key signatures  
    const flatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
    
    if (sharpKeys.includes(key)) {
        return 'sharp';
    }
    if (flatKeys.includes(key)) {
        return 'flat';
    }
    
    return 'sharp'; // Default to sharp for ambiguous cases
}

// Helper function to get consistent note spelling based on convention
function getConsistentNoteSpelling(noteIndex, spellingConvention) {
    const normalizedIndex = ((noteIndex % 12) + 12) % 12;
    
    // Chromatic scales with consistent spelling
    const sharpChromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const flatChromatic = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    // Double accidental alternatives (for special cases)
    const doubleSharpChromatic = ['B#', 'C##', 'D', 'D##', 'E#', 'F', 'F##', 'G', 'G##', 'A', 'A##', 'B'];
    const doubleFlatChromatic = ['C', 'Dbb', 'D', 'Ebb', 'E', 'Fb', 'Gbb', 'G', 'Abb', 'A', 'Bbb', 'Cb'];
    
    if (spellingConvention === 'mixed-minor') {
        // For mixed-minor, avoid double flats by using smart enharmonic choices
        // Use flats for most notes but sharps when it avoids double flats
        const flatVersion = flatChromatic[normalizedIndex];
        const sharpVersion = sharpChromatic[normalizedIndex];
        
        // Avoid double flats - these are problematic for readability
        if (flatVersion.includes('bb')) {
            return sharpVersion;
        } else {
            return flatVersion;
        }
    } else if (spellingConvention === 'flat') {
        return flatChromatic[normalizedIndex];
    } else if (spellingConvention === 'double-sharp') {
        return doubleSharpChromatic[normalizedIndex];
    } else if (spellingConvention === 'double-flat') {
        return doubleFlatChromatic[normalizedIndex];
    } else {
        return sharpChromatic[normalizedIndex];
    }
}

// Helper function to convert enharmonic equivalents to proper spelling
function getProperEnharmonicSpelling(note) {
    // Get the current spelling convention from the modal system
    const spellingConvention = window.modalSystemSpelling || 'sharp';
    
    // Extended enharmonic map including double accidentals
    const enharmonicMap = {
        'B#': 'C',
        'E#': 'F',
        'Fb': 'E',
        'Cb': 'B',
        'C##': 'D',
        'D##': 'E',
        'F##': 'G',
        'G##': 'A',
        'A##': 'B',
        'Dbb': 'C',
        'Ebb': 'D',
        'Gbb': 'F',
        'Abb': 'G',
        'Bbb': 'A'
    };
    
    // Check if it's a problematic enharmonic that should be converted for system compatibility
    if (enharmonicMap[note]) {
        return enharmonicMap[note];
    }
    
    // For standard sharp/flat pairs, respect the spelling convention
    if (spellingConvention === 'flat') {
        const sharpToFlat = {
            'C#': 'Db',
            'D#': 'Eb',
            'F#': 'Gb',
            'G#': 'Ab',
            'A#': 'Bb'
        };
        return sharpToFlat[note] || note;
    } else {
        const flatToSharp = {
            'Db': 'C#',
            'Eb': 'D#',
            'Gb': 'F#',
            'Ab': 'G#',
            'Bb': 'A#'
        };
        return flatToSharp[note] || note;
    }
}

// Helper function to calculate scale with consistent enharmonic spelling
function calculateScaleWithConsistentSpelling(root, formula, scaleType, spellingConvention, category = null) {
    if (!formula || !Array.isArray(formula)) {
        console.warn('Invalid formula provided to calculateScaleWithConsistentSpelling:', formula);
        return [];
    }
    
    // Special handling for augmented scale - use chromatic spelling
    if (scaleType === 'augmented' || (Array.isArray(formula) && 
        (JSON.stringify(formula) === JSON.stringify([1, 3, 1, 3, 1, 3]) || 
         JSON.stringify(formula) === JSON.stringify([3, 1, 3, 1, 3, 1])))) {
        return calculateAugmentedScaleSpelling(root, formula, spellingConvention);
    }
    
    // Special handling for diminished scales
    if (scaleType === 'diminished' || scaleType === 'wh-diminished' || scaleType === 'hw-diminished' || formula.length === 8) {
        return calculateDiminishedScaleSpelling(root, formula, spellingConvention);
    }
    
    // Special handling for altered scale - use chromatic spelling for practical enharmonics
    if (scaleType === 'super-locrian') {
        return calculateAlteredScaleSpelling(root, formula, spellingConvention);
    }
    
    // Special handling for melodic minor scales - use flat-preferred spelling
    if (scaleType === 'melodic-minor' || category === 'melodic-minor-modes') {
        return calculateMelodicMinorScaleSpelling(root, formula, spellingConvention);
    }
    
    // Define the note names in order for proper scale degree calculation
    const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const noteToIndex = {
        'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
        'C#': 1, 'Db': 1, 'D#': 3, 'Eb': 3, 'F#': 6, 'Gb': 6,
        'G#': 8, 'Ab': 8, 'A#': 10, 'Bb': 10,
        // Add enharmonic equivalents and double accidentals
        'B#': 0, 'Cb': 11, 'E#': 5, 'Fb': 4,
        'C##': 2, 'D##': 4, 'F##': 7, 'G##': 9, 'A##': 11,
        'Dbb': 0, 'Ebb': 2, 'Gbb': 5, 'Abb': 7, 'Bbb': 9
    };
    
    // Find the root note's position in the note names array
    const rootNoteName = root.charAt(0);
    const rootNoteIndex = noteNames.indexOf(rootNoteName);
    if (rootNoteIndex === -1) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    // Get the chromatic index of the root
    const rootChromaticIndex = noteToIndex[root];
    if (rootChromaticIndex === undefined) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    // Calculate scale notes based on scale degrees
    const scale = [root]; // Start with the root
    let currentChromaticIndex = rootChromaticIndex;
    
    for (let i = 0; i < formula.length - 1; i++) {
        // Move to the next chromatic position
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        
        // Calculate which scale degree this should be (2nd, 3rd, 4th, etc.)
        const scaleDegreeIndex = (rootNoteIndex + i + 1) % 7;
        const baseNoteName = noteNames[scaleDegreeIndex];
        const baseNoteChromatic = noteToIndex[baseNoteName];
        
        // Calculate the difference between where we are and where the base note is
        const chromaticDifference = (currentChromaticIndex - baseNoteChromatic + 12) % 12;
        
        let noteName;
        if (chromaticDifference === 0) {
            // Perfect match - use the natural note
            noteName = baseNoteName;
        } else if (chromaticDifference === 1) {
            // One semitone up - use sharp or flat based on convention
            if (spellingConvention === 'flat') {
                // Use the next note with flat
                const nextDegreeIndex = (scaleDegreeIndex + 1) % 7;
                noteName = noteNames[nextDegreeIndex] + 'b';
            } else {
                // Use sharp
                noteName = baseNoteName + '#';
            }
        } else if (chromaticDifference === 11) {
            // One semitone down - use flat or sharp based on convention
            if (spellingConvention === 'sharp') {
                // Use the previous note with sharp
                const prevDegreeIndex = (scaleDegreeIndex - 1 + 7) % 7;
                noteName = noteNames[prevDegreeIndex] + '#';
            } else {
                // Use flat
                noteName = baseNoteName + 'b';
            }
        } else if (chromaticDifference === 2) {
            // Avoid double sharp - use enharmonic equivalent instead
            noteName = getConsistentNoteSpelling(currentChromaticIndex, spellingConvention);
        } else if (chromaticDifference === 10) {
            // Avoid double flat - use enharmonic equivalent instead
            noteName = getConsistentNoteSpelling(currentChromaticIndex, spellingConvention);
        } else {
            // For other intervals, use consistent chromatic spelling
            noteName = getConsistentNoteSpelling(currentChromaticIndex, spellingConvention);
        }
        
        scale.push(noteName);
    }
    
    return scale;
}

// Special function for diminished scale spelling
function calculateDiminishedScaleSpelling(root, formula, spellingConvention) {
    // Determine if this is W-H or H-W diminished based on the formula
    const isWHDiminished = formula[0] === 2; // Starts with whole step
    const isHWDiminished = formula[0] === 1; // Starts with half step
    
    if (!isWHDiminished && !isHWDiminished) {
        console.warn('Unknown diminished scale formula:', formula);
        return [];
    }
    
    // Redirect F# to Gb for diminished scales (all diminished spellings use flats)
    let adjustedRoot = root;
    if (root === 'F#') {
        adjustedRoot = 'Gb';
    }
    
    // Three standardized diminished scale spellings (all using flats)
    const diminishedScaleSpellings = {
        // Scale 1: C - D♭ - E♭ - F♭ - G♭ - G - A - B♭
        'C': ['C', 'Db', 'Eb', 'Fb', 'Gb', 'G', 'A', 'Bb'],
        'Db': ['Db', 'D', 'E', 'F', 'G', 'Ab', 'Bb', 'B'],
        'D': ['D', 'Eb', 'F', 'Gb', 'Ab', 'A', 'B', 'C'],
        
        // Scale 2: D♭ - D - E - F - G - A♭ - B♭ - B  
        'Eb': ['Eb', 'E', 'Gb', 'G', 'A', 'Bb', 'C', 'Db'],
        'E': ['E', 'F', 'G', 'Ab', 'Bb', 'B', 'Db', 'D'],
        'F': ['F', 'Gb', 'Ab', 'A', 'B', 'C', 'D', 'Eb'],
        
        // Scale 3: D - E♭ - F - G♭ - A♭ - A - B - C
        'Gb': ['Gb', 'G', 'A', 'Bb', 'C', 'Db', 'Eb', 'E'],
        'G': ['G', 'Ab', 'Bb', 'B', 'Db', 'D', 'E', 'F'],
        'Ab': ['Ab', 'A', 'B', 'C', 'D', 'Eb', 'F', 'Gb'],
        'A': ['A', 'Bb', 'C', 'Db', 'Eb', 'E', 'Gb', 'G'],
        'Bb': ['Bb', 'B', 'Db', 'D', 'E', 'F', 'G', 'Ab'],
        'B': ['B', 'C', 'D', 'Eb', 'F', 'Gb', 'Ab', 'A']
    };
    
    // Get the standardized spelling for this root
    const standardSpelling = diminishedScaleSpellings[adjustedRoot];
    
    if (!standardSpelling) {
        console.warn('No standardized spelling found for diminished root:', adjustedRoot);
        // Fallback to original logic
        return calculateOriginalDiminishedSpelling(adjustedRoot, formula, 'flat');
    }
    
    // For WH diminished, use the spelling as-is
    // For HW diminished, rotate the spelling by 1 position
    if (isWHDiminished) {
        return [...standardSpelling];
    } else {
        // HW pattern starts one semitone higher, so rotate the array
        return [...standardSpelling.slice(1), standardSpelling[0]];
    }
}

// Fallback function using original logic
function calculateOriginalDiminishedSpelling(root, formula, spellingConvention) {
    const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const noteToIndex = {
        'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
        'C#': 1, 'Db': 1, 'D#': 3, 'Eb': 3, 'F#': 6, 'Gb': 6,
        'G#': 8, 'Ab': 8, 'A#': 10, 'Bb': 10
    };
    
    // Get root note information
    const rootNoteName = root.charAt(0);
    const rootNoteIndex = noteNames.indexOf(rootNoteName);
    const rootChromaticIndex = noteToIndex[root];
    
    if (rootNoteIndex === -1 || rootChromaticIndex === undefined) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    // Define scale degree patterns (chromatic intervals from root)
    const whPattern = [0, 2, 3, 5, 6, 8, 9, 11]; // W-H intervals
    const hwPattern = [0, 1, 3, 4, 6, 7, 9, 10]; // H-W intervals
    
    // Define which letter names to use for each scale degree
    const whLetterDegrees = [0, 1, 2, 3, 4, 5, 5, 6]; // Root=0, 2nd=1, b3=2, 4th=3, b5=4, b6=5, 6=5, 7th=6
    const hwLetterDegrees = [0, 1, 2, 2, 3, 4, 5, 6]; // Root=0, b2=1, b3=2, 3=2, #4=3, 5=4, 6=5, b7=6
    
    const isWHDiminished = formula[0] === 2;
    const intervals = isWHDiminished ? whPattern : hwPattern;
    const letterDegrees = isWHDiminished ? whLetterDegrees : hwLetterDegrees;
    
    const scale = [];
    
    for (let i = 0; i < 8; i++) {
        if (i === 0) {
            scale.push(root);
            continue;
        }
        
        // Calculate target chromatic position
        const targetChromaticIndex = (rootChromaticIndex + intervals[i]) % 12;
        
        // Calculate target letter name
        const letterDegree = letterDegrees[i];
        const targetLetterIndex = (rootNoteIndex + letterDegree) % 7;
        const targetLetter = noteNames[targetLetterIndex];
        
        // Get natural chromatic position of target letter
        const naturalChromaticIndex = noteToIndex[targetLetter];
        
        // Calculate accidental needed
        const chromaticDifference = (targetChromaticIndex - naturalChromaticIndex + 12) % 12;
        
        let noteName;
        if (chromaticDifference === 0) {
            noteName = targetLetter; // Natural
        } else if (chromaticDifference === 1) {
            noteName = targetLetter + '#'; // Sharp
        } else if (chromaticDifference === 11) {
            noteName = targetLetter + 'b'; // Flat
        } else if (chromaticDifference === 2) {
            // Avoid double sharp - use enharmonic equivalent instead
            noteName = getConsistentNoteSpelling(targetChromaticIndex, spellingConvention);
        } else if (chromaticDifference === 10) {
            // Avoid double flat - use enharmonic equivalent instead
            noteName = getConsistentNoteSpelling(targetChromaticIndex, spellingConvention);
        } else {
            // This shouldn't happen with proper diminished scales
            console.warn('Unexpected chromatic difference:', chromaticDifference, 'for', targetLetter);
            noteName = targetLetter;
        }
        
        scale.push(noteName);
    }
    
    return scale;
}

// Special function for augmented scale spelling
function calculateAugmentedScaleSpelling(root, formula, spellingConvention) {
    const noteToIndex = {
        'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
        'C#': 1, 'Db': 1, 'D#': 3, 'Eb': 3, 'F#': 6, 'Gb': 6,
        'G#': 8, 'Ab': 8, 'A#': 10, 'Bb': 10,
        'B#': 0, 'Cb': 11, 'E#': 5, 'Fb': 4
    };
    
    const rootChromaticIndex = noteToIndex[root];
    if (rootChromaticIndex === undefined) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    const scale = [root];
    let currentChromaticIndex = rootChromaticIndex;
    
    for (let i = 0; i < formula.length - 1; i++) {
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        
        // For augmented scale, use chromatic spelling with proper enharmonics
        // The augmented scale should avoid using the same letter name twice
        let noteName = getConsistentNoteSpelling(currentChromaticIndex, spellingConvention);
        
        // Check if this note name conflicts with existing notes in the scale
        const existingLetters = scale.map(note => note.charAt(0));
        const currentLetter = noteName.charAt(0);
        
        if (existingLetters.includes(currentLetter)) {
            // Use the enharmonic equivalent
            if (spellingConvention === 'flat') {
                noteName = getConsistentNoteSpelling(currentChromaticIndex, 'sharp');
            } else {
                noteName = getConsistentNoteSpelling(currentChromaticIndex, 'flat');
            }
        }
        
        scale.push(noteName);
    }
    
    return scale;
}

function getParentScaleName(category, parentRoot) {
    const categoryData = MusicConstants.scaleCategories[category];
    if (!categoryData) {
        return `${parentRoot} Scale`;
    }
    
    return `${parentRoot} ${categoryData.name}`;
}

// Search functionality
let searchResults = [];
let selectedSuggestionIndex = -1;

function initializeSearch() {
    console.log('Initializing search functionality...');
    const searchInput = document.getElementById('mode-search');
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    if (!searchInput || !suggestionsContainer) {
        console.error('Search elements not found:', { searchInput, suggestionsContainer });
        return;
    }
    
    console.log('Search elements found, adding event listeners...');
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('keydown', handleSearchKeydown);
    searchInput.addEventListener('blur', hideSuggestions);
    searchInput.addEventListener('focus', showSuggestionsIfResults);
    console.log('Search functionality initialized successfully');
}

function handleSearchInput(e) {
    const query = e.target.value.trim();
    
    if (query.length < 2) {
        hideSuggestions();
        return;
    }
    
    searchResults = searchModes(query);
    displaySearchSuggestions(searchResults);
    selectedSuggestionIndex = -1;
}

function handleSearchKeydown(e) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    if (suggestionsContainer.classList.contains('hidden')) {
        return;
    }
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, searchResults.length - 1);
            updateSuggestionHighlight();
            break;
        case 'ArrowUp':
            e.preventDefault();
            selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
            updateSuggestionHighlight();
            break;
        case 'Enter':
            e.preventDefault();
            if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < searchResults.length) {
                selectSearchResult(searchResults[selectedSuggestionIndex]);
            }
            break;
        case 'Escape':
            hideSuggestions();
            e.target.blur();
            break;
    }
}

function searchModes(query) {
    const results = [];
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);
    
    // Notes for root matching
    const notes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
    
    // Find root note in query
    const rootNote = queryWords.find(word => 
        notes.some(note => note.toLowerCase() === word.toLowerCase())
    );
    
    // Search through all categories
    Object.entries(MusicConstants.scaleCategories).forEach(([categoryKey, categoryData]) => {
        if (!categoryData.modes) return;
        
        categoryData.modes.forEach(mode => {
            const modeData = MusicConstants.modeMetadata[mode];
            const modeNumbers = MusicConstants.modeNumbers[mode];
            
            if (!modeData || !modeNumbers) {
                return;
            }
            
            const modeName = modeNumbers.properName || mode;
            const modeNameLower = modeName.toLowerCase();
            const categoryName = categoryData.name.toLowerCase();
            
            // Calculate match score
            let score = 0;
            let matchedText = '';
            
            // Check if any query word matches the mode name
            const modeWordMatch = queryWords.find(word => {
                // Direct mode name match
                if (modeNameLower.includes(word.toLowerCase()) && word.length > 1) {
                    return true;
                }
                // Special case: "major" should match the "major" mode (Ionian)
                if (word.toLowerCase() === 'major' && mode === 'major') {
                    return true;
                }
                return false;
            });
            
            // HIGH PRIORITY: Root note + mode combination
            if (rootNote && modeWordMatch) {
                score = 1000; // Highest priority
                
                // Special handling for "major" search - show as "Major" in results
                const displayModeName = queryWords.includes('major') && mode === 'major' ? 'Major' : modeName;
                matchedText = `${rootNote.toUpperCase()} ${displayModeName}`;
                
                // Add result for the specific root note
                results.push({
                    root: rootNote.toUpperCase(),
                    mode: mode,
                    modeName: displayModeName,
                    category: categoryKey,
                    categoryName: categoryData.name,
                    description: modeData.description || '',
                    mood: modeData.mood || '',
                    score: score,
                    matchedText: matchedText
                });
                
            } else if (modeWordMatch) {
                // MEDIUM PRIORITY: Mode name match only
                score = 500;
                
                // Special handling for "major" search - show as "Major" in results
                const displayModeName = queryWords.includes('major') && mode === 'major' ? 'Major' : modeName;
                matchedText = displayModeName;
                
                // Add result for all notes if just searching by mode name
                notes.forEach(note => {
                    results.push({
                        root: note,
                        mode: mode,
                        modeName: displayModeName,
                        category: categoryKey,
                        categoryName: categoryData.name,
                        description: modeData.description || '',
                        mood: modeData.mood || '',
                        score: score,
                        matchedText: `${note} ${displayModeName}`
                    });
                });
                
            } else {
                // LOW PRIORITY: Partial matches
                queryWords.forEach(word => {
                    if (word.length > 1) { // Ignore single letter matches unless they're note names
                        if (modeNameLower.includes(word.toLowerCase())) {
                            score += 100;
                        }
                        if (categoryName.includes(word.toLowerCase())) {
                            score += 25;
                        }
                        // Special case: "major" should match the "major" mode (Ionian)
                        if (word.toLowerCase() === 'major' && mode === 'major') {
                            score += 100;
                        }
                    }
                });
                
                if (score > 0) {
                    const displayModeName = queryWords.includes('major') && mode === 'major' ? 'Major' : modeName;
                    notes.forEach(note => {
                        results.push({
                            root: note,
                            mode: mode,
                            modeName: displayModeName,
                            category: categoryKey,
                            categoryName: categoryData.name,
                            description: modeData.description || '',
                            mood: modeData.mood || '',
                            score: score,
                            matchedText: displayModeName
                        });
                    });
                }
            }
        });
    });
    
    // Sort by score (highest first) and limit results
    const sortedResults = results
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
        
    return sortedResults;
}

function displaySearchSuggestions(results) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    if (results.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    
    results.forEach((result, index) => {
        const suggestion = document.createElement('div');
        suggestion.className = 'search-suggestion';
        suggestion.dataset.index = index;
        
        suggestion.innerHTML = `
            <div class="suggestion-main">
                <div class="suggestion-title">${result.root} ${result.modeName}</div>
                <div class="suggestion-subtitle">${result.description}</div>
            </div>
            <div class="suggestion-category">${result.categoryName}</div>
        `;
        
        suggestion.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent the blur event from firing
            selectSearchResult(result);
        });
        suggestion.addEventListener('mouseenter', () => {
            selectedSuggestionIndex = index;
            updateSuggestionHighlight();
        });
        
        suggestionsContainer.appendChild(suggestion);
    });
    
    suggestionsContainer.classList.remove('hidden');
}

function updateSuggestionHighlight() {
    const suggestions = document.querySelectorAll('.search-suggestion');
    suggestions.forEach((suggestion, index) => {
        suggestion.classList.toggle('highlighted', index === selectedSuggestionIndex);
    });
}

function selectSearchResult(result) {
    console.log('Selecting search result:', result);
    
    // Calculate the correct enharmonic spelling based on modal system logic
    const correctedResult = getCorrectedEnharmonicSpelling(result);
    
    // Use the corrected result if it's different from the original
    const finalResult = correctedResult || result;
    
    console.log('Original result:', result);
    if (correctedResult) {
        console.log('Corrected to:', correctedResult);
    }
    
    // Immediately clear search and hide suggestions to prevent timing issues
    const searchInput = document.getElementById('mode-search');
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    if (suggestionsContainer) {
        suggestionsContainer.classList.add('hidden');
        selectedSuggestionIndex = -1;
    }
    
    // Use the AppController's setState method with a callback to ensure everything updates
    if (window.AppController && typeof AppController.setState === 'function') {
        console.log('Using AppController.setState to update state');
        console.log('Setting state to:', { key: finalResult.root, category: finalResult.category, mode: finalResult.mode });
        
        // Update state and force scale update
        AppController.setState({
            key: finalResult.root,
            category: finalResult.category,
            mode: finalResult.mode
        });
        
        // Force an additional update after a short delay to ensure everything is set
        setTimeout(() => {
            console.log('Forcing additional scale update...');
            if (typeof AppController.updateScale === 'function') {
                AppController.updateScale();
            }
        }, 100);
        
    } else {
        console.error('AppController.setState not available, falling back to manual updates');
        
        // Fallback to manual UI updates
        const rootSelect = document.getElementById('key-select');
        const categorySelect = document.getElementById('category-select');
        const modeSelect = document.getElementById('mode-select');
        
        // Set root note first
        if (rootSelect) {
            rootSelect.value = finalResult.root;
            const changeEvent = new Event('change', { bubbles: true });
            rootSelect.dispatchEvent(changeEvent);
        }
        
        // Set category and wait for it to fully update
        if (categorySelect) {
            categorySelect.value = finalResult.category;
            const changeEvent = new Event('change', { bubbles: true });
            categorySelect.dispatchEvent(changeEvent);
            
            // Wait for mode options to populate, then set mode
            const waitForModeOptions = (attempts = 0) => {
                if (attempts > 20) { // Give up after 1 second
                    console.error('Timeout waiting for mode options');
                    return;
                }
                
                if (modeSelect) {
                    const modeOption = modeSelect.querySelector(`option[value="${finalResult.mode}"]`);
                    if (modeOption) {
                        modeSelect.value = finalResult.mode;
                        const changeEvent = new Event('change', { bubbles: true });
                        modeSelect.dispatchEvent(changeEvent);
                    } else {
                        setTimeout(() => waitForModeOptions(attempts + 1), 50);
                    }
                }
            };
            
            setTimeout(waitForModeOptions, 100);
        }
    }
    
    console.log('Search result selection completed');
}

// Helper function to calculate correct enharmonic spelling based on modal system
function getCorrectedEnharmonicSpelling(result) {
    const { root, mode, category } = result;
    
    // Only correct for modal systems that have parent scales
    const modalCategories = ['major-modes', 'harmonic-minor-modes', 'melodic-minor-modes'];
    if (!modalCategories.includes(category)) {
        return null; // No correction needed for non-modal scales
    }
    
    // Mode offset lookup table - semitones from parent scale root to mode root
    const modeOffsets = {
        // Major modes
        'major': 0, 'dorian': 2, 'phrygian': 4, 'lydian': 5, 'mixolydian': 7, 'aeolian': 9, 'locrian': 11,
        // Harmonic minor modes  
        'harmonic-minor': 0, 'locrian-natural-6': 2, 'ionian-sharp-5': 3, 'dorian-sharp-4': 5, 
        'phrygian-dominant': 7, 'lydian-sharp-2': 8, 'altered-dominant': 11,
        // Melodic minor modes
        'melodic-minor': 0, 'dorian-b2': 2, 'lydian-augmented': 3, 'lydian-dominant': 5,
        'mixolydian-b6': 7, 'locrian-natural-2': 9, 'super-locrian': 11
    };
    
    const currentModeOffset = modeOffsets[mode] || 0;
    const rootIndex = noteToIndex(root);
    const parentRootIndex = (rootIndex - currentModeOffset + 12) % 12;
    
    // Determine spelling convention based on the parent scale root
    const parentRoot = getConsistentNoteSpelling(parentRootIndex, 'sharp');
    const parentRootFlat = getConsistentNoteSpelling(parentRootIndex, 'flat');
    
    // Keys that use flats/sharps in their key signatures
    const flatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
    const sharpKeys = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
    
    let spellingConvention;
    const parentScaleType = getScaleTypeFromCategory(category);
    
    if (parentScaleType === 'harmonic-minor' || parentScaleType === 'melodic-minor') {
        // For minor scales, use the same logic as major scales based on key signatures
        if (flatKeys.includes(parentRootFlat)) {
            spellingConvention = 'flat';
        } else if (sharpKeys.includes(parentRoot)) {
            spellingConvention = 'sharp';
        } else {
            spellingConvention = 'flat'; // For C minor scales
        }
    } else if (flatKeys.includes(parentRootFlat)) {
        spellingConvention = 'flat';
    } else if (sharpKeys.includes(parentRoot)) {
        spellingConvention = 'sharp';
    } else {
        spellingConvention = 'sharp'; // For C major
    }
    
    // Calculate the correct root note for this mode
    const correctRootIndex = (parentRootIndex + currentModeOffset) % 12;
    const correctRoot = getConsistentNoteSpelling(correctRootIndex, spellingConvention);
    
    // If the correct root is different from the search result root, return corrected result
    if (correctRoot !== root) {
        return {
            ...result,
            root: correctRoot,
            matchedText: `${correctRoot} ${result.modeName}`
        };
    }
    
    return null; // No correction needed
}

function showSuggestionsIfResults() {
    if (searchResults.length > 0) {
        document.getElementById('search-suggestions').classList.remove('hidden');
    }
}

function hideSuggestions() {
    setTimeout(() => {
        document.getElementById('search-suggestions').classList.add('hidden');
        selectedSuggestionIndex = -1;
    }, 150); // Small delay to allow for click events
}

function displayChords(scale, scaleType, category = null) {
    console.log('=== displayChords DEBUG START ===');
    console.log('Parameters:', { 
        scaleType, 
        scaleLength: scale?.length, 
        category,
        scale: scale?.slice(0, 5) + (scale?.length > 5 ? '...' : '') 
    });
    
    const chordsSection = document.querySelector('.chords-section');
    const chordsList = document.getElementById('chords-list');
    
    if (!chordsSection || !chordsList) {
        console.log('Missing required DOM elements:', { 
            scaleLength: scale?.length, 
            chordsSection: !!chordsSection, 
            chordsList: !!chordsList 
        });
        return;
    }
    
    // Check if this scale type should display chords
    const shouldDisplay = MusicTheory.shouldDisplayChords(scaleType, scale.length, category);
    console.log('shouldDisplayChords result:', shouldDisplay);
    
    if (!shouldDisplay) {
        console.log('Hiding chords section - scale type should not display chords');
        chordsSection.style.display = 'none';
        return;
    }
    
    // Show the chords section
    chordsSection.style.display = 'block';
    console.log('Chords section shown');
    
    // Check if this scale uses characteristic chord analysis instead of traditional analysis
    console.log('Calling getCharacteristicChords with:', { scale, scaleType });
    const characteristicChords = MusicTheory.getCharacteristicChords(scale, scaleType);
    console.log('getCharacteristicChords returned:', characteristicChords);
    console.log('Type of result:', typeof characteristicChords);
    
    if (characteristicChords) {
        console.log('Using characteristic chords display');
        // Display characteristic chords for exotic scales
        displayCharacteristicChords(scale, scaleType, characteristicChords);
    } else {
        console.log('Using traditional chords display');
        // Use traditional degree-by-degree analysis for diatonic scales
        displayTraditionalChords(scale, scaleType, category);
    }
    console.log('=== displayChords DEBUG END ===');
}

function displayCharacteristicChords(scale, scaleType, characteristicChords) {
    console.log('=== displayCharacteristicChords DEBUG START ===');
    console.log('Parameters:', { scale, scaleType, characteristicChords });
    
    const chordsList = document.getElementById('chords-list');
    const chordsSection = document.querySelector('.chords-section');
    const chordControls = document.querySelector('.chord-controls');
    
    console.log('DOM elements:', { chordsList: !!chordsList, chordsSection: !!chordsSection, chordControls: !!chordControls });
    
    if (!chordsList || !chordsSection) {
        console.log('Missing required DOM elements, returning early');
        return;
    }
    
    // Hide traditional chord controls and update section title
    if (chordControls) chordControls.style.display = 'none';
    const sectionTitle = chordsSection.querySelector('h3');
    if (sectionTitle) sectionTitle.textContent = 'Chords from the Scale';
    
    // Clear existing content
    chordsList.innerHTML = '';
    console.log('Cleared chords list, about to call displayChordsFromScale');
    
    // Display chords organized by type
    displayChordsFromScale(chordsList, characteristicChords);
    
    console.log('Called displayChordsFromScale, chords list innerHTML length:', chordsList.innerHTML.length);
    
    // Update audio controls with characteristic chord data
    if (window.audioControls && characteristicChords) {
        // Convert characteristic chords to a format the audio controls can use
        const audioChords = {
            triads: [],
            sevenths: [],
            characteristic: characteristicChords
        };
        
        // Extract chord names from characteristic chords structure
        if (characteristicChords.triads) {
            characteristicChords.triads.forEach(group => {
                if (group.chords) {
                    group.chords.forEach(chordName => {
                        audioChords.triads.push({ name: chordName });
                    });
                }
            });
        }
        
        if (characteristicChords.sevenths) {
            characteristicChords.sevenths.forEach(group => {
                if (group.chords) {
                    group.chords.forEach(chordName => {
                        audioChords.sevenths.push({ name: chordName });
                    });
                }
            });
        }
        
        window.audioControls.updateChords(audioChords);
    }
}

function displayChordsFromScale(container, characteristicChords) {
    console.log('displayChordsFromScale called with:', characteristicChords);
    
    // Create main chords section without duplicate header
    const chordsFromScaleSection = document.createElement('div');
    chordsFromScaleSection.className = 'chords-from-scale-section';
    
    const chordsContainer = document.createElement('div');
    chordsContainer.className = 'chord-types-container';
    
    // Special handling for chromatic scale - check first before other conditions
    if (characteristicChords && characteristicChords.chords && Array.isArray(characteristicChords.chords) && 
        characteristicChords.chords.length === 1 && characteristicChords.chords[0].chord) {
        console.log('Detected chromatic scale structure, using special handling');
        
        const typeSection = document.createElement('div');
        typeSection.className = 'chord-type-section';
        
        typeSection.innerHTML = `
            <h4 class="chord-type-title">Available Chords</h4>
            <p class="chord-type-description">The chromatic scale contains all 12 notes</p>
            <div class="chord-type-chords">
                <span class="characteristic-chord non-clickable" title="All chords are possible with the chromatic scale">All chords!</span>
            </div>
        `;
        
        chordsContainer.appendChild(typeSection);
    }
    // Check if we have the new structure with 'chords' array
    else if (characteristicChords && characteristicChords.chords && Array.isArray(characteristicChords.chords)) {
        console.log('Using new chord structure with chords array');
        
        // Display each chord type section
        characteristicChords.chords.forEach(chordGroup => {
            const typeSection = document.createElement('div');
            typeSection.className = 'chord-type-section';
            
            const isEmphasized = chordGroup.emphasis ? ' emphasized' : '';
            
            // Add null checking for chordGroup.chords
            if (chordGroup.chords && Array.isArray(chordGroup.chords)) {
                const chordsHtml = chordGroup.chords.map(chord => {
                    // Check if this is a chord name vs description text
                    const isClickableChord = !chord.includes(' ') && !chord.includes('Contains') && !chord.includes('Creates') && !chord.includes('Multiple') && !chord.includes('Excellent');
                    
                    if (isClickableChord) {
                        return `<span class="characteristic-chord clickable-chord" title="${chordGroup.description || ''}" data-chord="${chord}">${chord}</span>`;
                    } else {
                        return `<span class="characteristic-chord non-clickable" title="${chordGroup.description || ''}">${chord}</span>`;
                    }
                }).join('');
                
                typeSection.innerHTML = `
                    <h4 class="chord-type-title${isEmphasized}">${chordGroup.type || 'Chords'}</h4>
                    <p class="chord-type-description">${chordGroup.description || ''}</p>
                    <div class="chord-type-chords">
                        ${chordsHtml}
                    </div>
                `;
            } else {
                // Handle case where chordGroup.chords is missing or not an array
                typeSection.innerHTML = `
                    <h4 class="chord-type-title${isEmphasized}">${chordGroup.type || 'Chords'}</h4>
                    <p class="chord-type-description">${chordGroup.description || 'No chord data available'}</p>
                    <div class="chord-type-chords">
                        <span class="characteristic-chord non-clickable">No chords available</span>
                    </div>
                `;
            }
            
            chordsContainer.appendChild(typeSection);
        });
    } else if (characteristicChords && characteristicChords.chords && !Array.isArray(characteristicChords.chords)) {
        // Handle old structure where chords is an array of chord objects (like chromatic scale)
        console.log('Using old chord structure with chord objects array');
        
        const typeSection = document.createElement('div');
        typeSection.className = 'chord-type-section';
        
        // Special handling for chromatic scale
        if (characteristicChords.chords.length === 1 && characteristicChords.chords[0].chord) {
            typeSection.innerHTML = `
                <h4 class="chord-type-title">Available Chords</h4>
                <p class="chord-type-description">The chromatic scale contains all 12 notes</p>
                <div class="chord-type-chords">
                    <span class="characteristic-chord non-clickable" title="All chords are possible with the chromatic scale">All chords!</span>
                </div>
            `;
        } else {
            const chordsHtml = characteristicChords.chords.map(chordObj => {
                const chordName = chordObj.chord || chordObj.name || chordObj.root || 'Unknown';
                const isClickableChord = /[+°#♭]|7|maj|m|sus|dim|aug/.test(chordName) && !chordName.includes(' ');
                
                if (isClickableChord) {
                    return `<span class="characteristic-chord clickable-chord" title="Chord from scale" data-chord="${chordName}">${chordName}</span>`;
                } else {
                    return `<span class="characteristic-chord non-clickable" title="Chord from scale">${chordName}</span>`;
                }
            }).join('');
            
            typeSection.innerHTML = `
                <h4 class="chord-type-title">Available Chords</h4>
                <p class="chord-type-description">Chords that can be constructed from this scale</p>
                <div class="chord-type-chords">
                    ${chordsHtml}
                </div>
            `;
        }
        
        chordsContainer.appendChild(typeSection);
    } else {
        console.log('Using legacy chord structure, calling organizeChordsByType');
        // Fallback to old structure
        const organizedChords = organizeChordsByType(characteristicChords);
        
        // Create sections for each chord type
        Object.entries(organizedChords).forEach(([chordType, chords]) => {
            const typeSection = document.createElement('div');
            typeSection.className = 'chord-type-section';
            
            const chordsHtml = chords.map(chord => {
                const chordName = chord.name || chord;
                const isClickableChord = /[+°#♭]|7|maj|m|sus|dim|aug/.test(chordName) && !chordName.includes(' ');
                
                if (isClickableChord) {
                    return `<span class="characteristic-chord clickable-chord" title="${chord.description || ''}" data-chord="${chordName}">${chordName}</span>`;
                } else {
                    return `<span class="characteristic-chord non-clickable" title="${chord.description || ''}">${chordName}</span>`;
                }
            }).join('');
            
            typeSection.innerHTML = `
                <h4 class="chord-type-title">${chordType}</h4>
                <div class="chord-type-chords">
                    ${chordsHtml}
                </div>
            `;
            
            chordsContainer.appendChild(typeSection);
        });
    }
    
    chordsFromScaleSection.appendChild(chordsContainer);
    container.appendChild(chordsFromScaleSection);
    
    // Add click handlers for clickable chords
    const clickableChords = chordsFromScaleSection.querySelectorAll('.clickable-chord');
    clickableChords.forEach(chordElement => {
        chordElement.addEventListener('click', function() {
            const chordName = this.getAttribute('data-chord');
            const [root, type] = parseChordName(chordName);
            openChordModal(chordName, root);
        });
    });
    
    console.log('displayChordsFromScale completed, container innerHTML length:', container.innerHTML.length);
}

// Helper function to parse chord names
function parseChordName(chordName) {
    // Extract root note and chord type from chord name like "C+", "F#7#5", "Bb°7"
    let root = '';
    let type = '';
    
    // Handle sharp/flat in root note
    if (chordName.length > 1 && (chordName[1] === '#' || chordName[1] === '♯' || chordName[1] === 'b' || chordName[1] === '♭')) {
        root = chordName.substring(0, 2);
        type = chordName.substring(2);
    } else {
        root = chordName[0];
        type = chordName.substring(1);
    }
    
    return [root, type];
}

function organizeChordsByType(characteristicChords) {
    const organized = {
        'Triads': [],
        'Seventh Chords': [],
        'Extended & Other': []
    };
    
    // Process triads
    if (characteristicChords.triads) {
        characteristicChords.triads.forEach(group => {
            if (group.chords) {
                group.chords.forEach(chord => {
                    organized['Triads'].push({
                        name: chord,
                        description: group.description
                    });
                });
            }
        });
    }
    
    // Process sevenths
    if (characteristicChords.sevenths) {
        characteristicChords.sevenths.forEach(group => {
            if (group.chords) {
                group.chords.forEach(chord => {
                    organized['Seventh Chords'].push({
                        name: chord,
                        description: group.description
                    });
                });
            }
        });
    }
    
    // Process extended/other chords
    if (characteristicChords.extended) {
        characteristicChords.extended.forEach(group => {
            if (group.chords) {
                group.chords.forEach(chord => {
                    organized['Extended & Other'].push({
                        name: chord,
                        description: group.description
                    });
                });
            }
        });
    }
    
    // Remove empty categories
    Object.keys(organized).forEach(key => {
        if (organized[key].length === 0) {
            delete organized[key];
        }
    });
    
    return organized;
}

function displayScaleApplications(container, scaleType) {
    console.log('displayScaleApplications called with scaleType:', scaleType);
    
    const applicationData = getScaleApplicationData(scaleType);
    console.log('Application data found:', applicationData);
    
    if (!applicationData) {
        console.log('No application data found for scale type:', scaleType);
        return;
    }
    
    const applicationsSection = document.createElement('div');
    applicationsSection.className = 'scale-applications-section';
    
    applicationsSection.innerHTML = `
        <div class="section-header">
            <h3>Scale Applications</h3>
            <p class="section-description">When and how to use this scale (chord context, not melody)</p>
        </div>
        <div class="applications-content">
            <div class="application-context">
                <h4>Works Over:</h4>
                <p>${applicationData.usedOver}</p>
            </div>
            <div class="application-example">
                <h4>Example:</h4>
                <div class="progression-example">
                    <span class="progression">${applicationData.exampleProgression}</span>
                    <span class="usage-note">${applicationData.specificChord}</span>
                </div>
            </div>
            <div class="application-context-note">
                <h4>Context:</h4>
                <p>${applicationData.context}</p>
            </div>
            <div class="application-styles">
                <h4>Common In:</h4>
                <p>${applicationData.commonIn}</p>
            </div>
        </div>
    `;
    
    console.log('Adding applications section to container');
    container.appendChild(applicationsSection);
}

function getScaleApplicationData(scaleType) {
    console.log('getScaleApplicationData called with:', scaleType);
    
    const applications = {
        'diminished': {
            usedOver: 'Dominant 7th chords (especially altered dominants), diminished chords',
            exampleProgression: 'Dm7 - G7alt - Cmaj7',
            specificChord: 'Works over the G7alt chord only',
            commonIn: 'Jazz improvisation, classical harmony, bebop',
            context: 'Use over specific dominant chords, not entire progressions'
        },
        'pentatonic-major': {
            usedOver: 'Major key progressions, major and minor chords within the key',
            exampleProgression: 'C - Am - F - G',
            specificChord: 'Works over the entire progression (all chords are in C major)',
            commonIn: 'Folk music, rock solos, country, Celtic music',
            context: 'Works over entire progressions in major keys'
        },
        'pentatonic-minor': {
            usedOver: 'Minor key progressions, blues progressions, minor and dominant chords',
            exampleProgression: 'Am - F - C - G',
            specificChord: 'Works over entire progression, especially strong over Am and C',
            commonIn: 'Blues, rock, jazz fusion, world music',
            context: 'Works over entire minor key progressions and blues changes'
        },
        'blues': {
            usedOver: '12-bar blues, dominant 7th chords, minor blues progressions',
            exampleProgression: 'C7 - F7 - C7 - G7',
            specificChord: 'Works over all dominant 7th chords in blues progressions',
            commonIn: 'Blues, jazz, rock, soul, R&B',
            context: 'Works over entire blues progressions and individual dominant chords'
        },
        'whole-tone': {
            usedOver: 'Augmented chords, dominant 7♯11 chords, impressionist harmony',
            exampleProgression: 'Cmaj7 - C7♯11 - Fmaj7',
            specificChord: 'Works over the C7♯11 chord only',
            commonIn: 'Impressionist classical, jazz ballads, film scoring',
            context: 'Use over specific altered chords, creates floating, ambiguous sound'
        }
    };
    
    // Handle scale type variations
    let scaleData = applications[scaleType];
    console.log('Direct lookup result:', scaleData);
    
    if (!scaleData) {
        console.log('Trying alternative scale type matching...');
        if (scaleType.includes('pentatonic')) {
            scaleData = scaleType.includes('minor') ? applications['pentatonic-minor'] : applications['pentatonic-major'];
            console.log('Pentatonic match found:', scaleData ? 'yes' : 'no');
        } else if (scaleType.includes('whole')) {
            scaleData = applications['whole-tone'];
            console.log('Whole tone match found:', scaleData ? 'yes' : 'no');
        } else if (scaleType.includes('blues')) {
            scaleData = applications['blues'];
            console.log('Blues match found:', scaleData ? 'yes' : 'no');
        } else if (scaleType.includes('diminished')) {
            scaleData = applications['diminished'];
            console.log('Diminished match found:', scaleData ? 'yes' : 'no');
        }
    }
    
    return scaleData;
}

function displayTraditionalChords(scale, scaleType, category) {
    // Check if chords should be displayed for this scale type
    if (!MusicTheory.shouldDisplayChords(scaleType, scale.length, category)) {
        const chordsList = document.getElementById('chords-list');
        if (chordsList) {
            chordsList.innerHTML = '<p class="no-chords-message">Chord display not available for this scale type.</p>';
        }
        return;
    }

    // Show traditional chord controls and update section title
    const chordControls = document.querySelector('.chord-controls');
    const chordsSection = document.querySelector('.chords-section');
    if (chordControls) chordControls.style.display = 'block';
    const sectionTitle = chordsSection?.querySelector('h3');
    if (sectionTitle) sectionTitle.textContent = 'Chords from the Scale';

    // Add informational note for harmonic minor and melodic minor scales
    let scaleNote = '';
    if (scaleType === 'harmonic-minor' || scaleType === 'melodic-minor') {
        const scaleTypeName = scaleType === 'harmonic-minor' ? 'harmonic minor' : 'melodic minor';
        scaleNote = `
            <div class="scale-chord-note">
                <p><strong>Note:</strong> This ${scaleTypeName} scale display shows triads and 7th chords. Like major modes, other chord types (6th chords, sus2, sus4, 7sus4, 9th, 11th, and 13th chords) can also be constructed from this scale.</p>
            </div>
        `;
    } else if (scaleType === 'diminished' || scaleType === 'half-whole-diminished' || scaleType === 'whole-half-diminished' || 
               scaleType.includes('diminished') || (scale && scale.length === 8)) {
        scaleNote = `
            <div class="scale-chord-note">
                <p><strong>Note:</strong> This diminished scale display shows triads and 7th chords from each scale degree. Diminished scales create complex harmonic structures with many available chord types beyond what's shown here.</p>
            </div>
        `;
    }

    // Add theory naming convention note based on scale type
    function getTheoryExplanation(scaleType, category) {
        // Function to get parent scale chords for avoid sections
        function getParentScaleChords() {
            if (!window.currentScale || window.currentScale.length < 7) {
                return { V: 'V', I: 'I' };
            }
            
            // For major modes, parent is major scale starting from calculated root
            if (category === 'major-modes') {
                const modePositions = {
                    'ionian': 0, 'dorian': 1, 'phrygian': 2, 'lydian': 3,
                    'mixolydian': 4, 'aeolian': 5, 'locrian': 6
                };
                
                const modePosition = modePositions[scaleType] || 0;
                const parentRoot = window.currentScale[(7 - modePosition) % 7];
                
                // Calculate parent scale notes
                const parentScale = [];
                const rootIndex = window.currentScale.indexOf(parentRoot);
                for (let i = 0; i < 7; i++) {
                    parentScale.push(window.currentScale[(rootIndex + i) % 7]);
                }
                
                return {
                    V: parentScale[4], // 5th degree of parent major
                    I: parentScale[0]  // 1st degree of parent major
                };
            }
            
            return { V: 'V', I: 'I' };
        }

        // Function to get relative note based on scale degree
        function getRelativeNote(scaleDegree) {
            if (!window.currentScale || window.currentScale.length < 7) {
                return 'C';
            }
            
            const index = (scaleDegree - 1) % 7;
            return window.currentScale[index];
        }

        // Calculate modal tonic at the beginning
        const modalTonic = window.currentScale ? window.currentScale[0] : 'C';
        const parentChords = getParentScaleChords();

        // Return empty string - no modal theory content
        return '';
    }

    const theoryNote = getTheoryExplanation(scaleType, category);

    // Combine notes
    const combinedNotes = scaleNote + theoryNote;

    // Calculate triads
    const triads = MusicTheory.calculateTriads(scale, scaleType, category);
    console.log('Generated triads:', triads);

    // Calculate seventh chords
    const seventhChords = MusicTheory.calculateSeventhChords(scale, scaleType, category);
    console.log('Generated 7th chords:', seventhChords);

    // Determine if extended chords should be available
    const showExtendedChords = scaleType === 'major' || (category && category.toLowerCase().includes('major'));
    
    // Calculate extended chords (only for major modes)
    let sixthChords = [];
    let sus2Chords = [];
    let sus4Chords = [];
    let sus4SeventhChords = [];
    let ninthChords = [];
    let eleventhChords = [];
    let thirteenthChords = [];

    if (showExtendedChords) {
        sixthChords = MusicTheory.calculateSixthChords(scale, scaleType, category);
        sus2Chords = MusicTheory.calculateSus2Chords(scale, scaleType, category);
        sus4Chords = MusicTheory.calculateSus4Chords(scale, scaleType, category);
        sus4SeventhChords = MusicTheory.calculateSus4SeventhChords(scale, scaleType, category);
        ninthChords = MusicTheory.calculateNinthChords(scale, scaleType, category);
        eleventhChords = MusicTheory.calculateEleventhChords(scale, scaleType, category);
        thirteenthChords = MusicTheory.calculateThirteenthChords(scale, scaleType, category);
        console.log('Generated 6th chords:', sixthChords);
        console.log('Generated sus2 chords:', sus2Chords);
        console.log('Generated sus4 chords:', sus4Chords);
        console.log('Generated sus4 seventh chords:', sus4SeventhChords);
        console.log('Generated 9th chords:', ninthChords);
        console.log('Generated 11th chords:', eleventhChords);
        console.log('Generated 13th chords:', thirteenthChords);
    }
    
    // Store current chords globally for view toggle functionality
    window.currentChords = {
        triads: triads,
        sixths: sixthChords,
        sus2: sus2Chords,
        sus4: sus4Chords,
        sus4sevenths: sus4SeventhChords,
        sevenths: seventhChords,
        ninths: ninthChords,
        elevenths: eleventhChords,
        thirteenths: thirteenthChords
    };

    // Show/hide extended chord buttons based on scale type
    const extendedChordButtons = document.querySelectorAll('.chord-type-btn[data-type="sixths"], .chord-type-btn[data-type="sus2"], .chord-type-btn[data-type="sus4"], .chord-type-btn[data-type="sus4-sevenths"], .chord-type-btn[data-type="ninths"], .chord-type-btn[data-type="elevenths"], .chord-type-btn[data-type="thirteenths"]');
    extendedChordButtons.forEach(button => {
        if (showExtendedChords) {
            button.style.display = 'inline-block';
        } else {
            button.style.display = 'none';
            // If the hidden button was active, switch to triads
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                const triadsButton = document.querySelector('.chord-type-btn[data-type="triads"]');
                if (triadsButton) {
                    triadsButton.classList.add('active');
                }
            }
        }
    });

    // Add the combined notes if they exist, then display triads by default
    const chordsList = document.getElementById('chords-list');
    if (chordsList && combinedNotes) {
        chordsList.innerHTML = combinedNotes;
        const triadsContainer = document.createElement('div');
        triadsContainer.id = 'triads-container';
        chordsList.appendChild(triadsContainer);
        displayChordType('triads', triads, triadsContainer);
    } else {
        displayChordType('triads', triads);
    }

    // Update audio controls with triads initially
    if (window.audioControls) {
        window.audioControls.updateChords({
            triads: triads,
            sixths: sixthChords,
            sus2: sus2Chords,
            sus4: sus4Chords,
            sus4sevenths: sus4SeventhChords,
            sevenths: seventhChords,
            ninths: ninthChords,
            elevenths: eleventhChords,
            thirteenths: thirteenthChords
        });
    }
    
    // Add event listeners for chord type buttons
    const chordButtons = document.querySelectorAll('.chord-type-btn');
    chordButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Update active state
            chordButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Clear the scale note when switching chord types
            const targetContainer = combinedNotes ? document.getElementById('triads-container') || chordsList : chordsList;
            
            // Display the selected chord type
            const chordType = e.target.dataset.type;
            if (chordType === 'triads') {
                if (combinedNotes) {
                    chordsList.innerHTML = combinedNotes;
                    const triadsContainer = document.createElement('div');
                    triadsContainer.id = 'triads-container';
                    chordsList.appendChild(triadsContainer);
                    displayChordType('triads', triads, triadsContainer);
                } else {
                    displayChordType('triads', triads);
                }
                // Update audio controls with triads
                if (window.audioControls) {
                    window.audioControls.updateChords(triads);
                }
            } else if (chordType === 'sixths') {
                if (sixthChords.length > 0) {
                    displayChordType('sixths', sixthChords);
                    // Update audio controls with 6th chords
                    if (window.audioControls) {
                        window.audioControls.updateChords(sixthChords);
                    }
                } else {
                    displayChordType('sixths', []);
                    const chordsList = document.getElementById('chords-list');
                    if (chordsList) {
                        chordsList.innerHTML = '<p class="no-chords-message">6th chords are only available for major modes.</p>';
                    }
                }
            } else if (chordType === 'sus2') {
                if (sus2Chords.length > 0) {
                    const sus2Note = `
                        <div class="sus-chord-explanation">
                            <strong>Sus2 Chords:</strong> Suspended second chords are neither major nor minor because the third of the chord is substituted for the second. This creates an open, unresolved sound that wants to resolve back to a major or minor chord.
                        </div>
                    `;
                    chordsList.innerHTML = sus2Note;
                    const sus2Container = document.createElement('div');
                    sus2Container.id = 'sus2-container';
                    chordsList.appendChild(sus2Container);
                    displayChordType('sus2', sus2Chords, sus2Container);
                    // Update audio controls with sus2 chords
                    if (window.audioControls) {
                        window.audioControls.updateChords(sus2Chords);
                    }
                } else {
                    displayChordType('sus2', []);
                    const chordsList = document.getElementById('chords-list');
                    if (chordsList) {
                        chordsList.innerHTML = '<p class="no-chords-message">Sus2 chords are only available for major modes.</p>';
                    }
                }
            } else if (chordType === 'sus4') {
                if (sus4Chords.length > 0) {
                    const sus4Note = `
                        <div class="sus-chord-explanation">
                            <strong>Sus4 Chords:</strong> Suspended fourth chords are neither major nor minor because the third of the chord is substituted for the fourth. This creates tension that typically resolves down to the third, making these chords excellent for creating movement and anticipation in progressions.
                        </div>
                    `;
                    chordsList.innerHTML = sus4Note;
                    const sus4Container = document.createElement('div');
                    sus4Container.id = 'sus4-container';
                    chordsList.appendChild(sus4Container);
                    displayChordType('sus4', sus4Chords, sus4Container);
                    // Update audio controls with sus4 chords
                    if (window.audioControls) {
                        window.audioControls.updateChords(sus4Chords);
                    }
                } else {
                    displayChordType('sus4', []);
                    const chordsList = document.getElementById('chords-list');
                    if (chordsList) {
                        chordsList.innerHTML = '<p class="no-chords-message">Sus4 chords are only available for major modes.</p>';
                    }
                }
            } else if (chordType === 'sus4-sevenths') {
                if (sus4SeventhChords.length > 0) {
                    const sus4SeventhNote = `
                        <div class="sus-chord-explanation">
                            <strong>7sus4 Chords:</strong> Seventh suspended fourth chords combine the tension of a suspended fourth with the color of a seventh. Like sus4 chords, the third is substituted for the fourth, creating harmonic ambiguity that's neither major nor minor. These are commonly used in jazz and contemporary music for their sophisticated, unresolved sound.
                        </div>
                    `;
                    chordsList.innerHTML = sus4SeventhNote;
                    const sus4SeventhContainer = document.createElement('div');
                    sus4SeventhContainer.id = 'sus4-seventh-container';
                    chordsList.appendChild(sus4SeventhContainer);
                    displayChordType('sus4-sevenths', sus4SeventhChords, sus4SeventhContainer);
                    // Update audio controls with sus4 seventh chords
                    if (window.audioControls) {
                        window.audioControls.updateChords(sus4SeventhChords);
                    }
                } else {
                    displayChordType('sus4-sevenths', []);
                    const chordsList = document.getElementById('chords-list');
                    if (chordsList) {
                        chordsList.innerHTML = '<p class="no-chords-message">7sus4 chords are only available for major modes.</p>';
                    }
                }
            } else if (chordType === 'sevenths') {
                if (scaleNote) {
                    displayChordType('sevenths', seventhChords);
                } else {
                    displayChordType('sevenths', seventhChords);
                }
                // Update audio controls with 7th chords
                if (window.audioControls) {
                    window.audioControls.updateChords(seventhChords);
                }
            } else if (chordType === 'ninths') {
                if (ninthChords.length > 0) {
                    displayChordType('ninths', ninthChords);
                    // Update audio controls with 9th chords
                    if (window.audioControls) {
                        window.audioControls.updateChords(ninthChords);
                    }
                } else {
                    displayChordType('ninths', []);
                    const chordsList = document.getElementById('chords-list');
                    if (chordsList) {
                        chordsList.innerHTML = '<p class="no-chords-message">9th chords are only available for major modes.</p>';
                    }
                }
            } else if (chordType === 'elevenths') {
                if (eleventhChords.length > 0) {
                    displayChordType('elevenths', eleventhChords);
                    // Update audio controls with 11th chords
                    if (window.audioControls) {
                        window.audioControls.updateChords(eleventhChords);
                    }
                } else {
                    displayChordType('elevenths', []);
                    const chordsList = document.getElementById('chords-list');
                    if (chordsList) {
                        chordsList.innerHTML = '<p class="no-chords-message">11th chords are only available for major modes.</p>';
                    }
                }
            } else if (chordType === 'thirteenths') {
                if (thirteenthChords.length > 0) {
                    displayChordType('thirteenths', thirteenthChords);
                    // Update audio controls with 13th chords
                    if (window.audioControls) {
                        window.audioControls.updateChords(thirteenthChords);
                    }
                } else {
                    displayChordType('thirteenths', []);
                    const chordsList = document.getElementById('chords-list');
                    if (chordsList) {
                        chordsList.innerHTML = '<p class="no-chords-message">13th chords are only available for major modes.</p>';
                    }
                }
            }
        });
    });
}

function getContrastTextColor(backgroundColor) {
    // Convert hex to RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark backgrounds, dark for light backgrounds
    return luminance > 0.5 ? '#1f2937' : '#ffffff';
}

function displayChordType(type, chords, container = null) {
    const chordsList = container || document.getElementById('chords-list');
    if (!chordsList || !chords) return;
    
    chordsList.innerHTML = '';
    
    // For triads and sevenths, organize by chord quality for better display
    if ((type === 'triads' || type === 'sevenths') && chords.length > 0) {
        const organized = organizeChordsByQuality(chords, type);
        
        // Display organized chord sections
        Object.keys(organized).forEach(quality => {
            const qualityChords = organized[quality];
            if (qualityChords.length === 0) return;
            
            // Display chords in this section
            qualityChords.forEach((chord, index) => {
                const chordElement = document.createElement('div');
                chordElement.className = `chord-item ${chord.isNonStandard ? 'non-standard' : ''}`;
                
                // Use orange color for all chord degrees
                const functionColor = '#ff8c00'; // Orange color to match the theme
                const textColor = 'white'; // White text for good contrast
                
                // Add a tooltip for non-standard chords
                const tooltip = chord.isNonStandard ? 
                    `title="Non-standard chord: ${chord.intervals.map(i => MusicTheory.getIntervalName(i)).join(', ')}"` : '';
                
                chordElement.innerHTML = `
                    <div class="chord-degree" style="background-color: ${functionColor}; color: ${textColor};">
                        <span class="degree-number">${chord.degree}</span>
                        <span class="roman-numeral">${chord.roman}</span>
                    </div>
                    <div class="chord-info" ${tooltip}>
                        <div class="chord-name ${chord.isNonStandard ? 'exotic' : ''}">${chord.name}</div>
                        <div class="chord-notes">${chord.notes.join(' - ')}</div>
                        <div class="chord-quality ${chord.isNonStandard ? 'exotic' : ''}">${chord.quality}</div>
                        ${chord.isNonStandard ? '<div class="chord-exotic-note">⚡ Exotic</div>' : ''}
                    </div>
                `;
                
                // Add click handler for future chord playback or visualization
                chordElement.addEventListener('click', (e) => {
                    // Only prevent modal if clicking directly on audio control buttons
                    if (window.audioControls && (e.target.closest('.play-btn') || e.target.closest('.direction-btn'))) {
                        return; // Let audio controls handle it
                    }
                    
                    console.log('Traditional chord clicked:', chord);
                    console.log('Chord properties:', Object.keys(chord));
                    console.log('Chord details:', {
                        name: chord.name,
                        notes: chord.notes,
                        quality: chord.quality,
                        degree: chord.degree,
                        roman: chord.roman
                    });
                    highlightChordOnFretboard(chord);
                });
                
                chordsList.appendChild(chordElement);
            });
        });
    } else {
        // For other chord types, display in simple list format
        chords.forEach((chord, index) => {
            const chordElement = document.createElement('div');
            chordElement.className = `chord-item ${chord.isNonStandard ? 'non-standard' : ''}`;
            
            // Use orange color for all chord degrees like triads and sevenths
            const functionColor = '#d97706'; // Orange color to match other chord types
            const textColor = 'white'; // White text for good contrast
            
            // Add a tooltip for non-standard chords
            const tooltip = chord.isNonStandard ? 
                `title="Non-standard chord: ${chord.intervals.map(i => MusicTheory.getIntervalName(i)).join(', ')}"` : '';
            
            chordElement.innerHTML = `
                <div class="chord-degree" style="background-color: ${functionColor}; color: ${textColor};">
                    <span class="degree-number">${chord.degree}</span>
                    <span class="roman-numeral">${chord.roman}</span>
                </div>
                <div class="chord-info" ${tooltip}>
                    <div class="chord-name ${chord.isNonStandard ? 'exotic' : ''}">${chord.name}</div>
                    <div class="chord-notes">${chord.notes.join(' - ')}</div>
                    <div class="chord-quality ${chord.isNonStandard ? 'exotic' : ''}">${chord.quality}</div>
                    ${chord.isNonStandard ? '<div class="chord-exotic-note">⚡ Exotic</div>' : ''}
                </div>
            `;
            
            // Add click handler for future chord playback or visualization
            chordElement.addEventListener('click', (e) => {
                // Only prevent modal if clicking directly on audio control buttons
                if (window.audioControls && (e.target.closest('.play-btn') || e.target.closest('.direction-btn'))) {
                    return; // Let audio controls handle it
                }
                
                console.log('Traditional chord clicked:', chord);
                console.log('Chord properties:', Object.keys(chord));
                console.log('Chord details:', {
                    name: chord.name,
                    notes: chord.notes,
                    quality: chord.quality,
                    degree: chord.degree,
                    roman: chord.roman
                });
                highlightChordOnFretboard(chord);
            });
            
            chordsList.appendChild(chordElement);
        });
    }
}

// Helper function to organize chords by their quality/type
function organizeChordsByQuality(chords, chordType) {
    // Organize by scale degree (1-7) instead of chord quality
    const organized = {};
    
    chords.forEach(chord => {
        const degree = chord.degree || 0;
        const roman = chord.roman || '';
        const quality = chord.quality || '';
        
        // Create section title with Roman numeral and chord name
        let sectionTitle;
        if (roman && chord.name) {
            sectionTitle = `${roman} - ${chord.name}`;
        } else if (chord.name) {
            sectionTitle = `${degree} - ${chord.name}`;
        } else {
            sectionTitle = `Degree ${degree}`;
        }
        
        if (!organized[sectionTitle]) {
            organized[sectionTitle] = [];
        }
        organized[sectionTitle].push(chord);
    });
    
    // Sort by degree (1-7)
    const sortedOrganized = {};
    
    // Get all degrees present and sort them
    const degrees = Object.keys(organized).map(key => {
        const chord = organized[key][0];
        return { key, degree: chord.degree || 0 };
    }).sort((a, b) => a.degree - b.degree);
    
    // Add sections in degree order (1-7)
    degrees.forEach(({ key }) => {
        sortedOrganized[key] = organized[key];
    });
    
    return sortedOrganized;
}

// Helper function to get chord type title
function getChordTypeTitle(type) {
    const titles = {
        'triads': 'Triads',
        'sevenths': '7th Chords',
        'sixths': '6th Chords',
        'sus2': 'Sus2 Chords',
        'sus4': 'Sus4 Chords',
        'sus4-sevenths': '7sus4 Chords',
        'ninths': '9th Chords',
        'elevenths': '11th Chords',
        'thirteenths': '13th Chords'
    };
    return titles[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

function highlightChordOnFretboard(chord) {
    // Get current key and open chord modal directly
    const currentKey = window.AppController ? window.AppController.getCurrentState().key : 'C';
    openChordModal(chord, currentKey);
}

// Chord Modal Functions
function openChordModal(chord, key) {
    console.log('openChordModal called with:', { chord, key });
    
    const modal = document.getElementById('chord-modal');
    const modalTitle = document.getElementById('chord-modal-title');
    
    if (!modal || !modalTitle) {
        console.error('Chord modal elements not found');
        return;
    }
    
    let chordSymbol;
    
    if (typeof chord === 'string') {
        // Handle characteristic chords (string chord name + root note)
        console.log('Handling characteristic chord (string):', chord, 'with key:', key);
        chordSymbol = chord;
    } else if (chord && typeof chord === 'object') {
        // Handle traditional chords (object with name, notes, quality properties)
        console.log('Handling traditional chord (object):', chord);
        chordSymbol = chord.symbol || chord.name || 'Unknown';
    } else {
        console.error('Invalid chord data format:', chord);
        return;
    }
    
    // Update modal title
    modalTitle.textContent = chordSymbol;
    
    // Render the chord fretboard
    renderChordFretboard(chord, key);
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'block';
}

function closeChordModal() {
    const modal = document.getElementById('chord-modal');
    modal.classList.add('hidden');
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleChordModalEscape);
}

function handleChordModalEscape(e) {
    if (e.key === 'Escape') {
        closeChordModal();
    }
}

function renderChordFretboard(chord, key) {
    const container = document.getElementById('chord-fretboard-container');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Create control section with toggles and rotation
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'chord-controls-container';
    controlsContainer.innerHTML = `
        <div class="chord-controls-row">
            <div class="fretboard-toggle-wrapper">
                <button class="fretboard-toggle-btn active" data-display="notes">Notes</button>
                <button class="fretboard-toggle-btn" data-display="intervals">Intervals</button>
            </div>
        </div>
    `;
    container.appendChild(controlsContainer);

    // Create fretboard display container
    const displayContainer = document.createElement('div');
    displayContainer.className = 'fretboard-display-container';
    container.appendChild(displayContainer);

    // State for display mode
    let displayMode = 'notes';

    // Add toggle event listeners
    const toggleButtons = controlsContainer.querySelectorAll('.fretboard-toggle-btn');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayMode = btn.dataset.display;
            renderFretboard();
        });
    });

    function renderFretboard() {
        // Static dimensions (no rotation)
        const fretCount = 12;
        const stringCount = 6;
        
        // Normal (desktop) dimensions
        const fretWidth = 90;
        const stringSpacing = 45;
        const leftMargin = 80;
        const topMargin = 80;
        const svgWidth = leftMargin + (fretCount * fretWidth) + 20;
        const svgHeight = topMargin + ((stringCount - 1) * stringSpacing) + 60;

        // Create SVG with dynamic structure
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'fretboard-svg');
        svg.setAttribute('width', svgWidth);
        svg.setAttribute('height', svgHeight);
        svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

        // Standard guitar tuning (low to high)
        const stringNotes = ['E', 'A', 'D', 'G', 'B', 'E'];
        const stringMidiNotes = [40, 45, 50, 55, 59, 64];

        // Draw frets (vertical lines)
        for (let fret = 0; fret <= fretCount; fret++) {
            const x = leftMargin + (fret * fretWidth);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', topMargin);
            line.setAttribute('x2', x);
            line.setAttribute('y2', topMargin + ((stringCount - 1) * stringSpacing));
            line.setAttribute('stroke', fret === 0 ? '#1f2937' : '#6b7280');
            line.setAttribute('stroke-width', fret === 0 ? '4' : '2');
            svg.appendChild(line);

            // Fret numbers - positioned to avoid overlap with high E string
            if (fret > 0) {
                const fretNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                fretNumber.setAttribute('x', leftMargin + ((fret - 0.5) * fretWidth));
                // Position higher above the fretboard to avoid any overlap with dots
                fretNumber.setAttribute('y', topMargin - 35);
                fretNumber.setAttribute('text-anchor', 'middle');
                fretNumber.setAttribute('fill', '#FFFFFF');
                fretNumber.setAttribute('font-size', '18');
                fretNumber.setAttribute('font-weight', 'bold');
                fretNumber.textContent = fret;
                svg.appendChild(fretNumber);
            }
        }

        // Draw strings (horizontal lines) - CORRECT ORDER: E(high) to E(low)
        for (let string = 0; string < stringCount; string++) {
            const y = topMargin + (string * stringSpacing);
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', leftMargin);
            line.setAttribute('y1', y);
            line.setAttribute('x2', leftMargin + (fretCount * fretWidth));
            line.setAttribute('y2', y);
            line.setAttribute('stroke', '#6b7280');
            line.setAttribute('stroke-width', '3');
            svg.appendChild(line);

            // String labels - REVERSE ORDER to match visual layout (high E at top)
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', leftMargin - 25);
            label.setAttribute('y', y + 6);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('fill', '#FFFFFF');
            label.setAttribute('font-size', '18');
            label.setAttribute('font-weight', 'bold');
            label.textContent = stringNotes[stringCount - 1 - string]; // Reverse order for display
            svg.appendChild(label);
        }

        // Draw fret markers (inlay dots)
        const markerFrets = [3, 5, 7, 9, 12];
        markerFrets.forEach(markerFret => {
            const x = leftMargin + ((markerFret - 0.5) * fretWidth);
            const centerY = topMargin + (((stringCount - 1) * stringSpacing) / 2);
            
            if (markerFret === 12) {
                // Double dots for 12th fret
                const dotSize = 10;
                const marker1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker1.setAttribute('cx', x);
                marker1.setAttribute('cy', centerY - stringSpacing * 0.8);
                marker1.setAttribute('r', dotSize);
                marker1.setAttribute('fill', '#d1d5db');
                marker1.setAttribute('class', 'inlay-dot');
                svg.appendChild(marker1);
                
                const marker2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker2.setAttribute('cx', x);
                marker2.setAttribute('cy', centerY + stringSpacing * 0.8);
                marker2.setAttribute('r', dotSize);
                marker2.setAttribute('fill', '#d1d5db');
                marker2.setAttribute('class', 'inlay-dot');
                svg.appendChild(marker2);
            } else {
                // Single dot for other markers
                const dotSize = 10;
                const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker.setAttribute('cx', x);
                marker.setAttribute('cy', centerY);
                marker.setAttribute('r', dotSize);
                marker.setAttribute('fill', '#d1d5db');
                marker.setAttribute('class', 'inlay-dot');
                svg.appendChild(marker);
            }
        });

        // Place chord notes on fretboard
        for (let string = 0; string < stringCount; string++) {
            // Use reverse string index for MIDI calculation (low E = 0, high E = 5)
            const midiStringIndex = stringCount - 1 - string;
            
            for (let fret = 0; fret <= fretCount; fret++) {
                const midiNote = stringMidiNotes[midiStringIndex] + fret;
                const chromaticIndex = midiNote % 12;
                const noteName = MusicConstants.chromaticScale[chromaticIndex];
                
                // Check if this note is in the chord
                let isChordNote = false;
                let chordNoteIndex = -1;
                
                for (let i = 0; i < chord.notes.length; i++) {
                    const chordNote = chord.notes[i];
                    
                    // Use enharmonic equivalence check if available
                    if (typeof MusicTheory !== 'undefined' && 
                        typeof MusicTheory.areEnharmonicEquivalents === 'function') {
                        if (MusicTheory.areEnharmonicEquivalents(noteName, chordNote)) {
                            isChordNote = true;
                            chordNoteIndex = i;
                            break;
                        }
                    } else {
                        // Fallback to direct comparison
                        if (noteName === chordNote) {
                            isChordNote = true;
                            chordNoteIndex = i;
                            break;
                        }
                    }
                }

                if (isChordNote) {
                    const chordNote = chord.notes[chordNoteIndex];
                    const rootNote = chord.notes[0]; // First note is the root
                    
                    // Check if this is the root note
                    const isRoot = (typeof MusicTheory !== 'undefined' && 
                        typeof MusicTheory.areEnharmonicEquivalents === 'function') ?
                        MusicTheory.areEnharmonicEquivalents(chordNote, rootNote) :
                        chordNote === rootNote;
                    
                    console.log(`Note: ${chordNote}, Root: ${rootNote}, isRoot: ${isRoot}`);
                    
                    // Determine interval and color
                    let interval = '1'; // Default to root
                    let intervalColor;
                    
                    if (isRoot) {
                        interval = '1';
                        // Root notes are always white with black text/stroke
                        intervalColor = '#FFFFFF';
                        console.log(`Setting root note ${chordNote} to white (#FFFFFF)`);
                    } else {
                        // Use the chord-specific interval calculation
                        const chordIntervals = MusicTheory.getChordIntervals(chord.notes, rootNote);
                        interval = chordIntervals[chordNoteIndex] || '1';
                        
                        // Map extended intervals to simple intervals for color consistency
                        let colorInterval = interval;
                        if (interval === '9' || interval === 'b9') colorInterval = '2';
                        else if (interval === '11' || interval === '#11') colorInterval = '4';
                        else if (interval === '13' || interval === 'b13') colorInterval = '6';
                        
                        // Non-root notes use interval colors if colors are visible
                        intervalColor = window.colorsVisible ? 
                            MusicTheory.getIntervalColor(colorInterval) : '#d97706';
                        console.log(`Setting non-root note ${chordNote} (interval ${interval}, color interval ${colorInterval}) to color ${intervalColor}`);
                    }
                    
                    // Position notes - optimized positioning
                    const x = fret === 0 ? leftMargin - 30 : leftMargin + ((fret - 0.5) * fretWidth);
                    const y = topMargin + (string * stringSpacing);
                    
                    const circleRadius = 15;
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    circle.setAttribute('cx', x);
                    circle.setAttribute('cy', y);
                    circle.setAttribute('r', circleRadius);
                    circle.setAttribute('fill', intervalColor);
                    circle.setAttribute('style', `fill: ${intervalColor} !important;`);
                    // Use black stroke for root note (1), white for others
                    circle.setAttribute('stroke', isRoot || interval === '1' ? 'black' : 'white');
                    circle.setAttribute('stroke-width', '2');
                    circle.setAttribute('class', isRoot ? 'note-dot root' : 'note-dot');
                    svg.appendChild(circle);
                    
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    text.setAttribute('x', x);
                    text.setAttribute('y', y + 4);
                    text.setAttribute('text-anchor', 'middle');
                    
                    // Determine what to display based on toggle state
                    let displayText = chordNote; // Default to note name
                    let isRootNote = isRoot;
                    
                    if (displayMode === 'intervals') {
                        // Show interval instead of note name
                        displayText = interval;
                        isRootNote = interval === '1';
                    }
                    
                    // Use black text for root note (1), white for others
                    text.setAttribute('fill', isRootNote ? 'black' : 'white');
                    text.setAttribute('style', `fill: ${isRootNote ? 'black' : 'white'} !important;`);
                    text.setAttribute('font-size', '14');
                    text.setAttribute('font-weight', 'bold');
                    
                    text.textContent = displayText;
                    
                    svg.appendChild(text);
                }
            }
        }

        // Clear and add the new SVG
        displayContainer.innerHTML = '';
        displayContainer.appendChild(svg);
    }

    // Initial render
    renderFretboard();
}

// Helper function to check enharmonic equivalents
function isEnharmonicEquivalent(note1, note2) {
    const enharmonicMap = {
        'C': ['C', 'B#'],
        'C#': ['C#', 'Db'],
        'D': ['D'],
        'D#': ['D#', 'Eb'],
        'E': ['E', 'Fb'],
        'F': ['F', 'E#'],
        'F#': ['F#', 'Gb'],
        'G': ['G'],
        'G#': ['G#', 'Ab'],
        'A': ['A'],
        'A#': ['A#', 'Bb'],
        'B': ['B', 'Cb']
    };
    
    // Find which group each note belongs to
    for (const [key, equivalents] of Object.entries(enharmonicMap)) {
        if (equivalents.includes(note1) && equivalents.includes(note2)) {
            return true;
        }
    }
    
    return false;
}

// Export all functions
window.UIComponents = {
    displayScale,
    displayNotes,
    displayIntervals,
    displayFormula,
    createFretboard,
    openFretboardModal,
    closeFretboardModal,
    setOptimalModalSize,
    renderModalFretboard,
    openChordModal,
    closeChordModal,
    renderChordFretboard,
    openChordVoicingModal,
    closeChordVoicingModal,
    openIntervalInfoModal,
    closeIntervalInfoModal,
    enterCompareMode,
    exitCompareMode,
    updateScaleColor,
    updateParentScale,
    updateModeName,
    createRelatedModes
};

// Scale playback functionality
function toggleDirection(button) {
    const currentDirection = button.getAttribute('data-direction');
    let newDirection, newIcon, newTitle;
    
    switch (currentDirection) {
        case 'ascending':
            newDirection = 'descending';
            newIcon = '←';
            newTitle = 'Descending';
            break;
        case 'descending':
            newDirection = 'both';
            newIcon = '↔';
            newTitle = 'Both (Ascending & Descending)';
            break;
        case 'both':
            newDirection = 'ascending';
            newIcon = '→';
            newTitle = 'Ascending';
            break;
    }
    
    button.setAttribute('data-direction', newDirection);
    button.innerHTML = newIcon;
    button.setAttribute('title', newTitle);
}

async function playScale(data, section) {
    console.log('Playing scale:', data, 'section:', section);
    
    // Get current scale info from AppController
    const currentState = AppController.getCurrentState();
    const { key } = currentState;
    
    // Always use the notes data for playback
    let notes = data;
    
    if (!notes || notes.length === 0) {
        console.error('No notes to play');
        return;
    }
    
    console.log('Playing direction: ascending (only option)');
    
    // Add octave note for playback
    const octaveNote = notes[0]; // Root note an octave higher
    
    try {
        // Initialize audio engine if needed
        if (!window.AudioEngine.isInitialized) {
            await window.AudioEngine.initialize();
        }
        
        // Play the scale ascending only (octave visual will be added during playback)
        await playScaleSequence([...notes, octaveNote], true, section);
        
    } catch (error) {
        console.error('Error playing scale:', error);
    }
}

async function playScaleSequence(notes, ascending, section) {
    const playOrder = ascending ? notes : [...notes].reverse();
    let octaveElement = null;
    
    // Calculate proper octaves for smooth scale progression
    const notesWithOctaves = calculateScaleOctaves(playOrder, ascending);
    
    // Get audio context timing for precise synchronization
    const audioContext = window.AudioEngine.audioContext;
    const noteDuration = 0.6; // Duration for each note
    const noteSpacing = noteDuration * 0.7; // Time between note starts
    
    for (let i = 0; i < playOrder.length; i++) {
        const note = playOrder[i];
        const isOctave = i === (ascending ? playOrder.length - 1 : 0);
        
        // Use the calculated octave for proper pitch progression
        const noteWithOctave = notesWithOctaves[i];
        
        // Add octave visual only when we reach the octave note
        if (isOctave && !octaveElement) {
            octaveElement = await addOctaveVisual(notes.slice(0, -1), note, section);
        }
        
        // Highlight current note immediately
        highlightCurrentNote(note, isOctave);
        
        // Play the note with precise Web Audio timing
        await window.AudioEngine.playNote(noteWithOctave, noteDuration * 0.8);
        
        // Schedule highlight removal after note duration
        setTimeout(() => {
            removeNoteHighlight();
        }, noteDuration * 800);
        
        // Wait before next note (only if not the last note)
        if (i < playOrder.length - 1) {
            await new Promise(resolve => setTimeout(resolve, noteSpacing * 1000));
        }
    }
    
    // Remove octave visual after playback
    if (octaveElement) {
        setTimeout(() => removeOctaveVisual(section), 500);
    }
}

function calculateScaleOctaves(notes, ascending) {
    // Note names in chromatic order for octave calculation
    const chromaticNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    // Function to get note index (handles both sharp and flat notation)
    function getNoteIndex(note) {
        const noteMap = {
            'C': 0, 'C#': 1, 'Db': 1,
            'D': 2, 'D#': 3, 'Eb': 3,
            'E': 4,
            'F': 5, 'F#': 6, 'Gb': 6,
            'G': 7, 'G#': 8, 'Ab': 8,
            'A': 9, 'A#': 10, 'Bb': 10,
            'B': 11
        };
        return noteMap[note] !== undefined ? noteMap[note] : 0;
    }
    
    if (notes.length === 0) return [];
    
    const result = [];
    let currentOctave;
    
    if (ascending) {
        // Ascending: start at octave 2 (where descending ends)
        currentOctave = 2;
    } else {
        // Descending: start at octave 3 (will go down to octave 2)
        currentOctave = 3;
    }
    
    let lastNoteIndex = getNoteIndex(notes[0]);
    
    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        const noteIndex = getNoteIndex(note);
        
        if (i > 0) {
            if (ascending) {
                // For ascending: if current note is lower than previous, we've crossed into next octave
                if (noteIndex < lastNoteIndex) {
                    currentOctave++;
                }
            } else {
                // For descending: if current note is higher than previous, we've crossed into lower octave
                if (noteIndex > lastNoteIndex) {
                    currentOctave--;
                }
            }
        }
        
        result.push(`${note}${currentOctave}`);
        lastNoteIndex = noteIndex;
    }
    
    return result;
}

function addOctaveVisual(notes, octaveNote, section) {
    return new Promise(resolve => {
        const notesContainer = document.querySelector('.notes-display');
        const intervalsContainer = document.querySelector('.intervals-display');
    
        if (!notesContainer || !intervalsContainer) {
            resolve(null);
            return;
        }

        // Check if octave elements already exist (prevent duplicates)
        const existingOctaveNote = notesContainer.querySelector('.octave-note');
        const existingOctaveInterval = intervalsContainer.querySelector('.octave-interval');
        
        if (existingOctaveNote && existingOctaveInterval) {
            // Return existing elements
            resolve({ noteElement: existingOctaveNote, intervalElement: existingOctaveInterval });
            return;
        }
        
        // Remove any existing octave elements first (cleanup)
        const oldOctaveElements = document.querySelectorAll('.octave-note, .octave-interval');
        oldOctaveElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        
        // Add octave to notes section (no separator) - with root note styling
        const octaveNoteElement = document.createElement('span');
        octaveNoteElement.className = 'note octave-note root-note'; // Add root-note class for same styling
        octaveNoteElement.textContent = octaveNote;
        octaveNoteElement.setAttribute('data-note', octaveNote);
        notesContainer.appendChild(octaveNoteElement);
        
        // Add octave to intervals section (no separator) - with same color as root
        const octaveIntervalElement = document.createElement('span');
        octaveIntervalElement.className = 'interval octave-interval';
        octaveIntervalElement.textContent = '8'; // Octave interval
        octaveIntervalElement.setAttribute('data-interval', '8');
        // Apply the same color as the "1" interval (unison)
        const backgroundColor = MusicTheory.getIntervalColor('1') || '#E8B4B8';
        octaveIntervalElement.style.background = backgroundColor;
        // Use black text for white/light backgrounds, white text for dark backgrounds
        octaveIntervalElement.style.color = backgroundColor === '#FFFFFF' ? '#000000' : 'white';
        octaveIntervalElement.style.fontWeight = '600';
        intervalsContainer.appendChild(octaveIntervalElement);
        
        // Animate both elements in immediately
        [octaveNoteElement, octaveIntervalElement].forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
        
        resolve({ noteElement: octaveNoteElement, intervalElement: octaveIntervalElement });
    });
}

function removeOctaveVisual(section) {
    // Remove octave elements from both sections (no separators to remove)
    const octaveElements = document.querySelectorAll('.octave-note, .octave-interval');
    
    octaveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 300);
    });
}

function highlightCurrentNote(note, isOctave) {
    // Remove any existing highlights
    removeNoteHighlight();
    
    // Find and highlight the note
    const noteElements = document.querySelectorAll('.note');
    noteElements.forEach(element => {
        if (element.getAttribute('data-note') === note) {
            element.classList.add('playing-highlight');
        }
    });
    
    // Find and highlight the corresponding interval
    const intervalElements = document.querySelectorAll('.interval');
    const noteIndex = getCurrentNoteIndex(note, isOctave);
    
    if (noteIndex !== -1 && intervalElements[noteIndex]) {
        intervalElements[noteIndex].classList.add('playing-highlight');
    }
}

function removeNoteHighlight() {
    // Remove highlights from both notes and intervals
    const highlightedElements = document.querySelectorAll('.playing-highlight');
    highlightedElements.forEach(element => {
        element.classList.remove('playing-highlight');
    });
}

function getCurrentNoteIndex(note, isOctave) {
    // Get current scale notes to find the index
    const notesDisplay = document.querySelector('.notes-display');
    if (!notesDisplay) return -1;
    
    const noteElements = notesDisplay.querySelectorAll('.note');
    for (let i = 0; i < noteElements.length; i++) {
        if (noteElements[i].getAttribute('data-note') === note) {
            return isOctave ? 0 : i; // Octave maps to root interval (index 0)
        }
    }
    
    return -1;
}

// Scale comparison functions
function enterCompareMode() {
    fretboardState.compareMode = true;
    
    // Re-render fretboard
    createFretboard(window.currentScale);
}

function exitCompareMode() {
    fretboardState.compareMode = false;
    fretboardState.comparisonScale = null;
    
    // Re-render fretboard
    createFretboard(window.currentScale);
}

// Function to update the comparison legend with actual scale names
function updateComparisonLegend(comparisonRoot, comparisonCategory, comparisonMode) {
    const comparisonScaleNameElement = document.getElementById('comparison-scale-name');
    if (comparisonScaleNameElement) {
        const formattedModeName = formatModeName(comparisonMode);
        comparisonScaleNameElement.textContent = `${comparisonRoot} ${formattedModeName} only`;
    }
}

// Function to update the primary scale legend
function updatePrimaryScaleLegend() {
    const primaryScaleNameElement = document.getElementById('primary-scale-name');
    if (primaryScaleNameElement && window.AppController) {
        const currentState = window.AppController.getCurrentState();
        if (currentState) {
            const formattedModeName = formatModeName(currentState.mode);
            primaryScaleNameElement.textContent = `${currentState.key} ${formattedModeName} only`;
        }
    }
}

function showComparisonSelector(controlsDiv) {
    // Save current selections if they exist
    let savedSelections = null;
    const existingRoot = document.getElementById('comparison-root');
    const existingCategory = document.getElementById('comparison-category');
    const existingMode = document.getElementById('comparison-mode');
    
    if (existingRoot && existingCategory && existingMode) {
        savedSelections = {
            root: existingRoot.value,
            category: existingCategory.value,
            mode: existingMode.value
        };
    } else if (fretboardState.comparisonSelection) {
        // Use stored selections if available
        savedSelections = fretboardState.comparisonSelection;
    }
    
    const comparisonDiv = document.createElement('div');
    comparisonDiv.className = 'comparison-selector';
    
    comparisonDiv.innerHTML = `
        <h4 style="color: #f97316;">Select Comparison Scale</h4>
        <div class="comparison-controls">
            <label for="comparison-root">Root Note:</label>
            <select id="comparison-root" name="comparison-root">
                <option value="C">C</option>
                <option value="C#">C#</option>
                <option value="Db">Db</option>
                <option value="D">D</option>
                <option value="D#">D#</option>
                <option value="Eb">Eb</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="F#">F#</option>
                <option value="Gb">Gb</option>
                <option value="G">G</option>
                <option value="G#">G#</option>
                <option value="Ab">Ab</option>
                <option value="A">A</option>
                <option value="A#">A#</option>
                <option value="Bb">Bb</option>
                <option value="B">B</option>
            </select>
            
            <label for="comparison-category">Scale Category:</label>
            <select id="comparison-category" name="comparison-category">
            </select>
            
            <label for="comparison-mode">Mode:</label>
            <select id="comparison-mode" name="comparison-mode">
            </select>
            
            <button id="apply-comparison" class="apply-btn">Apply Comparison</button>
        </div>
    `;
    
    // Add legend
    const legend = document.createElement('div');
    legend.className = 'comparison-legend';
    legend.innerHTML = `
        <div class="legend-items">
            <div class="legend-item">
                <span class="legend-color shared-note"></span>
                <span>Shared notes</span>
            </div>
            <div class="legend-item">
                <span class="legend-color primary-only"></span>
                <span id="primary-scale-name">Primary scale only</span>
            </div>
            <div class="legend-item">
                <span class="legend-color comparison-only"></span>
                <span id="comparison-scale-name">Comparison scale only</span>
            </div>
        </div>
        <div id="interval-info" class="interval-info" style="display: none;">
            <p><strong>Interval Mode:</strong> Intervals are shown relative to each scale's root. 
            Notes in both scales show the primary scale's intervals.</p>
        </div>
    `;
    comparisonDiv.appendChild(legend);
    controlsDiv.appendChild(comparisonDiv);
    
    // Update primary scale legend immediately after adding to DOM
    setTimeout(() => {
        updatePrimaryScaleLegend();
        // Also update comparison legend if we have stored comparison data
        if (fretboardState.comparisonSelection) {
            updateComparisonLegend(
                fretboardState.comparisonSelection.root,
                fretboardState.comparisonSelection.category,
                fretboardState.comparisonSelection.mode
            );
        }
    }, 0);
    
    // Populate category dropdown
    populateComparisonCategories();
    
    // Restore saved selections
    if (savedSelections) {
        setTimeout(() => {
            const rootSelect = document.getElementById('comparison-root');
            const categorySelect = document.getElementById('comparison-category');
            const modeSelect = document.getElementById('comparison-mode');
            
            if (rootSelect && savedSelections.root) {
                rootSelect.value = savedSelections.root;
            }
            
            if (categorySelect && savedSelections.category) {
                categorySelect.value = savedSelections.category;
                populateComparisonModes(savedSelections.category);
                
                // Restore mode selection after populating modes
                setTimeout(() => {
                    if (modeSelect && savedSelections.mode) {
                        modeSelect.value = savedSelections.mode;
                    }
                }, 10);
            }
        }, 10);
    }
    
    // Set up event listeners for dependent dropdowns
    const categorySelect = document.getElementById('comparison-category');
    const modeSelect = document.getElementById('comparison-mode');
    
    categorySelect.addEventListener('change', function() {
        populateComparisonModes(this.value);
    });
    
    // Initialize with first category if no saved selections
    if (!savedSelections && categorySelect.options.length > 0) {
        categorySelect.selectedIndex = 0;
        populateComparisonModes(categorySelect.value);
    }
    
    // Apply comparison event listener
    document.getElementById('apply-comparison').addEventListener('click', function() {
        const root = document.getElementById('comparison-root').value;
        const category = document.getElementById('comparison-category').value;
        const mode = document.getElementById('comparison-mode').value;
        
        if (!root || !category || !mode) {
            console.warn('Please select root, category, and mode for comparison');
            return;
        }
        
        try {
            // Get the category data from constants
            const categoryData = MusicConstants.scaleCategories[category];
            if (!categoryData) {
                console.error('Invalid category:', category);
                return;
            }
            
            // Get the formula for the selected mode
            const modeFormula = categoryData.formulas[mode];
            if (!modeFormula) {
                console.error('Invalid mode for category:', mode, category);
                return;
            }
            
            // Get scale type - for certain scale categories, use the specific mode as the scale type
            let scaleType = getScaleTypeFromCategory(category);
            if (category === 'pentatonic' || category === 'pentatonic-modes') {
                scaleType = mode; // Use the actual mode name (e.g., 'minor-pentatonic', 'major-pentatonic')
            } else if (category === 'blues-modes' || category === 'blues-scales') {
                scaleType = mode; // Use the actual mode name (e.g., 'blues-major', 'blues-minor')
            } else if (category === 'diminished-modes') {
                scaleType = mode; // Use the actual mode name (e.g., 'wh-diminished', 'hw-diminished')
            }
            
            // Generate the comparison scale using the same method as the main app
            // console.log('Comparison calculation:', { root, modeFormula, scaleType, category, mode });
            const comparisonScale = MusicTheory.calculateScale(root, modeFormula, scaleType);
            // console.log('Generated comparison scale:', comparisonScale);
            
            if (comparisonScale && comparisonScale.length > 0) {
                // Store the comparison selections to maintain them
                fretboardState.comparisonSelection = {
                    root,
                    category,
                    mode
                };
                
                // Update fretboard state
                fretboardState.comparisonScale = comparisonScale;
                
                // Re-render the fretboard with comparison first
                createFretboard(window.currentScale);
                
                console.log('Comparison applied:', {
                    root,
                    category,
                    mode,
                    formula: modeFormula,
                    scale: comparisonScale
                });
                
            } else {
                console.error('Failed to generate comparison scale');
            }
        } catch (error) {
            console.error('Error applying comparison:', error);
        }
    });
}

// Helper function to populate comparison categories
function populateComparisonCategories() {
    const categorySelect = document.getElementById('comparison-category');
    if (!categorySelect || !MusicConstants.scaleCategories) return;
    
    categorySelect.innerHTML = '';
    
    Object.entries(MusicConstants.scaleCategories).forEach(([key, category]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Helper function to populate comparison modes based on category
function populateComparisonModes(categoryKey) {
    const modeSelect = document.getElementById('comparison-mode');
    if (!modeSelect || !MusicConstants.scaleCategories) return;
    
    const categoryData = MusicConstants.scaleCategories[categoryKey];
    if (!categoryData) return;
    
    modeSelect.innerHTML = '';
    
    categoryData.modes.forEach(mode => {
        const option = document.createElement('option');
        option.value = mode;
        option.textContent = formatModeName(mode);
        modeSelect.appendChild(option);
    });
}

// Helper function to format mode names for display
function formatModeName(mode) {
    // Use proper mode names from constants if available
    if (MusicConstants && MusicConstants.modeNumbers && MusicConstants.modeNumbers[mode]) {
        return MusicConstants.modeNumbers[mode].properName;
    }
    
    // Fallback to basic formatting if not found in constants
    return mode
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Helper function to get scale type from category (same logic as main app)
function getScaleTypeFromCategory(category) {
    switch(category) {
        case 'major-modes':
            return 'major';
        case 'harmonic-minor-modes':
            return 'harmonic-minor';
        case 'harmonic-major-modes':
            return 'harmonic-major';
        case 'melodic-minor-modes':
            return 'melodic-minor';
        case 'diminished-modes':
            return 'diminished';
        case 'pentatonic':
        case 'pentatonic-modes':
            return 'major-pentatonic';
        case 'blues-modes':
        case 'blues-scales':
            return 'blues';
        case 'barry-harris':
            return 'major-6th-diminished';
        case 'whole-tone':
            return 'whole-tone';
        case 'chromatic':
            return 'chromatic';
        default:
            return category;
    }
}

function renderSingleScale(svg, scale, displayFrets, fretWidth) {
    const stringNotes = ['E', 'B', 'G', 'D', 'A', 'E'];
    
    for (let string = 0; string < 6; string++) {
        const openNote = stringNotes[string];
        
        for (let fret = 0; fret <= displayFrets; fret++) {
            const actualFret = fretboardState.startFret + fret;
            
            const chromaticIndex = (noteToIndex(openNote) + actualFret) % 12;
            const chromaticNoteName = MusicConstants.chromaticScale[chromaticIndex];
            
            let displayNote = null;
            
            // Check if this note is in the scale
            for (let i = 0; i < scale.length; i++) {
                const scaleNote = scale[i];
                
                // Check for enharmonic equivalents if the function exists
                if (typeof MusicTheory !== 'undefined' && 
                    typeof MusicTheory.areEnharmonicEquivalents === 'function') {
                    if (MusicTheory.areEnharmonicEquivalents(chromaticNoteName, scaleNote)) {
                        displayNote = scaleNote;
                        break;
                    }
                } else {
                    // Fallback to direct comparison if function not available
                    if (chromaticNoteName === scaleNote) {
                        displayNote = scaleNote;
                        break;
                    }
                }
            }
            
            if (displayNote) {
                // Improved positioning: move fret 0 notes further to the left
                const x = fret === 0 ? 25 : 80 + ((fret - 0.5) * fretWidth);
                const y = 60 + (string * 30);
                
                // Get the scale index and interval for this note
                const scaleIndex = scale.indexOf(displayNote);
                const scaleRoot = scale[0];
                
                // Determine scale type for interval calculation
                let scaleTypeForIntervals = window.currentScaleType || 'major';
                let modeForIntervals = window.currentMode || null;
                
                // Special handling for chromatic scales
                if (scale.length === 12) {
                    scaleTypeForIntervals = 'chromatic';
                    modeForIntervals = null;
                }
                
                const intervals = MusicTheory.getIntervals(scale, scaleRoot, scaleTypeForIntervals, modeForIntervals);
                const interval = intervals[scaleIndex] || '1';
                
                // Check color visibility state - use orange if colors are disabled
                const color = window.colorsVisible ? 
                    MusicTheory.getIntervalColor(interval) : '#d97706';
                
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', '12');
                circle.setAttribute('fill', color);
                circle.setAttribute('stroke', 'white');
                circle.setAttribute('stroke-width', '2');
                svg.appendChild(circle);
                
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', x);
                text.setAttribute('y', y + 4);
                text.setAttribute('text-anchor', 'middle');
                // Use black text for root note (1), white for others
                text.setAttribute('fill', interval === '1' ? 'black' : 'white');
                text.setAttribute('font-size', '10');
                text.setAttribute('font-weight', 'bold');
                // Show intervals or notes based on toggle state
                text.textContent = fretboardState.showIntervals ? interval : displayNote;
                
                // Add tooltip for enharmonic equivalents
                const currentDisplay = fretboardState.showIntervals ? interval : displayNote;
                const tooltipType = fretboardState.showIntervals ? 'interval' : 'note';
                const tooltip = MusicTheory.getEnharmonicTooltip(currentDisplay, tooltipType);
                if (tooltip) {
                    const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                    titleElement.textContent = tooltip;
                    
                    // Add title to both circle and text for better UX
                    const titleClone = titleElement.cloneNode(true);
                    circle.appendChild(titleElement);
                    text.appendChild(titleClone);
                }
                
                svg.appendChild(text);
            }
        }
    }
}

function renderComparisonFretboard(svg, scale1, scale2, displayFrets, fretWidth) {
    const stringNotes = ['E', 'B', 'G', 'D', 'A', 'E'];
    
    // Debug: Log the scales being compared (uncomment when needed)
    // console.log('Comparison Debug - renderComparisonFretboard:');
    // console.log('Scale 1 (primary):', scale1);
    // console.log('Scale 2 (comparison):', scale2);
    
    // Find shared notes between the two scales
    const sharedNotes = scale1.filter(note => 
        scale2.some(compareNote => {
            if (typeof MusicTheory !== 'undefined' && 
                typeof MusicTheory.areEnharmonicEquivalents === 'function') {
                return MusicTheory.areEnharmonicEquivalents(note, compareNote);
            }
            return note === compareNote;
        })
    );
    
    for (let string = 0; string < 6; string++) {
        const openNote = stringNotes[string];
        
        for (let fret = 0; fret <= displayFrets; fret++) {
            const actualFret = fretboardState.startFret + fret;
            
            const chromaticIndex = (noteToIndex(openNote) + actualFret) % 12;
            
            let displayNote = null;
            let isInScale1 = false;
            let isInScale2 = false;
            let isShared = false;
            let scale1Index = -1;
            let scale2Index = -1;
            
            // Check if this chromatic position matches any note in scale1
            for (let i = 0; i < scale1.length; i++) {
                const scaleNote = scale1[i];
                const scaleNoteIndex = noteToIndex(scaleNote);
                if (scaleNoteIndex === chromaticIndex) {
                    displayNote = scaleNote; // Use the scale's spelling
                    isInScale1 = true;
                    scale1Index = i;
                    break;
                }
            }
            
            // Check if this chromatic position matches any note in scale2
            for (let i = 0; i < scale2.length; i++) {
                const scaleNote = scale2[i];
                const scaleNoteIndex = noteToIndex(scaleNote);
                if (scaleNoteIndex === chromaticIndex) {
                    // If we already found it in scale1, prioritize scale1's spelling
                    // Otherwise use scale2's spelling
                    if (!displayNote) displayNote = scaleNote;
                    isInScale2 = true;
                    scale2Index = i;
                    break;
                }
            }
            
            // Check if shared
            if (displayNote) {
                isShared = sharedNotes.some(sharedNote => {
                    if (typeof MusicTheory !== 'undefined' && 
                        typeof MusicTheory.areEnharmonicEquivalents === 'function') {
                        return MusicTheory.areEnharmonicEquivalents(displayNote, sharedNote);
                    }
                    return displayNote === sharedNote;
                });
            }
            
            if (displayNote && (isInScale1 || isInScale2)) {
                const x = fret === 0 ? 25 : 80 + ((fret - 0.5) * fretWidth);
                const y = 60 + (string * 30);
                
                // Color coding for comparison
                let color;
                if (isShared) {
                    // Shared notes: blue
                    color = '#3b82f6'; // blue-500
                } else if (isInScale1) {
                    // Only in scale1 (primary): orange
                    color = '#f97316'; // orange-500
                } else {
                    // Only in scale2 (comparison): red
                    color = '#dc2626'; // red-600
                }
                
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', '12');
                circle.setAttribute('fill', color);
                circle.setAttribute('stroke', 'white');
                circle.setAttribute('stroke-width', '2');
                svg.appendChild(circle);
                
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', x);
                text.setAttribute('y', y + 4);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('fill', 'white');
                text.setAttribute('font-size', '10');
                text.setAttribute('font-weight', 'bold');
                
                // Determine what to display based on toggle state
                let displayText = displayNote; // Default to note name
                
                if (fretboardState.showIntervals) {
                    // For intervals, prioritize scale1 if the note is in both scales
                    let intervalText = '';
                    if (isInScale1 && scale1Index >= 0) {
                        // Get interval from scale1
                        const scale1Root = scale1[0];
                        const intervals1 = MusicTheory.getIntervals(scale1, scale1Root);
                        intervalText = intervals1[scale1Index] || '1';
                    } else if (isInScale2 && scale2Index >= 0) {
                        // Get interval from scale2
                        const scale2Root = scale2[0];
                        const intervals2 = MusicTheory.getIntervals(scale2, scale2Root);
                        intervalText = intervals2[scale2Index] || '1';
                    }
                    
                    if (intervalText) {
                        displayText = intervalText;
                        // Update text color for root notes
                        text.setAttribute('fill', intervalText === '1' ? 'black' : 'white');
                    }
                }
                
                text.textContent = displayText;
                
                // Add tooltip for enharmonic equivalents
                const tooltipType = fretboardState.showIntervals ? 'interval' : 'note';
                const tooltip = MusicTheory.getEnharmonicTooltip(displayText, tooltipType);
                if (tooltip) {
                    const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                    titleElement.textContent = tooltip;
                    
                    // Add title to both circle and text for better UX
                    const titleClone = titleElement.cloneNode(true);
                    circle.appendChild(titleElement);
                    text.appendChild(titleClone);
                }
                
                svg.appendChild(text);
            }
        }
    }
}

// Chord Voicing Practices Modal Functions
function openChordVoicingModal() {
    const modal = document.getElementById('chord-voicing-modal');
    if (!modal) return;
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'block';
    
    // Add escape key listener
    document.addEventListener('keydown', handleChordVoicingModalEscape);
}

function closeChordVoicingModal() {
    const modal = document.getElementById('chord-voicing-modal');
    modal.classList.add('hidden');
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleChordVoicingModalEscape);
}

function handleChordVoicingModalEscape(e) {
    if (e.key === 'Escape') {
        closeChordVoicingModal();
    }
}

function openIntervalInfoModal() {
    const modal = document.getElementById('interval-info-modal');
    if (!modal) return;
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    // Add escape key listener
    document.addEventListener('keydown', handleIntervalInfoModalEscape);
}

function closeIntervalInfoModal() {
    const modal = document.getElementById('interval-info-modal');
    modal.classList.add('hidden');
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleIntervalInfoModalEscape);
}

function handleIntervalInfoModalEscape(e) {
    if (e.key === 'Escape') {
        closeIntervalInfoModal();
    }
}

function openHelpModal() {
    const modal = document.getElementById('help-modal');
    if (!modal) return;
    
    // Show modal
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    // Add escape key listener
    document.addEventListener('keydown', handleHelpModalEscape);
}

function closeHelpModal() {
    const modal = document.getElementById('help-modal');
    modal.classList.add('hidden');
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleHelpModalEscape);
}

function handleHelpModalEscape(e) {
    if (e.key === 'Escape') {
        closeHelpModal();
    }
}

// Helper function to map category names to scale types
function getScaleTypeFromCategory(category) {
    const categoryMap = {
        'major-modes': 'major',
        'harmonic-minor-modes': 'harmonic-minor',
        'melodic-minor-modes': 'melodic-minor'
    };
    return categoryMap[category] || 'major';
}
// Make functions available globally
window.UIComponents = {
    createFretboard,
    displayScale,
    displayNotes,
    displayIntervals,
    displayChords,
    displayFormula,
    updateScaleColor,
    updateModeName,
    updateParentScale,
    createRelatedModes,
    initializeSearch,
    closeChordModal,
    closeChordVoicingModal,
    closeIntervalInfoModal,
    closeFretboardModal,
    enterCompareMode,
    exitCompareMode,
    toggleDirection,
    playScale,
    openChordVoicingModal,
    openIntervalInfoModal,
    openHelpModal,
    closeHelpModal,
    openChordTheoryModal,
    closeChordTheoryModal
};

function openChordTheoryModal() {
    const modal = document.getElementById('chord-theory-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
    }
}

function closeChordTheoryModal() {
    const modal = document.getElementById('chord-theory-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    }
}

// Special function for altered scale spelling
function calculateAlteredScaleSpelling(root, formula, spellingConvention) {
    const noteToIndex = {
        'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
        'C#': 1, 'Db': 1, 'D#': 3, 'Eb': 3, 'F#': 6, 'Gb': 6,
        'G#': 8, 'Ab': 8, 'A#': 10, 'Bb': 10,
        'B#': 0, 'Cb': 11, 'E#': 5, 'Fb': 4
    };
    
    const rootChromaticIndex = noteToIndex[root];
    if (rootChromaticIndex === undefined) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    const scale = [root];
    let currentChromaticIndex = rootChromaticIndex;
    
    // Use chromatic spelling that prioritizes practical enharmonics
    // For altered scale, we want: 1, b2, b3, 3, b5, b6, b7
    // This translates to: Root, b9, #9, 3, #11, b13, b7 in jazz terms
    const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Calculate each note using the formula with chromatic spelling
    for (let i = 0; i < formula.length - 1; i++) {
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        let noteName = chromaticScale[currentChromaticIndex];
        
        // For altered scale, we need special handling for the b3 and 3 intervals
        // They should use the same letter name (e.g., G and G# for E altered)
        if (i === 1 || i === 2) { // b3 and 3 positions in the formula
            // Keep the chromatic spelling to allow same letter names
            // Don't convert to flats for these intervals
        } else {
            // For other altered tones, convert sharps to flats for more readable jazz notation
            const sharpToFlat = {
                'C#': 'Db',
                'D#': 'Eb', 
                'F#': 'Gb',
                'G#': 'Ab',
                'A#': 'Bb'
            };
            
            // Convert to flat notation for most altered tones, but keep naturals
            if (sharpToFlat[noteName]) {
                noteName = sharpToFlat[noteName];
            }
        }
        
        scale.push(noteName);
    }
    
    return scale;
}

function getParentScaleName(category, parentRoot) {
    const categoryData = MusicConstants.scaleCategories[category];
    if (!categoryData) {
        return `${parentRoot} Scale`;
    }
    
    return `${parentRoot} ${categoryData.name}`;
}

// Special handling for melodic minor scales - use flat-preferred spelling
function calculateMelodicMinorScaleSpelling(root, formula, spellingConvention) {
    const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const noteToIndex = {
        'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
        'C#': 1, 'Db': 1, 'D#': 3, 'Eb': 3, 'F#': 6, 'Gb': 6,
        'G#': 8, 'Ab': 8, 'A#': 10, 'Bb': 10,
        'B#': 0, 'Cb': 11, 'E#': 5, 'Fb': 4
    };
    
    // For F# root, use sharp spelling convention to maintain F# Altered
    const shouldUseSharpSpelling = root === 'F#';
    const effectiveSpellingConvention = shouldUseSharpSpelling ? 'sharp' : 'flat';
    
    // Find the root note's position in the note names array
    const rootNoteName = root.charAt(0);
    const rootNoteIndex = noteNames.indexOf(rootNoteName);
    if (rootNoteIndex === -1) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    // Get the chromatic index of the root
    const rootChromaticIndex = noteToIndex[root];
    if (rootChromaticIndex === undefined) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    // Calculate scale notes based on scale degrees with conditional preference
    const scale = [root]; // Start with the root
    let currentChromaticIndex = rootChromaticIndex;
    
    for (let i = 0; i < formula.length - 1; i++) {
        // Move to the next chromatic position
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        
        // Calculate which scale degree this should be (2nd, 3rd, 4th, etc.)
        const scaleDegreeIndex = (rootNoteIndex + i + 1) % 7;
        const baseNoteName = noteNames[scaleDegreeIndex];
        const baseNoteChromatic = noteToIndex[baseNoteName];
        
        // Calculate the difference between where we are and where the base note is
        const chromaticDifference = (currentChromaticIndex - baseNoteChromatic + 12) % 12;
        
        let noteName;
        if (chromaticDifference === 0) {
            // Perfect match - use the natural note
            noteName = baseNoteName;
        } else if (chromaticDifference === 1) {
            // One semitone up - use convention-based preference
            if (effectiveSpellingConvention === 'flat') {
                // Use the next note with flat
                const nextDegreeIndex = (scaleDegreeIndex + 1) % 7;
                noteName = noteNames[nextDegreeIndex] + 'b';
            } else {
                // Use sharp
                noteName = baseNoteName + '#';
            }
        } else if (chromaticDifference === 11) {
            // One semitone down - use convention-based preference
            if (effectiveSpellingConvention === 'sharp') {
                // Use the previous note with sharp
                const prevDegreeIndex = (scaleDegreeIndex - 1 + 7) % 7;
                noteName = noteNames[prevDegreeIndex] + '#';
            } else {
                // Use flat
                noteName = baseNoteName + 'b';
            }
        } else if (chromaticDifference === 2) {
            // Two semitones up - avoid double sharp/flat, use chromatic spelling
            noteName = getConsistentNoteSpelling(currentChromaticIndex, effectiveSpellingConvention);
        } else if (chromaticDifference === 10) {
            // Ten semitones up (two semitones down) - avoid double flat/sharp, use chromatic spelling
            noteName = getConsistentNoteSpelling(currentChromaticIndex, effectiveSpellingConvention);
        } else {
            // For other intervals, use chromatic spelling based on convention
            noteName = getConsistentNoteSpelling(currentChromaticIndex, effectiveSpellingConvention);
        }
        
        scale.push(noteName);
    }
    
    return scale;
}