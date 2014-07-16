//add numbers on side
//add dots on fretboard
//make drop downs dynamic


function Music(strings, targetElement) {
    this.strings = strings.split(',');
    this.targetElement = targetElement;
    this.targetElementSelector = '#' + targetElement;
    this.clearFretboard();
    this.populateStrings();
}

//object literal class implementation
Music.prototype = {
    numFrets : 20,
    notes: ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'],

    clearFretboard : function() {
        $(this.targetElementSelector + ' ol').remove();
    },

    removeHighlighting: function () {
        $(this.targetElementSelector + ' ol li span.highlight').removeClass('highlight');
    },

    updateFretboard: function () {
        this.clearFretboard();
        this.strings = ($('select#tuning option:selected').val()).split(',');
        var scale = $('select#scale option:selected').val();
        var key = $('select#key option:selected').val();
        
        this.populateStrings();
        switch (scale) {
            case 'major-scale':
                this.showMajorScale(key);
                break;
            case 'pentatonic-scale':
                this.showPentatonicScale(key);
                break;
            case 'major-chord-notes':
                this.showMajorChordNotes(key);
                break;
        }
    },

    populateString : function(stringName, note, extraClassString) {
        $(stringName).append('<li class="nut ' + extraClassString + '"><span class="' + note.replace('#', '-sharp')  + '">' + note + '</span></li>');
        for (var i = 1; i < this.numFrets; i++) {
            note = this.getNoteViaInterval(note, 1);
            $(stringName).append('<li class="' + extraClassString + '"><span class="' + note.replace('#', '-sharp') + '">' + note + '</span></li>');
        }
    },

    populateStrings: function () {
        //create ol for each string
        for (var i = this.strings.length; i > 0; i--) {
            $(this.targetElementSelector).append('<ol class="string-' + i + '"></ol>')
        }

        //find go through strings and add notes.  add classes for edge strings for display reasons
        for (var i = 1; i < this.strings.length + 1; i++) {
            var elementSelector = this.targetElementSelector + ' ol.string-' + i;
            if (i == 1)
                this.populateString(elementSelector, this.strings[i - 1], 'highest-string');
            else if (i == this.strings.length)
                this.populateString(elementSelector, this.strings[i - 1], 'lowest-string');
            else
                this.populateString(elementSelector, this.strings[i - 1], '');
        }
    },

    getNoteViaInterval : function(note, interval) {
        var index = this.notes.indexOf(note);

        var targetNote;
        //interval goes off the deep end
        if ((interval + index) >= this.notes.length) {
            var initialNotes = this.notes.length - index;
            targetNote = this.notes[interval - initialNotes];
        }
        //interval is within array
        else {
            targetNote = this.notes[index + interval];
        }
        return targetNote;
    },

    addClassToNote : function(note, cssClass) {
        var target = '.' + note.replace('#', '-sharp');
        $(this.targetElementSelector + ' ol li span' + target).addClass(cssClass);
    },

    showMajorChordNotes : function(root) {
        //1 3 5
        this.removeHighlighting();
        root = root.replace('-sharp', '#');
        this.addClassToNote(root, 'root');
        this.addClassToNote(this.getNoteViaInterval(root, 4), 'inScale');
        this.addClassToNote(this.getNoteViaInterval(root, 7), 'inScale');
    },

    showMajorScale : function(root) {
        //WWHWWWH
        this.removeHighlighting();
        root = root.replace('-sharp', '#');
        this.addClassToNote(root, 'root');                        //1
        this.addClassToNote(this.getNoteViaInterval(root, 2), 'inScale'); //2
        this.addClassToNote(this.getNoteViaInterval(root, 4), 'inScale'); //3
        this.addClassToNote(this.getNoteViaInterval(root, 5), 'inScale'); //4
        this.addClassToNote(this.getNoteViaInterval(root, 7), 'inScale'); //5
        this.addClassToNote(this.getNoteViaInterval(root, 9), 'inScale'); //6
        this.addClassToNote(this.getNoteViaInterval(root, 11), 'inScale');//7
    },

    showPentatonicScale : function(root) {
        //drop 4th and 7th
        this.removeHighlighting();
        root = root.replace('-sharp', '#');
        this.addClassToNote(root, 'root');                        //1
        this.addClassToNote(this.getNoteViaInterval(root, 2), 'inScale'); //2
        this.addClassToNote(this.getNoteViaInterval(root, 4), 'inScale'); //3
        this.addClassToNote(this.getNoteViaInterval(root, 7), 'inScale'); //5
        this.addClassToNote(this.getNoteViaInterval(root, 9), 'inScale'); //6
    }
}
